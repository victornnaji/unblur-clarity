"use server";

import { CreateReplicatePredictionDto } from "@/types/dtos";
import { createReplicatePredictionRepository } from "@/data/repositories/replicate.repository";
import { CustomError } from "@/errors/CustomError";

export const queueReplicatePrediction = async (
  createPredictionData: CreateReplicatePredictionDto
) => {
  try {
    const prediction = await createReplicatePredictionRepository(
      createPredictionData
    );

    if (prediction.error) {
      throw new CustomError(prediction.error, 500, {
        cause: prediction.error,
        context: {
          predictionId: createPredictionData.replicateModel,
          userId: createPredictionData.userId
        }
      });
    }
    return prediction;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
