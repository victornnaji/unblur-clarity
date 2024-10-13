"use client";

import { BillingInterval, ProductWithPrices } from "@/types";
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
  hasSubscription: boolean;
}

getStripe();

const PricingTable = ({ products, hasSubscription }: PricingTablesProps) => {
  const router = useRouter();
  const currentPath = usePathname();

  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckout = useCallback(
    async (price: PriceDto) => {
      setIsLoading(true);
      const { errorRedirect, sessionUrl } = await checkoutWithStripe(
        price,
        currentPath
      );

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

      return () => {
        setIsLoading(false);
      };
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
        hasSubscription={hasSubscription}
        onCheckout={handleCheckout}
        isLoading={isLoading}
      />
    </section>
  );
};

export default PricingTable;
