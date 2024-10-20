"use server";

import { v2 as cloudinary } from "cloudinary";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { randomUUID } from "node:crypto";

export const uploadImageToCloudinaryRepository = async (imageUrl: string, folder: string) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const uploadResult = await cloudinary.uploader.upload(imageUrl, {
    folder
  });

  return uploadResult;
};

export const uploadImageToSupabaseRepository = async (imageUrl: string, folder: string) => {
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

export const getImageFromSupabaseRepository = async (fileName: string, folder: string) => {
  const supabaseAdmin = createServiceRoleClient();
  const { data } = supabaseAdmin.storage.from(folder).getPublicUrl(fileName);

  return { data };
};
