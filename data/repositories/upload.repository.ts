"use server";

import { v2 as cloudinary } from "cloudinary";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { randomUUID } from "node:crypto";
import { SupabaseClient } from "@supabase/supabase-js";

class UploadRepository {
  async uploadImageToCloudinary(imageUrl: string, folder: string) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      folder
    });

    return uploadResult;
  }

  async uploadImageToSupabase(
    supabase: SupabaseClient,
    imageUrl: string,
    folder: string
  ) {
    const fileName = `${randomUUID()}-unblurred.png`;

    const uploadResult = await supabase.storage
      .from(folder)
      .upload(fileName, imageUrl, {
        cacheControl: "3600",
        contentType: "image/png"
      });

    return { fileName, error: uploadResult.error };
  }

  async getImageFromSupabase(
    supabase: SupabaseClient,
    fileName: string,
    folder: string
  ) {
    const { data } = supabase.storage.from(folder).getPublicUrl(fileName);
    return { data };
  }
}

export async function createUploadRepository() {
  return new UploadRepository();
}
