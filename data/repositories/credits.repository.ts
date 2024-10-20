import { UpdateCreditsPayloadDto } from "@/types/dtos";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

const getUserCreditsByUserId = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("credits, one_time_credits")
    .eq("id", userId)
    .single();

  return { data, error };
};

const updateUserCreditsByAdmin = async (
  userId: string,
  updatePayload: UpdateCreditsPayloadDto
) => {
  const supabaseAdmin = createServiceRoleClient();
  const { error } = await supabaseAdmin
    .from("users")
    .update({
      credits: updatePayload.credits,
      one_time_credits: updatePayload.oneTimeCredits
    })
    .eq("id", userId)
    .select();

  return { error };
};

const removeAllUserSubscriptionCreditsByAdmin = async (userId: string) => {
  const supabaseAdmin = createServiceRoleClient();
  const { error } = await supabaseAdmin
    .from("users")
    .update({ credits: 0 })
    .eq("id", userId);

  return { error };
};

const getUserCreditsByAdmin = async (userId: string) => {
  const supabaseAdmin = createServiceRoleClient();
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("credits, one_time_credits")
    .eq("id", userId)
    .single();

  return { data, error };
};

export const creditsRepository = {
  getUserCreditsByUserId,
  updateUserCreditsByAdmin,
  removeAllUserSubscriptionCreditsByAdmin,
  getUserCreditsByAdmin
};
