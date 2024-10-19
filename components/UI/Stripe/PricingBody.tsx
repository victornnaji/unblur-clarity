import {
  BillingInterval,
  ProductWithPrices,
  SubscriptionWithProducts
} from "@/types";
import React from "react";
import PricingCard from "./PricingCard";
import styles from "./pricing.module.css";
import clsx from "clsx";
import { PriceDto } from "@/types/dtos";

const PricingBody = ({
  products,
  billingInterval,
  hasSubscription,
  onCheckout,
  isLoading
}: {
  products: ProductWithPrices[];
  billingInterval: BillingInterval;
  hasSubscription: boolean;
  onCheckout: (price: PriceDto) => void;
  isLoading: boolean;
}) => {
  const sortedProducts = products.sort((a, b) => {
    const minPriceA = Math.min(
      ...a.prices.map((price) => price.unit_amount ?? 0)
    );
    const minPriceB = Math.min(
      ...b.prices.map((price) => price.unit_amount ?? 0)
    );

    return minPriceA - minPriceB;
  });

  return (
    <div
      className={clsx(
        styles.pricing_grid,
        "xl:w-4/6 mx-auto grid gap-4 items-center justify-center"
      )}
    >
      {sortedProducts.map((product) => {
        const price = product?.prices?.find(
          (price) =>
            price.interval === billingInterval || price.type === billingInterval
        );
        if (!price) return null;
        const isHighlighted = product.name === "Standard Plan";
        return (
          <PricingCard
            key={product.id + price.id}
            product={product}
            price={price}
            billingInterval={billingInterval}
            isHighlighted={isHighlighted}
            hasSubscription={hasSubscription}
            onCheckout={onCheckout}
            isLoading={isLoading}
          />
        );
      })}
    </div>
  );
};

export default PricingBody;
