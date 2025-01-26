"use server";

import { ProductDto } from "@/types/dtos";
import type { SupabaseClient } from "@supabase/supabase-js";

class ProductsRepository {

  async getProductById(supabase: SupabaseClient, productId: string){
    const { data, error } = await supabase
      .from("products")
      .select("*, prices(*)")
      .eq("id", productId)
      .single();

    return { data, error };
  }

  async getAllProducts(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("products")
      .select("*, prices(*)")
      .eq("active", true)
      .eq("prices.active", true)
      .order("metadata->index");

    return { data, error };
  }

  async upsertProduct(supabase: SupabaseClient, product: ProductDto) {
    const { error } = await supabase.from("products").upsert([product]);

    return { error };
  }

  async deleteProduct(supabase: SupabaseClient, productId: string) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    return { error };
  }
}

export async function createProductsRepository() {
  return new ProductsRepository();
}
