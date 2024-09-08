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
  prediction: Partial<PredictionDto>
): Promise<{ id: string }> => {
  const { data, error: updateError } = await supabase
    .from("prediction")
    .update([prediction])
    .eq("id", prediction.id)
    .select()
    .single();

  if (updateError) {
    console.error("Update error:", updateError);
    throw new Error(`Error updating prediction: ${updateError.message}`);
  }

  if (!data) {
    throw new Error("No data returned after updating prediction");
  }

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

  return totalCredits;
});
