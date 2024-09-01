import { Prediction } from "replicate";
import { Tables } from "./supabase";

export interface PredictionDto extends Tables<"prediction"> {
  status: Prediction["status"];
  predict_time: number | undefined;
}
