"use server";

import { PredictionDto } from "@/types/dtos";
import { getInProgressPredictionsByUser } from "@/utils/supabase/actions";

export async function getInProgressPredictions(): Promise<{
  predictions?: PredictionDto[];
  error?: string;
}> {
  try {
    const data = await getInProgressPredictionsByUser();
    return { predictions: data };
  } catch (error) {
    return { error: "Failed to fetch in-progress predictions" };
  }
}
