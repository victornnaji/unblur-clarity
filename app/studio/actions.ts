"use server";

import {
  CREDITS_PER_UNBLUR,
  MEGVII_ENHANCE_MODEL,
  UPSCALE_CLARITY_MODEL,
  TENCENTARC_GFPGAN_FACE_ENHANCE_MODEL,
  UPSCALE_CLARITY_SYSTEM_PROMPT
} from "@/config";
import { getAuthUser } from "@/data/services/auth.service";
import {
  getUserCredits,
  getUserTotalCreditsByUserId,
  updateUserCredits,
  withdrawCredits
} from "@/data/services/credits.service";
import {
  createPrediction,
  deletePrediction
} from "@/data/services/predictions.service";
import { queueReplicatePrediction } from "@/data/services/replicate.service";
import { uploadImageToCloudinary } from "@/utils/api-helpers/server";
import { UnblurModel } from "@/types";
import { CustomError } from "@/errors/CustomError";

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
  try {
    const user = await getAuthUser();

    const credits = await getUserTotalCreditsByUserId(user.id);

    if (credits <= 12) {
      throw new CustomError("Not enough credits", 400, {
        cause: "Not enough credits",
        context: {
          userId: user.id
        }
      });
    }

    const { image_url, model, image_name } = payload;

    const { url: secure_url } = await uploadImageToCloudinary(image_url);

    let modelConfig = {
      replicateModel: "",
      input: {
        image: secure_url
      } as InputProps
    };

    switch (model) {
      case "image_upscaling":
        modelConfig = {
          replicateModel: UPSCALE_CLARITY_MODEL,
          input: {
            ...modelConfig.input,
            prompt: payload.prompt?.trim()
              ? `${UPSCALE_CLARITY_SYSTEM_PROMPT}, ${payload.prompt.trim()}`
              : UPSCALE_CLARITY_SYSTEM_PROMPT
          }
        };
        break;
      case "face_restoration":
        modelConfig = {
          replicateModel: TENCENTARC_GFPGAN_FACE_ENHANCE_MODEL,
          input: {
            img: secure_url
          }
        };
        break;
      case "image_restoration":
        modelConfig = {
          replicateModel: MEGVII_ENHANCE_MODEL,
          input: {
            ...modelConfig.input,
            task_type: "Image Debluring (REDS)"
          }
        };
        break;
      case "text_restoration":
        modelConfig = {
          replicateModel: MEGVII_ENHANCE_MODEL,
          input: {
            ...modelConfig.input,
            task_type: "Image Denoising"
          }
        };
        break;
      default:
        throw new Error("Invalid model");
    }

    await withdrawCredits(user.id, CREDITS_PER_UNBLUR);

    const prediction = await queueReplicatePrediction({
      ...modelConfig,
      userId: user.id,
      webhookUrl: `${defaultWebhookUrl}/replicate/webhook?userId=${user?.id}`
    });

    const predictionId = await createPrediction({
      id: prediction.id,
      status: prediction.status,
      created_at: prediction.created_at,
      started_at: prediction.started_at || null,
      original_image_url: secure_url,
      image_name: image_name || null,
      predict_time: prediction.metrics?.predict_time?.toString() || null,
      completed_at: prediction.completed_at || null,
      error: prediction.error || null,
      image_url: null,
      user_id: user.id,
      model: model
    });

    const result = { predictionId, secure_url };
    console.log("prediction successfully created on replicate", prediction);
    return result;
    // return {
    //   predictionId: "w774s3kjc9rj20cjx88v57hcrc",
    //   secure_url:
    //     "https://res.cloudinary.com/victornnaji/image/upload/v1730503863/unblur-photos/m49ceqp710ar7gnvcij6.png"
    // };
  } catch (error) {
    console.log("error creating prediction", error);
    //return back the credit taken
    const user = await getAuthUser();
    const { credits } = await getUserCredits();
    await updateUserCredits(user.id, {
      credits: credits + CREDITS_PER_UNBLUR
    });
    console.log("credits updated", credits + CREDITS_PER_UNBLUR);
    throw error;
  }
}

export async function initiatePredictionDeletion(predictionId: string) {
  try {
    await deletePrediction(predictionId);
  } catch (error) {
    console.log("error deleting prediction", error);
    throw error;
  }
}
