"use server";

import type { cloudinaryFolders } from "@/types";
import { getPredictionById } from "@/data/services/predictions.service";
import { uploadImage } from "@/data/services/upload.service";
import { getProductById } from "@/data/services/products.service";

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

export const getCreditAmountByProductId = async (productId: string) => {
  const data = await getProductById(productId);

  if (!data?.credit_amounts) {
    throw new Error(
      "An error occured while fetching the product's credit amounts"
    );
  }

  return data.credit_amounts;
};
