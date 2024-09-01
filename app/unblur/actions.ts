"use server";
import { MEGVII_ENHANCE_MODEL, UPSCALE_CLARITY_MODEL } from "@/config";
import { UnblurModel } from "@/types";
import { uploadImageToCloudinary } from "@/utils/api-helpers/server";
import { getErrorRedirect } from "@/utils/helpers";
import { insertPrediction } from "@/utils/supabase/actions";
import { createClient } from "@/utils/supabase/server";
import Replicate, { Prediction } from "replicate";

interface BasePayloadProps {
  image_url: string;
  model: UnblurModel;
}

interface ImageUpscalingPayload extends BasePayloadProps {
  model: "image_upscaling";
  prompt?: string;
  upscale_style?: string;
}

interface OtherModelPayload extends BasePayloadProps {
  model: Exclude<UnblurModel, "image_upscaling">;
}

type PayloadProps = ImageUpscalingPayload | OtherModelPayload;

interface InputProps {
  image: string;
  prompt?: string;
  style?: string;
  task_type?: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

interface SuccessResponse {
  predictionId: string;
  secure_url: string;
}

export async function initiatePrediction(payload: PayloadProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    getErrorRedirect(
      "/signin",
      "No user found",
      "Please sign in to unblur your image."
    );
  }

  const { image_url, model } = payload;

  const { url: secure_url } = await uploadImageToCloudinary(image_url);

  const replicateModel =
    model === "image_upscaling" ? UPSCALE_CLARITY_MODEL : MEGVII_ENHANCE_MODEL;

  let input: InputProps = {
    image: secure_url,
  };

  if (model === "image_upscaling") {
    input = {
      ...input,
      prompt:
        (payload as ImageUpscalingPayload).prompt ||
        "masterpiece, best quality, highres, <lora:more_details:0.5> <lora:SDXLrender_v2.0:1>",
      style: (payload as ImageUpscalingPayload).upscale_style || "default",
    };
  } else if (model === "image_restoration") {
    input = {
      ...input,
      task_type: "Image Debluring (REDS)",
    };
  } else if (model === "text_restoration") {
    input = {
      ...input,
      task_type: "Image Denoising",
    };
  } else {
    throw new Error("Invalid model");
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    // const prediction: Prediction = await replicate.predictions.create({
    //   version: replicateModel,
    //   input,
    //   webhook: `${process.env.NGROK_URL}/replicate/webhook?userId=${user?.id}`,
    //   webhook_events_filter: ["completed"],
    // });

    // const { id: predictionId } = await insertPrediction({
    //   supabase,
    //   prediction: {
    //     id: prediction.id,
    //     status: prediction.status,
    //     created_at: prediction.created_at,
    //     started_at: prediction.started_at,
    //   },
    //   userId: user?.id,
    // });

    // console.log("prediction successfully created on replicate", prediction);
    // return { predictionId, secure_url };
    return { predictionId: "dy3q453zv9rj40chn50axdngx4", secure_url };
  } catch (error) {
    console.log("error creating prediction", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { error: "Prediction creation failed", details: errorMessage };
  }
}
