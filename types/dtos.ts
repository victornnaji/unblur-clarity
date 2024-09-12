import { Prediction } from "replicate";
import { Tables } from "./supabase";

export interface PredictionDto extends Tables<"predictions"> {
  status: Prediction["status"];
  predict_time: string | null;
}

export interface ProductDto extends Tables<"products"> {};

export interface PriceDto extends Tables<"prices"> {
  type: "recurring" | "one_time";
};

export interface UserDto extends Tables<"users"> {
  provider: string;
};

export interface SubscriptionDto extends Tables<"subscriptions"> {};