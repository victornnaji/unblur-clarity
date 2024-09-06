"use client";

import {
  BillingInterval,
  ProductWithPrices,
  SubscriptionWithProducts,
  User,
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
  user: User;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProducts;
}

const stripePromise = getStripe();

const PricingTables = ({
  user,
  products,
  subscription,
}: PricingTablesProps) => {
  const router = useRouter();
  const currentPath = usePathname();

  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBillingIntervalChange = (value: BillingInterval) => {
    setBillingInterval(value);
  };

  const handleCheckout = useCallback(
    async (price: PriceDto) => {
      setIsLoading(true);
      if (!user) {
        return router.push("/signin?redirect=/products");
      }

      const { errorRedirect, url } = await checkoutWithStripe(price);

      if (errorRedirect) {
        return router.push(errorRedirect);
      }

      if (!url) {
        return router.push(
          getErrorRedirect(
            currentPath,
            "An error occurred while redirecting to Stripe",
            "Please try again"
          )
        );
      }
      router.push(url);
      setIsLoading(false);
    },
    [currentPath, router, user]
  );

  return (
    <section>
      <PricingHeader
        billingInterval={billingInterval}
        onBillingIntervalChange={handleBillingIntervalChange}
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
