"use server";

import { PredictionDto, UserDto } from "@/types/dtos";
import { cache } from "react";
import { createClient } from "./server";
import { getServerUser, getServerUserOrNull } from "../auth-helpers/server";

export const insertPrediction = async (
  prediction: PredictionDto
): Promise<{ id: string }> => {
  const supabase = createClient();
  const user = await getServerUser();

  if (!prediction.id) {
    throw new Error("Prediction ID is required");
  }

  const { data, error: upsertError } = await supabase
    .from("predictions")
    .insert({
      ...prediction,
      user_id: user.id,
    })
    .select()
    .single();

  if (upsertError) {
    throw new Error(`Error creating prediction: ${upsertError.message}`);
  }

  return { id: data.id };
};

export const getCredits = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("credits, one_time_credits")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching credits:", error);
    throw new Error("Failed to fetch credits");
  }

  const totalCredits = (data?.credits || 0) + (data?.one_time_credits || 0);

  return { data: totalCredits, error };
};

export const withdrawCredits = async (
  userId: string,
  creditsToWithdraw: number
) => {
  const supabase = createClient();
  // Fetch current credits and one-time credits
  const { data, error: fetchError } = await supabase
    .from("users")
    .select("credits, one_time_credits")
    .eq("id", userId)
    .single();

  if (fetchError) {
    return { data: null, error: fetchError };
  }

  const currentCredits = data?.credits || 0;
  const currentOneTimeCredits = data?.one_time_credits || 0;
  const totalAvailableCredits = currentCredits + currentOneTimeCredits;

  // Check if user has enough total credits
  if (totalAvailableCredits < creditsToWithdraw) {
    return { data: null, error: new Error("Insufficient credits") };
  }

  // Calculate how many credits to withdraw from each column
  const creditsToWithdrawFromCredits = Math.min(
    currentCredits,
    creditsToWithdraw
  );
  const creditsToWithdrawFromOneTime =
    creditsToWithdraw - creditsToWithdrawFromCredits;

  // Update the credits
  const newCredits = currentCredits - creditsToWithdrawFromCredits;
  const newOneTimeCredits =
    currentOneTimeCredits - creditsToWithdrawFromOneTime;

  // Update the database
  const { error: updateError } = await supabase
    .from("users")
    .update({
      credits: newCredits,
      one_time_credits: newOneTimeCredits,
    })
    .eq("id", userId);

  if (updateError) {
    return { data: null, error: updateError };
  }

  return {
    data: {
      remainingCredits: newCredits,
      remainingOneTimeCredits: newOneTimeCredits,
    },
    error: null,
  };
};

export const getSubscriptionForUser = cache(async () => {
  const supabase = createClient();
  const user = await getServerUser();
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
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

export const getUser = cache(async (): Promise<UserDto | null> => {
  const supabase = createClient();
  const user = await getServerUserOrNull();

  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user from public users:", error);
    throw new Error("Failed to fetch user data");
  }

  return {
    ...data,
    provider: user.app_metadata.provider ?? "",
  };
});

export const getCompletedPredictionsByUser = cache(
  async (): Promise<PredictionDto[]> => {
    const supabase = createClient();
    const user = await getServerUser();

    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "succeeded")
      .order("completed_at", { ascending: false });

    if (error) {
      console.error("Error fetching completed predictions:", error);
      throw new Error("Failed to fetch completed predictions");
    }

    return data as PredictionDto[];
  }
);

export const getInProgressPredictionsByUser = cache(async () => {
  const supabase = createClient();
  const user = await getServerUser();

  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", user.id)
    .in("status", ["starting", "processing"])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching in-progress predictions:", error);
    throw new Error("Failed to fetch in-progress predictions");
  }

  return data as PredictionDto[];
});

export const getProducts = cache(async () => {
  const supabase = createClient();
  await getServerUser();
  const { data: products, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }

  return products ?? [];
});

export const getUserCredits = cache(async () => {
  const supabase = createClient();
  const user = await getServerUserOrNull();
  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("credits, one_time_credits")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching credits:", error);
    throw new Error("Failed to fetch credits");
  }

  const totalCredits = (data?.credits || 0) + (data?.one_time_credits || 0);

  return totalCredits ?? 0;
});
