import { PlanDetails, PlanName, UnblurModel } from "@/types";

// export const creditsByPlan: Record<PlanName, PlanDetails> = {
//   [PlanName.BASIC]: { id: "prod_Qo3CqCT6mOb8xa", credits: 300 },
//   [PlanName.STANDARD]: { id: "prod_Qo3SpTFndJxvK3", credits: 600 },
//   [PlanName.PREMIUM]: { id: "prod_Qo3V4lI6RYiWzf", credits: 1440 },
//   [PlanName.ONE_TIME_BASIC]: { id: "prod_Qo3cSiP0Ba0XBs", credits: 120 },
//   [PlanName.ONE_TIME_STANDARD]: { id: "prod_Qo3lA0vsuduRRT", credits: 600 }
// };

export const CREDITS_PER_UNBLUR: Record<UnblurModel, number> = {
  image_upscaling: 8,
  image_restoration: 1,
  face_restoration: 1,
  text_restoration: 1
};
