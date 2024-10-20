"use server";

import { ProductDto } from "@/types/dtos";
import { CustomError } from "@/errors/CustomError";
import type Stripe from "stripe";
import { cache } from "react";
import {
  deleteProductRepository,
  getAllProductsRepository,
  upsertProductRepository
} from "@/data/repositories/products.repository";

export const upsertProduct = async (product: Stripe.Product) => {
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
    const { error } = await upsertProductRepository(productData);
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
  try {
    const { error } = await deleteProductRepository(productId);
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
  try {
    const { data: products, error } = await getAllProductsRepository();
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
