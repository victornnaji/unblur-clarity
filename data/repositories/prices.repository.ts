"use server";

import { PriceDto } from "@/types/dtos";
import { SupabaseClient } from "@supabase/supabase-js";


class PricesRepository {
  async upsertPrice(supabase: SupabaseClient, price: PriceDto) {
    const { error } = await supabase
      .from("prices")
      .upsert([price]);

    return { error };
  }

  async deletePrice(supabase: SupabaseClient, priceId: string) {
    const { error } = await supabase
      .from("prices")
      .delete()
      .eq("id", priceId);

    return { error };
  }
}

export async function createPricesRepository() {
  return new PricesRepository();
}
