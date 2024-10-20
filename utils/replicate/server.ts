import Replicate from "replicate";
import invariant from "tiny-invariant";

invariant(process.env.REPLICATE_API_TOKEN, "REPLICATE_API_TOKEN is required");
export const createReplicateClient = () => {
  return new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
  });
};
