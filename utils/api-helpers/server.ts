"use server";

import { PredictionDto } from "@/types/dtos";
import { v2 as cloudinary } from "cloudinary";
import { Prediction } from "replicate";
import { createClient } from "../supabase/server";

export const uploadImageToCloudinary = async (imageUrl: string) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "unblur-photos",
    });

    return { url: result.secure_url };
    // return {
    //   url: "https://asset.cloudinary.com/victornnaji/e7f72e4904bfb716e920365caa6d2f82",
    // };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

const POLLING_INTERVAL = 2000;
const MAX_ATTEMPTS = 60;

export const pollPredictionStatus = async (predictionId: string) => {
  const supabase = createClient();
  let attempts = 0;

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

    if (++attempts >= MAX_ATTEMPTS) {
      throw new Error("Polling timed out");
    }

    await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
    return checkStatus();
  };

  return checkStatus();
};
