"use server";

import { SubscriptionDto } from "@/types/dtos";
import { SupabaseClient } from "@supabase/supabase-js";

class SubscriptionRepository {
  async upsertSubscription(
    supabase: SupabaseClient,
    subscription: SubscriptionDto
  ) {
    const { data, error } = await supabase
      .from("subscriptions")
      .upsert(subscription, { onConflict: "id" });
    return { data, error };
  }

  async getSubscriptionByUserId(supabase: SupabaseClient, userId: string) {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*, products(*)")
      .in("status", ["active"])
      .eq("user_id", userId)
      .maybeSingle();
    return { data, error };
  }
}

export async function createSubscriptionRepository() {
  return new SubscriptionRepository();
}
