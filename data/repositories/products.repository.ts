"use server";

import { ProductDto } from "@/types/dtos";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export const getAllProductsRepository = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index");

  return { data, error };
};

export const upsertProductRepository = async (product: ProductDto) => {
  const supabaseAdmin = createServiceRoleClient();

  const { error } = await supabaseAdmin.from("products").upsert([product]);

  return { error };
};

export const deleteProductRepository = async (productId: string) => {
  const supabaseAdmin = createServiceRoleClient();

  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", productId);

  return { error };
};
