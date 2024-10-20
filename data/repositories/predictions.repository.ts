"use server";

import { PredictionDto } from "@/types/dtos";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export const getAllPredictionsByUserIdRepository = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
};

export const getPredictionByIdRepository = async (predictionId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("id", predictionId)
    .single();

  return { data, error };
};

export const getInProgressPredictionsByUserIdRepository = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", userId)
    .in("status", ["starting", "processing"])
    .order("created_at", { ascending: false });

  return { data, error };
};

export const getCompletedPredictionsByUserIdRepository = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "succeeded")
    .order("completed_at", { ascending: false });

  return { data, error };
};

export const createPredictionRepository = async (prediction: PredictionDto) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("predictions")
    .insert({
      ...prediction
    })
    .select()
    .single();

  return { id: data?.id, error };
};

export const updatePredictionByAdminRepository = async (prediction: Partial<PredictionDto>) => {
  const supabaseAdmin = createServiceRoleClient();

  const { data, error } = await supabaseAdmin
    .from("predictions")
    .update(prediction)
    .eq("id", prediction.id!)
    .select()
    .single();

  return { data, error };
};
