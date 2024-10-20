"use server";

import { SubscriptionDto } from "@/types/dtos";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export const upsertSubscriptionByAdminRepository = async (subscription: SubscriptionDto) => {
  const supabaseAdmin = createServiceRoleClient();

  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(subscription, { onConflict: "id" });

  return { data, error };
};

export const getSubscriptionByUserIdRepository = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*, products(*)")
    .in("status", ["active"])
    .eq("user_id", userId)
    .maybeSingle();

  return { data, error };
};
