import { cloudinary } from "@/utils/cloudinary/server";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { randomUUID } from "node:crypto";

const uploadImageToCloudinary = async (imageUrl: string, folder: string) => {
  const uploadResult = await cloudinary.uploader.upload(imageUrl, {
    folder
  });

  return uploadResult;
};

const uploadImageToSupabase = async (imageUrl: string, folder: string) => {
  const fileName = `${randomUUID()}-unblurred.png`;
  const supabaseAdmin = createServiceRoleClient();

  const uploadResult = await supabaseAdmin.storage
    .from(folder)
    .upload(fileName, imageUrl, {
      cacheControl: "3600",
      contentType: "image/png"
    });

  return { fileName, error: uploadResult.error };
};

const getImageFromSupabase = async (fileName: string, folder: string) => {
  const supabaseAdmin = createServiceRoleClient();
  const { data } = supabaseAdmin.storage
    .from(folder)
    .getPublicUrl(fileName);

  return { data };
};

export const uploadRepository = {
  uploadImageToCloudinary,
  uploadImageToSupabase,
  getImageFromSupabase
};
