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
