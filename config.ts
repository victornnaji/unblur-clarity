import { UnblurOptionType } from "./types";

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

export const imageUpscalingStyleOptions = [
  { value: "default", label: "Default" },
  { value: "portrait", label: "Portrait" },
  { value: "anime", label: "Anime" },
];
export const DEFAULT_UPSCALING_STYLE = imageUpscalingStyleOptions[0];
