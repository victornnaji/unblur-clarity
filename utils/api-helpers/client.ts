import { PredictionDto } from "@/types/dtos";
import { type Prediction } from "replicate";

export const mapReplicateResponseToPredictionDto = (response: Prediction) => {
  const mappedResponse: Omit<
    PredictionDto,
    "user_id" | "image_name" | "original_image_url" | "image_url" | "model"
  > = {
    id: response.id,
    status: response.status,
    error: "An error happened with the AI model provider",
    created_at: response.created_at,
    started_at: response.started_at || null,
    completed_at: response.completed_at || null,
    predict_time: response.metrics?.predict_time?.toString() || "0"
  };
  return mappedResponse;
};
