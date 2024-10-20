import clsx from "clsx";
import React from "react";
import styles from "./pricing.module.css";
import { BillingInterval, ProductWithPrices } from "@/types";
import { PriceDto } from "@/types/dtos";
import { Button } from "@/components/UI/Button";

const PricingCard = ({
  product,
  price,
  hasSubscription,
  isLoading,
  isHighlighted,
  billingInterval,
  onCheckout
}: {
  product: ProductWithPrices;
  isHighlighted: boolean;
  price: PriceDto;
  billingInterval: BillingInterval;
  hasSubscription: boolean;
  onCheckout: (price: PriceDto) => void;
  isLoading: boolean;
}) => {
  const metadata = product.metadata || {};
  const marketingFeatures =
    typeof metadata === "object" && "marketing_features" in metadata
      ? JSON.parse(metadata.marketing_features as string)
      : [];

  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency!,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) / 100);

  return (
    <div
      className={clsx(
        styles.pricing_card,
        "flex flex-col max-w-md rounded-lg lg:p-8 p-4",
        isHighlighted && "bg-gray"
      )}
    >
      {isHighlighted && (
        <div className="flex justify-between mb-4">
          <span className="bg-purple-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            Most popular 🔥
          </span>
        </div>
      )}
      <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
      <p className="text-darkzink mb-4 text-sm">{product.description}</p>
      <div className="flex items-end mb-6">
        <span className="text-5xl font-bold text-white">{priceString}</span>
        {billingInterval !== "one_time" && (
          <span className="text-gray-500 ml-2 flex flex-col text-sm leading-5 text-darkzink">
            <span>per </span>
            <span>{billingInterval}</span>
          </span>
        )}
      </div>
      <Button
        onClick={() => onCheckout(price)}
        isLoading={isLoading}
        className="mb-6"
      >
        {price.type === "one_time"
          ? "Buy Credit"
          : hasSubscription
          ? "Manage Subscription"
          : "Subscribe"}
      </Button>
      <div className="space-y-2 text-zink text-sm">
        <p className="">This includes:</p>
        {marketingFeatures.map((feature: { name: string }, index: number) => (
          <div key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-purple-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{feature.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
