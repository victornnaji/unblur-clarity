export type UnblurOptionValue =
  | "image_upscaling"
  | "image_restoration"
  | "text_restoration";

export interface UnblurOptionType {
  value: UnblurOptionValue;
  label: string;
}
