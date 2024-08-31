"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { PredictionDto } from "@/types/dtos";

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
    .eq('id', predictionId)
    .select()
    .single();

  if (updateError) {
    console.error("Update error:", updateError);
    throw new Error(`Error updating prediction: ${updateError.message}`);
  }

  if (!data) {
    throw new Error('No data returned after updating prediction');
  }

  console.log("Update result:", data);

  return { id: data.id };
};