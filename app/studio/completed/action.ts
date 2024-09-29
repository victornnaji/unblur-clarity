"use server";

import { PredictionDto } from "@/types/dtos";
import { getCompletedPredictionsByUser } from "@/utils/supabase/actions";

export async function getCompletedPredictions(): Promise<{
  predictions?: PredictionDto[];
  error?: string;
}> {
  try {
    const data = await getCompletedPredictionsByUser();
    return { predictions: data };
  } catch (error) {
    return { error: "Failed to fetch completed predictions" };
  }
}
