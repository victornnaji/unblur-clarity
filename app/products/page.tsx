import React from "react";
import Faq from "@/components/UI/FAQ";
import { productsFaq } from "@/config";
import { getUserHasSubscription } from "@/utils/supabase/actions";
import { getProducts } from "@/utils/supabase/actions";
import dynamic from "next/dynamic";
import LoadingDots from "@/components/UI/LoadingDots";

const PricingTable = dynamic(
  () => import("@/components/UI/Stripe/PricingTable"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[50vh] w-full grid place-items-center">
        <LoadingDots />
      </div>
    ),
  }
);
export default async function Products() {
  const [products, hasSubscription] = await Promise.all([
    getProducts(),
    getUserHasSubscription(),
  ]);

  return (
    <div>
      <PricingTable products={products} hasSubscription={hasSubscription} />
      <Faq contents={productsFaq} />
    </div>
  );
}
