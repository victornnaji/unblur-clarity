"use server";

import { PriceDto } from "@/types/dtos";
import { createServiceRoleClient } from "@/utils/supabase/admin";

export const upsertPriceRepository = async (price: PriceDto) => {
  const supabaseAdmin = createServiceRoleClient();

  const { error } = await supabaseAdmin.from("prices").upsert([price]);

  return { error };
};

export const deletePriceRepository = async (priceId: string) => {
  const supabaseAdmin = createServiceRoleClient();

  const { error } = await supabaseAdmin
    .from("prices")
    .delete()
    .eq("id", priceId);

  return { error };
};
