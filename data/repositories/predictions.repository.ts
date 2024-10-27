"use server";

import { PredictionDto } from "@/types/dtos";
import { SupabaseClient } from "@supabase/supabase-js";

class PredictionsRepository {
  async getAllPredictionsByUserId(supabase: SupabaseClient, userId: string) {
    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    return { data, error };
  }

  async getPredictionById(supabase: SupabaseClient, predictionId: string) {
    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .eq("id", predictionId)
      .single();

    return { data, error };
  }

  async getInProgressPredictionsByUserId(
    supabase: SupabaseClient,
    userId: string
  ) {
    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .eq("user_id", userId)
      .in("status", ["starting", "processing"])
      .order("created_at", { ascending: false });

    return { data, error };
  }

  async getCompletedPredictionsByUserId(
    supabase: SupabaseClient,
    userId: string
  ) {
    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .eq("user_id", userId)
      .in("status", ["succeeded", "failed"])
      .order("completed_at", { ascending: false });

    return { data, error };
  }

  async createPrediction(supabase: SupabaseClient, prediction: PredictionDto) {
    const { data, error } = await supabase
      .from("predictions")
      .insert(prediction)
      .select()
      .single();

    return { id: data?.id, error };
  }

  async updatePrediction(
    supabase: SupabaseClient,
    prediction: Partial<PredictionDto>,
    userId: string
  ) {
    const { data, error } = await supabase
      .from("predictions")
      .update(prediction)
      .eq("id", prediction.id!)
      .eq("user_id", userId)
      .select()
      .single();

    return { data, error };
  }

  async deletePrediction(
    supabase: SupabaseClient,
    predictionId: string,
    userId: string
  ) {
    const { error } = await supabase
      .from("predictions")
      .delete()
      .eq("id", predictionId)
      .eq("user_id", userId);

    return { error };
  }
}

export async function createPredictionsRepository() {
  return new PredictionsRepository();
}
