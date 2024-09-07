"use client";

import {
  BillingInterval,
  ProductWithPrices,
  SubscriptionWithProducts,
} from "@/types";
import React, { useCallback, useState } from "react";
import PricingHeader from "./PricingHeader";
import PricingBody from "./PricingBody";
import { usePathname, useRouter } from "next/navigation";
import { checkoutWithStripe } from "@/utils/stripe/admin";
import { PriceDto } from "@/types/dtos";
import { getErrorRedirect } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe/client";

interface PricingTablesProps {
  products: ProductWithPrices[];
  subscription: SubscriptionWithProducts;
}

const stripePromise = getStripe();

const PricingTables = ({ products, subscription }: PricingTablesProps) => {
  const router = useRouter();
  const currentPath = usePathname();

  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckout = useCallback(
    async (price: PriceDto) => {
      setIsLoading(true);
      const { errorRedirect, sessionUrl } = await checkoutWithStripe(price);

      if (errorRedirect) {
        return router.push(errorRedirect);
      }

      if (!sessionUrl) {
        return router.push(
          getErrorRedirect(
            currentPath,
            "An error occurred while redirecting to Stripe",
            "Please try again"
          )
        );
      }
      router.push(sessionUrl);
      setIsLoading(false);
    },
    [currentPath, router]
  );

  return (
    <section>
      <PricingHeader
        billingInterval={billingInterval}
        onBillingIntervalChange={(value) => setBillingInterval(value)}
      />
      <PricingBody
        products={products}
        billingInterval={billingInterval}
        subscription={subscription}
        onCheckout={handleCheckout}
        isLoading={isLoading}
      />
    </section>
  );
};

export default PricingTables;
