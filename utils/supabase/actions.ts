"use server";

import { cache } from "react";
import { createClient } from "./server";
import { getAuthUserOrNull } from "@/data/services/auth.service";

export const getSubscriptionForUser = cache(async () => {
  const supabase = createClient();
  const user = await getAuthUserOrNull();
  if (!user) return null;
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*, products(*)")
    .in("status", ["active"])
    .eq("user_id", user?.id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching subscription:", error);
    throw new Error("Failed to fetch subscription");
  }

  return subscription ?? null;
});

export const getUserHasSubscription = cache(async (): Promise<boolean> => {
  const subscription = await getSubscriptionForUser();
  return !!subscription;
});