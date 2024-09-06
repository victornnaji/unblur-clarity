"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { PredictionDto } from "@/types/dtos";
import { cache } from "react";

export const insertPrediction = async ({
  supabase,
  prediction,
  userId,
}: {
  supabase: SupabaseClient;
  prediction: Partial<PredictionDto>;
  userId?: string;
}): Promise<{ id: string }> => {
  console.log("prediction from upsertPrediction", prediction);
  const { data, error: upsertError } = await supabase
    .from("prediction")
    .insert({
      id: prediction.id,
      status: prediction.status,
      created_at: prediction.created_at,
      started_at: prediction.started_at,
      user_id: userId,
    })
    .select();

  if (upsertError) {
    throw new Error(`Error creating prediction: ${upsertError.message}`);
  }

  return { id: data[0].id };
};

export const updatePrediction = async (
  supabase: SupabaseClient,
  predictionId: string,
  updateData: Partial<PredictionDto>
): Promise<{ id: string }> => {
  const { data, error: updateError } = await supabase
    .from("prediction")
    .update([updateData])
    .eq("id", predictionId)
    .select()
    .single();

  if (updateError) {
    console.error("Update error:", updateError);
    throw new Error(`Error updating prediction: ${updateError.message}`);
  }

  if (!data) {
    throw new Error("No data returned after updating prediction");
  }

  console.log("Update result:", data);

  return { id: data.id };
};

export const getSubscriptions = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .in("status", ["active"])
    .eq("user_id", user?.id)
    .maybeSingle();

  return subscription;
});

export const getProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  return products;
});

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getCredits = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: credits, error: creditsError } = await supabase
    .from("users")
    .select("credits")
    .eq("id", user.id)
    .single();

  const { data: oneTimeCredits, error: oneTimeCreditsError } = await supabase
    .from("users")
    .select("one_time_credits")
    .eq("id", user.id)
    .single();

  if (creditsError || oneTimeCreditsError) {
    console.error(
      "Error fetching credits:",
      creditsError || oneTimeCreditsError
    );
    throw new Error("Failed to fetch credits");
  }

  const totalCredits = credits?.credits + oneTimeCredits?.one_time_credits || 0;

  return totalCredits;
});
