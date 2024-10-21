"use server";

import { UpdateCreditsPayloadDto } from "@/types/dtos";
import { SupabaseClient } from "@supabase/supabase-js";

class CreditsRepository {
  async getUserCreditsByUserId(supabase: SupabaseClient, userId: string) {
    const { data, error } = await supabase
      .from("users")
      .select("credits, one_time_credits")
      .eq("id", userId)
      .single();

    return { data, error };
  }

  async updateUserCredits(
    supabase: SupabaseClient,
    userId: string,
    updatePayload: UpdateCreditsPayloadDto
  ) {
    const { error } = await supabase
      .from("users")
      .update({
        credits: updatePayload.credits,
        one_time_credits: updatePayload.oneTimeCredits
      })
      .eq("id", userId)
      .select();

    return { error };
  }

  async removeAllUserSubscriptionCreditsByAdmin(
    supabase: SupabaseClient,
    userId: string
  ) {
    const { error } = await supabase
      .from("users")
      .update({ credits: 0 })
      .eq("id", userId);

    return { error };
  }
}

export async function createCreditsRepository() {
  return new CreditsRepository();
}