import {
  ImageUpscalingStyleOptionType,
  PlanDetails,
  PlanName,
  UnblurOptionType,
} from "./types/types";

export const config = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Unblur Photos",
  description:
    "Unblur Photo: AI-powered photo restoration app. Remove blur, upscale your favorite photos, and achieve professional results at home. Transform your photos now.",
};

export const unblurOptions: UnblurOptionType[] = [
  { value: "image_upscaling", label: "Image Upscaling" },
  { value: "face_restoration", label: "Face Restoration" },
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

export const UPSCALE_CLARITY_MODEL =
  "dfad41707589d68ecdccd1dfa600d55a208f9310748e44bfe35b4a6291453d5e";
export const MEGVII_ENHANCE_MODEL =
  "018241a6c880319404eaa2714b764313e27e11f950a7ff0a7b5b37b27b74dcf7";
export const CODEFORMER_FACE_ENHANCE_MODEL =
  "7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56";

export const productsFaq = [
  {
    question: "Does my purchase expire?",
    answer: "No! Your purchase will never expire.",
  },
  {
    question: "Do you store my payment information?",
    answer:
      "Payments are processed by Stripe. We do not store your payment information.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "On special cases, we can offer a refund. Please contact us for more information.",
  },
  {
    question: "How many tokens do I need to unblur a photo?",
    answer:
      "You need at least 1 token to unblur a photo. Token balance of less than 1 will not be able to unblur a photo.",
  },
];

export const creditsByPlan: Record<PlanName, PlanDetails> = {
  [PlanName.BASIC]: { id: "prod_Qo3CqCT6mOb8xa", credits: 300 },
  [PlanName.STANDARD]: { id: "prod_Qo3SpTFndJxvK3", credits: 600 },
  [PlanName.PREMIUM]: { id: "prod_Qo3V4lI6RYiWzf", credits: 1440 },
  [PlanName.ONE_TIME_BASIC]: { id: "prod_Qo3cSiP0Ba0XBs", credits: 120 },
  [PlanName.ONE_TIME_STANDARD]: { id: "prod_Qo3lA0vsuduRRT", credits: 600 },
};

export const CREDITS_PER_UNBLUR = 12;