import { CustomError } from "@/errors/CustomError";
import { uploadRepository } from "../repositories/upload.repository";
import { CloudinaryError } from "@/errors/CloudinaryError";

export const uploadImage = async (imageUrl: string, folder: string) => {
  try {
    const uploadResult = await uploadRepository.uploadImageToCloudinary(
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
    const uploadResult = await uploadRepository.uploadImageToSupabase(
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
    const { data } = await uploadRepository.getImageFromSupabase(
      fileName,
      folder
    );

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
