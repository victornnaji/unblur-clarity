"use server";

import { CreateReplicatePredictionDto } from "@/types/dtos";
import { createReplicateRepository } from "@/data/repositories/replicate.repository";
import { CustomError } from "@/errors/CustomError";
import { createReplicateClient } from "@/utils/replicate/server";

export const queueReplicatePrediction = async (
  createPredictionData: CreateReplicatePredictionDto
) => {
  const replicate = createReplicateClient();
  const replicateRepository = await createReplicateRepository();
  try {
    const prediction = await replicateRepository.createReplicatePrediction(
      replicate,
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
