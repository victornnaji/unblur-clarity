"use server";

import {
  CODEFORMER_FACE_ENHANCE_MODEL,
  CREDITS_PER_UNBLUR,
  MEGVII_ENHANCE_MODEL,
  ALEXGENOVESE_FACE_UPSCALER,
  UPSCALE_CLARITY_MODEL,
  TENCENTARC_GFPGAN_FACE_ENHANCE_MODEL
} from "@/config";
import { UnblurModel } from "@/types";
import { uploadImageToCloudinary } from "@/utils/api-helpers/server";
import { getServerUser } from "@/utils/auth-helpers/server";
import {
  getCreditsForUser,
  getUserCredits,
  insertPrediction,
  withdrawCreditsForUser
} from "@/utils/supabase/actions";
import Replicate, { type Prediction } from "replicate";

interface BasePayloadProps {
  image_url: string;
  model: UnblurModel;
}

interface ImageUpscalingPayload extends BasePayloadProps {
  model: "image_upscaling";
  prompt?: string;
  upscale_style?: string;
  image_name?: string;
}

interface OtherModelPayload extends BasePayloadProps {
  model: Exclude<UnblurModel, "image_upscaling">;
  image_name?: string;
}

type PayloadProps = ImageUpscalingPayload | OtherModelPayload;

interface InputProps {
  image?: string;
  img?: string;
  prompt?: string;
  style?: string;
  task_type?: string;
  codeformer_fidelity?: number;
}

const defaultWebhookUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_URL || "";

export async function initiatePrediction(payload: PayloadProps) {
  const user = await getServerUser();

  const { data: credits, error } = await getCreditsForUser(user.id);

  if (error) {
    console.error("Error fetching credits:", error);
    return { error: "Failed to fetch credits" };
  }

  if (credits <= 12) {
    return { error: "Not enough credits" };
  }

  const { image_url, model, image_name } = payload;

  const { url: secure_url } = await uploadImageToCloudinary(image_url);

  let replicateModel;
  switch (model) {
    case "image_upscaling":
      replicateModel = UPSCALE_CLARITY_MODEL;
      break;
    case "face_restoration":
      replicateModel = TENCENTARC_GFPGAN_FACE_ENHANCE_MODEL;
      break;
    default:
      replicateModel = MEGVII_ENHANCE_MODEL;
  }

  let input: InputProps = {
    image: secure_url
  };

  if (model === "image_upscaling") {
    input = {
      ...input,
      prompt:
        (payload as ImageUpscalingPayload).prompt ||
        "masterpiece, best quality, highres, <lora:more_details:0.5> <lora:SDXLrender_v2.0:1>",
      style: (payload as ImageUpscalingPayload).upscale_style || "default"
    };
  } else if (model === "face_restoration") {
    input = {
      img: secure_url
    };
  } else if (model === "image_restoration") {
    input = {
      ...input,
      task_type: "Image Debluring (REDS)"
    };
  } else if (model === "text_restoration") {
    input = {
      ...input,
      task_type: "Image Denoising"
    };
  } else {
    throw new Error("Invalid model");
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
  });

  try {
    const data = await withdrawCreditsForUser(user.id, CREDITS_PER_UNBLUR);

    if (data.error) {
      return { error: "Failed to withdraw credits" };
    }

    const prediction: Prediction = await replicate.predictions.create({
      version: replicateModel,
      input,
      webhook: `${defaultWebhookUrl}/replicate/webhook?userId=${user?.id}`,
      webhook_events_filter: ["completed"]
    });

    const { id: predictionId } = await insertPrediction({
      id: prediction.id,
      status: prediction.status,
      created_at: prediction.created_at,
      started_at: prediction.started_at || null,
      original_image_url: secure_url,
      image_name: image_name || null,
      predict_time: prediction.metrics?.predict_time?.toString() || "0",
      completed_at: prediction.completed_at || null,
      error: prediction.error || null,
      image_url: null,
      user_id: user?.id
    });

    console.log("prediction successfully created on replicate", prediction);
    return { predictionId, secure_url };
    // return { predictionId: "h8b24nvfq9rgt0cja6aafd2bv0", secure_url };
  } catch (error) {
    console.log("error creating prediction", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { error: "Prediction creation failed", details: errorMessage };
  }
}

export async function getCredits(): Promise<{
  credits?: number | null;
  error?: string;
}> {
  try {
    const data = await getUserCredits();
    return { credits: data };
  } catch (error) {
    return { error: "Failed to fetch credits" };
  }
}
