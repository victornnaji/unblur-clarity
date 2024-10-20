import { CreateReplicatePredictionDto } from "@/types/dtos";
import { createReplicateClient } from "@/utils/replicate/server";

const createPrediction = async ({
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

export const replicateRepository = {
  createPrediction
};
