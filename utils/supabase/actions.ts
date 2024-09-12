"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { PredictionDto, UserDto } from "@/types/dtos";
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
    .from("predictions")
    .insert({
      ...prediction,
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
    .from("predictions")
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

export const getUser = cache(
  async (supabase: SupabaseClient): Promise<UserDto | null> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
      provider: user.app_metadata.provider,
    };
  }
);

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

export const getCompletedPredictionsByUser = async (
  supabase: SupabaseClient
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "succeeded")
    .order("completed_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching completed predictions:", error);
    throw new Error("Failed to fetch completed predictions");
  }

  return data;
};

export const getInProgressPredictionsByUser = cache(
  async (supabase: SupabaseClient) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .eq("user_id", user.id)
      .in("status", ["starting", "processing"])
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Error fetching in-progress predictions:", error);
      throw new Error("Failed to fetch in-progress predictions");
    }

    return data;
  }
);
