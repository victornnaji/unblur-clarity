import { PriceDto, ProductDto, SubscriptionDto } from "./dtos";
export type UnblurModel =
  | "image_upscaling"
  | "face_restoration"
  | "image_restoration"
  | "text_restoration";

export type UpscalingStyle = "default" | "portrait" | "anime";

export type cloudinaryFolders = "unblur-photos" | "unblurred-photos";

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
  ERROR = "error"
}

export type BillingInterval = "month" | "year" | "one_time";
export enum PlanName {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  ONE_TIME_BASIC = "ONE_TIME_BASIC",
  ONE_TIME_STANDARD = "ONE_TIME_STANDARD"
}

export interface PlanDetails {
  id: string;
  credits: number;
}

export type CheckoutResponse = {
  errorRedirect?: string;
  sessionUrl?: string;
};

export interface PriceWithProduct extends PriceDto {
  products: ProductDto | null;
}

export interface ProductWithPrices extends ProductDto {
  prices: PriceDto[];
}

export interface SubscriptionWithProduct extends SubscriptionDto {
  products: ProductDto | null;
}

export interface SubscriptionWithProductsAndPrice
  extends SubscriptionWithProduct {
  prices: PriceWithProduct | null;
}
