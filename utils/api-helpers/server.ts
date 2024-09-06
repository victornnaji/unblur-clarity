"use server";

import { PredictionDto } from "@/types/dtos";
import { v2 as cloudinary } from "cloudinary";
import { createClient } from "../supabase/server";
import { cache } from "react";

export const uploadImageToCloudinary = async (imageUrl: string) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // const result = await cloudinary.uploader.upload(imageUrl, {
    //   folder: "unblur-photos",
    // });

    // return { url: result.secure_url };
    return {
      url: "https://res.cloudinary.com/victornnaji/image/upload/v1725121461/unblur-photos/ehxgthsetnsbnrkgd2nl.png",
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

const POLLING_INTERVAL = 2000;

export const pollPredictionStatus = async (predictionId: string) => {
  const supabase = createClient();

  const checkStatus = async (): Promise<PredictionDto> => {
    const { data, error }: { data: PredictionDto | null; error: any } =
      await supabase
        .from("prediction")
        .select("*")
        .eq("id", predictionId)
        .single();

    if (error) throw new Error(`Error fetching prediction: ${error.message}`);
    if (!data) throw new Error("Prediction not found");

    if (!["starting", "processing"].includes(data.status)) {
      return data;
    }

    await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
    return checkStatus();
  };

  return checkStatus();
};

export const getPredictionStartTime = cache(async (predictionId: string) => {
  const supabase = createClient();
  const { data, error }: { data: PredictionDto | null; error: any } =
    await supabase
      .from("prediction")
      .select("created_at")
      .eq("id", predictionId)
      .single();

  if (error) throw new Error(`Error fetching prediction: ${error.message}`);
  if (!data) throw new Error("Prediction not found");

  return data.created_at;
});
