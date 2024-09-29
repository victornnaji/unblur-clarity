"use server";

import { PredictionDto } from "@/types/dtos";
import { getInProgressPredictionsByUser } from "@/utils/supabase/actions";

export async function getInProgressPredictions(): Promise<{
  data?: PredictionDto[];
  error?: string;
}> {
  try {
    const data = await getInProgressPredictionsByUser();
    return { data };
  } catch (error) {
    return { error: "Failed to fetch in-progress predictions" };
  }
}
