
import { cloudinary } from "@/utils/cloudinary/server";

const uploadImageToCloudinary = async (imageUrl: string, folder: string) => {
  const uploadResult = await cloudinary.uploader.upload(imageUrl, {
    folder
  });

  return uploadResult;
};

export const uploadRepository = {
  uploadImageToCloudinary
};
