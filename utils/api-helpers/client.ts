import { PredictionDto } from "@/types/dtos";
import { Prediction } from "replicate";

export const mapReplicateResponseToPredictionDto = (response: Prediction) => {
  const mappedResponse: Omit<PredictionDto, "user_id"> = {
    id: response.id,
    status: response.status,
    error: response.error,
    created_at: response.created_at,
    started_at: response.started_at || null,
    completed_at: response.completed_at || null,
    image_url: Array.isArray(response.output) ? response.output[0] : response.output,
    predict_time: response.metrics?.predict_time || null,
  };

  return mappedResponse;
};
