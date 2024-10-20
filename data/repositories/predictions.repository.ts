import { PredictionDto } from "@/types/dtos";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

const getAllPredictionsByUserId = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
};

const getPredictionById = async (predictionId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("id", predictionId)
    .single();

  return { data, error };
};

const getInProgressPredictionsByUserId = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", userId)
    .in("status", ["starting", "processing"])
    .order("created_at", { ascending: false });

  return { data, error };
};

const getCompletedPredictionsByUserId = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "succeeded")
    .order("completed_at", { ascending: false });

  return { data, error };
};

const createPrediction = async (prediction: PredictionDto) => {
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

const updatePredictionByAdmin = async (prediction: Partial<PredictionDto>) => {
  const supabaseAdmin = createServiceRoleClient();

  const { data, error } = await supabaseAdmin
    .from("predictions")
    .update(prediction)
    .eq("id", prediction.id!)
    .select()
    .single();

  return { data, error };
};

export const predictionRepository = {
  getAllPredictionsByUserId,
  getInProgressPredictionsByUserId,
  getCompletedPredictionsByUserId,
  createPrediction,
  getPredictionById,
  updatePredictionByAdmin
};
