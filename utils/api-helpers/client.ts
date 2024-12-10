"use client";

import { getPredictionById } from "@/data/services/predictions.service";
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

export const pollPredictionStatus = async (predictionId: string) => {
  const MAX_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  const POLLING_INTERVAL = 5000; // 5 seconds
  const startTime = Date.now();

  const checkStatus = async (): Promise<PredictionDto> => {
    if (Date.now() - startTime >= MAX_DURATION) {
      throw new Error('Polling timeout exceeded: Operation took longer than 15 minutes');
    }

    const data = await getPredictionById(predictionId);

    if (!["starting", "processing"].includes(data.status || "")) {
      return data;
    }

    await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
    return checkStatus();
  };

  return Promise.race([
    checkStatus(),
    new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Polling timeout exceeded: Operation took longer than 15 minutes')), 
      MAX_DURATION
    ))
  ]);
};
