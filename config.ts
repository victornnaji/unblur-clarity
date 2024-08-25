import { ImageUpscalingStyleOptionType, UnblurOptionType } from "./types";

export const config = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Unblur Photos",
  description:
    "Unblur Photo: AI-powered photo restoration app. Remove blur, upscale your favorite photos, and achieve professional results at home. Transform your photos now.",
};

export const unblurOptions: UnblurOptionType[] = [
  { value: "image_upscaling", label: "Image Upscaling" },
  { value: "image_restoration", label: "Image Restoration" },
  { value: "text_restoration", label: "Text Restoration" },
];
export const DEFAULT_UNBLUR_OPTION = unblurOptions[0];

export const imageUpscalingStyleOptions: ImageUpscalingStyleOptionType[] = [
  { value: "default", label: "Default" },
  { value: "portrait", label: "Portrait" },
  { value: "anime", label: "Anime" },
];
export const DEFAULT_UPSCALING_STYLE = imageUpscalingStyleOptions[0];

export const tooltipText = {
  imageUpscalingInput:
    "Add a prompt or leave empty to use system prompt. Make sure to add a prompt that is relevant to the image you are upscaling.",
  imageUpscalingSelector:
    "Add a style to change the way your image is upscaled. Leave default to match the original image style as close as possible.",
  modelSelector: "The type of enhancement you want to apply to your image.",
};
