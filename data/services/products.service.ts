"use server";

import { ProductDto } from "@/types/dtos";
import { CustomError } from "@/errors/CustomError";
import type Stripe from "stripe";
import { cache } from "react";
import { createProductsRepository } from "@/data/repositories/products.repository";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export const upsertProduct = async (product: Stripe.Product) => {
  const supabaseAdmin = createServiceRoleClient();
  const productsRepository = await createProductsRepository();

  const productData: ProductDto = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: {
      marketing_features: JSON.stringify(product.marketing_features)
    }
  };
  try {
    const { error } = await productsRepository.upsertProduct(
      supabaseAdmin,
      productData
    );
    if (error) {
      console.error(error);
      throw new CustomError(error.message, 500, {
        cause: error.details,
        context: {
          productId: product.id
        }
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  const supabaseAdmin = createServiceRoleClient();
  const productsRepository = await createProductsRepository();
  try {
    const { error } = await productsRepository.deleteProduct(
      supabaseAdmin,
      productId
    );
    if (error) {
      console.error(error);
      throw new CustomError(error.message, 500, {
        cause: error.message,
        context: {
          productId
        }
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllProducts = cache(async () => {
  const supabase = createClient();
  const productsRepository = await createProductsRepository();
  try {
    const { data: products, error } = await productsRepository.getAllProducts(
      supabase
    );
    if (error) {
      console.error(error);
      throw new CustomError(error.message, 500, {
        cause: error.message,
        context: {
          data: "products"
        }
      });
    }
    return products ?? [];
  } catch (error) {
    console.error(error);
    throw error;
  }
});
