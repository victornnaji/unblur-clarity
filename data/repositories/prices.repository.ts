import { PriceDto } from "@/types/dtos";
import { createServiceRoleClient } from "@/utils/supabase/admin";

const upsertPrice = async (price: PriceDto) => {
  const supabaseAdmin = createServiceRoleClient();

  const { error } = await supabaseAdmin.from("prices").upsert([price]);

  return { error };
};

const deletePrice = async (priceId: string) => {
  const supabaseAdmin = createServiceRoleClient();

  const { error } = await supabaseAdmin
    .from("prices")
    .delete()
    .eq("id", priceId);

  return { error };
};

export const priceRepository = {
  upsertPrice,
  deletePrice
};
