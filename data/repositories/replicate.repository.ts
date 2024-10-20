"use server";

import { CreateReplicatePredictionDto } from "@/types/dtos";
import { createReplicateClient } from "@/utils/replicate/server";

export const createReplicatePredictionRepository = async ({
  replicateModel,
  input,
  webhookUrl
}: CreateReplicatePredictionDto) => {
  const replicate = createReplicateClient();

  const prediction = await replicate.predictions.create({
    version: replicateModel,
    input,
    webhook: webhookUrl,
    webhook_events_filter: ["completed"]
  });

  return prediction;
};

