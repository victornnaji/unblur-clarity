"use server";

import { PredictionDto } from "@/types/dtos";
import type { cloudinaryFolders } from "@/types";
import { getPredictionById } from "@/data/services/predictions.service";
import { uploadImage } from "@/data/services/upload.service";

const POLLING_INTERVAL = 2000;

export const uploadImageToCloudinary = async (
  imageUrl: string,
  folder: cloudinaryFolders = "unblur-photos"
) => {
  const result = await uploadImage(imageUrl, folder);
  return result;
  // return {
  //   url: "https://res.cloudinary.com/victornnaji/image/upload/v1727945534/unblur-photos/sturdmc9j3nybd5r0zza.jpg",
  // };
};

export const pollPredictionStatus = async (predictionId: string) => {
  const checkStatus = async (): Promise<PredictionDto> => {
    const data = await getPredictionById(predictionId);

    if (!["starting", "processing"].includes(data.status || "")) {
      return data;
    }

    await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
    return checkStatus();
  };

  return checkStatus();
};

export const getPredictionStartTime = async (predictionId: string) => {
  const data = await getPredictionById(predictionId);
  return data.created_at;
};
