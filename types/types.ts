export type UnblurModel =
  | "image_upscaling"
  | "image_restoration"
  | "text_restoration";

export type UpscalingStyle = "default" | "portrait" | "anime";

export interface UnblurOptionType {
  value: UnblurModel;
  label: string;
}

export type ImageUpscalingStyleOptionType = {
  value: UpscalingStyle;
  label: string;
};

export interface PhotoType {
  name: string;
  previewImage: string;
  originalImage: string;
  restoredImage: string;
}

export type ToastVariants = "success" | "error";
export enum AppStatusEnum {
  IDLE = "idle",
  RESET = "reset",
  PROCESSING = "processing",
  CANCELED = "canceled",
  SUCCESS = "success",
  ERROR = "error",
}
