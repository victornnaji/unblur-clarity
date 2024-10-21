"use server";

import { CreateReplicatePredictionDto } from "@/types/dtos";
import Replicate from "replicate";

class ReplicateRepository {
  async createReplicatePrediction(
    replicate: Replicate,
    { replicateModel, input, webhookUrl }: CreateReplicatePredictionDto
  ) {
    const prediction = await replicate.predictions.create({
      version: replicateModel,
      input,
      webhook: webhookUrl,
      webhook_events_filter: ["completed"]
    });

    return prediction;
  }
}

export async function createReplicateRepository() {
  return new ReplicateRepository();
}
