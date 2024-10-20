"use server";

import { UpdateCreditsPayloadDto } from "@/types/dtos";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export const getUserCreditsByUserIdRepository = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("credits, one_time_credits")
    .eq("id", userId)
    .single();

  return { data, error };
};

export const updateUserCreditsByAdminRepository = async (
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

export const updateUserCreditsRepository = async (
  userId: string,
  updatePayload: UpdateCreditsPayloadDto
) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("users")
    .update({
      credits: updatePayload.credits,
      one_time_credits: updatePayload.oneTimeCredits
    })
    .eq("id", userId)
    .select();

  return { error };
};

export const removeAllUserSubscriptionCreditsByAdminRepository = async (userId: string) => {
  const supabaseAdmin = createServiceRoleClient();
  const { error } = await supabaseAdmin
    .from("users")
    .update({ credits: 0 })
    .eq("id", userId);

  return { error };
};

export const getUserCreditsByAdminRepository = async (userId: string) => {
  const supabaseAdmin = createServiceRoleClient();
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("credits, one_time_credits")
    .eq("id", userId)
    .single();

  return { data, error };
};

