import { type Prediction } from "replicate";
import { Tables } from "./supabase";

export interface PredictionDto extends Tables<"predictions"> {
  status: Prediction["status"] | null;
  predict_time: string | null;
}

export interface ProductDto extends Tables<"products"> {};

export interface PriceDto extends Tables<"prices"> {
  type: "recurring" | "one_time" | null;
};

export interface UserDto extends Tables<"users"> {
  provider: string;
};

export interface SubscriptionDto extends Tables<"subscriptions"> {
  products: ProductDto | null;
};

export interface UpdateUserDto {
  email?: string;
  data?: {
    full_name?: string;
    name?: string;
  };
}

export type UpdateCreditsPayloadDto = {
  credits?: number;
  oneTimeCredits?: number;
};

export type CreateReplicatePredictionDto = {
  replicateModel: string;
  input: any;
  userId: string;
  webhookUrl: string;
}