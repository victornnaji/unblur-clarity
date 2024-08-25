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
  originalImage: string;
  restoredImage: string;
}
