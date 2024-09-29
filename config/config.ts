import { ImageUpscalingStyleOptionType, UnblurOptionType } from "@/types";

export const unblurOptions: UnblurOptionType[] = [
  { value: "image_upscaling", label: "Image Upscaling" },
  { value: "face_restoration", label: "Face Restoration" },
  { value: "image_restoration", label: "Image Restoration" },
  { value: "text_restoration", label: "Text Restoration" }
];
export const DEFAULT_UNBLUR_OPTION = unblurOptions[0];

export const imageUpscalingStyleOptions: ImageUpscalingStyleOptionType[] = [
  { value: "default", label: "Default" },
  { value: "portrait", label: "Portrait" },
  { value: "anime", label: "Anime" }
];
export const DEFAULT_UPSCALING_STYLE = imageUpscalingStyleOptions[0];

export const UPSCALE_CLARITY_MODEL =
  "dfad41707589d68ecdccd1dfa600d55a208f9310748e44bfe35b4a6291453d5e";
export const MEGVII_ENHANCE_MODEL =
  "018241a6c880319404eaa2714b764313e27e11f950a7ff0a7b5b37b27b74dcf7";
export const CODEFORMER_FACE_ENHANCE_MODEL =
  "7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56";

