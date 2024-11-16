"use server";

import { PredictionDto } from "@/types/dtos";
import type { cloudinaryFolders } from "@/types";
import { getPredictionById } from "@/data/services/predictions.service";
import { uploadImage } from "@/data/services/upload.service";

export const uploadImageToCloudinary = async (
  imageUrl: string,
  folder: cloudinaryFolders = "unblur-photos"
) => {
  const result = await uploadImage(imageUrl, folder);
  return result;
};



export const getPredictionStartTime = async (predictionId: string) => {
  const data = await getPredictionById(predictionId);
  return data.created_at;
};
