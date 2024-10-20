"use server";

import { PredictionDto } from "@/types/dtos";
import { cache } from "react";
import { createClient } from "./server";
import { getAuthUser, getAuthUserOrNull } from "@/data/services/auth.service";

export const insertPrediction = async (
  prediction: PredictionDto
): Promise<{ id: string }> => {
  const supabase = createClient();
  const user = await getAuthUser();

  if (!prediction.id) {
    throw new Error("Prediction ID is required");
  }

  const { data, error: upsertError } = await supabase
    .from("predictions")
    .insert({
      ...prediction,
      user_id: user.id
    })
    .select()
    .single();

  if (upsertError) {
    throw new Error(`Error creating prediction: ${upsertError.message}`);
  }

  return { id: data.id };
};

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

export const getCompletedPredictionsByUser = async (): Promise<
  PredictionDto[]
> => {
  const supabase = createClient();
  const user = await getAuthUser();

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
};

export const getInProgressPredictionsByUser = async () => {
  const supabase = createClient();
  const user = await getAuthUser();

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
};

export const getAllPredictionsByUser = cache(async () => {
  const supabase = createClient();
  const user = await getAuthUser();

  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all predictions:", error);
    throw new Error("Failed to fetch all predictions");
  }

  return data as PredictionDto[];
});