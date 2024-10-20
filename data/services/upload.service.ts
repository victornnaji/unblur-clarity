"use server";

import { CustomError } from "@/errors/CustomError";
import { CloudinaryError } from "@/errors/CloudinaryError";
import {
  getImageFromSupabaseRepository,
  uploadImageToCloudinaryRepository,
  uploadImageToSupabaseRepository
} from "@/data/repositories/upload.repository";

export const uploadImage = async (imageUrl: string, folder: string) => {
  try {
    const uploadResult = await uploadImageToCloudinaryRepository(
      imageUrl,
      folder
    );
    return { url: uploadResult.secure_url };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new CloudinaryError("Failed to upload image", {
        cause: error,
        context: { folder }
      });
    }
    console.error("An unexpected error occurred", error);
    throw error;
  }
};

export const uploadImageToSupabase = async (
  imageUrl: string,
  folder: string
) => {
  try {
    const uploadResult = await uploadImageToSupabaseRepository(
      imageUrl,
      (folder = "unblurred-photos")
    );

    if (uploadResult.error) {
      throw new CustomError("Failed to upload image to Supabase", 500, {
        cause: uploadResult.error.message,
        context: { folder }
      });
    }

    return uploadResult.fileName;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getImageFromSupabase = async (
  fileName: string,
  folder: string
) => {
  try {
    const { data } = await getImageFromSupabaseRepository(fileName, folder);

    if (!data) {
      throw new CustomError("Image not found", 404, {
        cause: "Image not found",
        context: { fileName, folder }
      });
    }
    return { url: data.publicUrl };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
