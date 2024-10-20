import { creditsByPlan } from "@/config";
import { PredictionDto } from "@/types/dtos";
import { type Prediction } from "replicate";

export const mapReplicateResponseToPredictionDto = (response: Prediction) => {
  const mappedResponse: Omit<
    PredictionDto,
    "user_id" | "image_name" | "original_image_url" | "image_url"
  > = {
    id: response.id,
    status: response.status,
    error: response.error,
    created_at: response.created_at,
    started_at: response.started_at || null,
    completed_at: response.completed_at || null,
    predict_time: response.metrics?.predict_time?.toString() || "0"
  };

  return mappedResponse;
};

export const getCreditsForPlan = (planId: string) => {
  const plan = Object.values(creditsByPlan).find((plan) => plan.id === planId);
  return plan?.credits || 0;
};