import React from "react";
import Faq from "@/components/UI/FAQ";
import { productsFaq } from "@/config";
import { getProducts, getSubscriptions } from "@/utils/supabase/actions";
import { createClient } from "@/utils/supabase/server";
import dynamic from "next/dynamic";
import LoadingDots from "@/components/UI/LoadingDots";

const PricingTable = dynamic(
  () => import("@/components/UI/Stripe/PricingTables"),
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
  const supabase = createClient();

  const [products, subscription] = await Promise.all([
    getProducts(supabase),
    getSubscriptions(supabase),
  ]);

  return (
    <div>
      <PricingTable products={products ?? []} subscription={subscription} />
      <Faq contents={productsFaq} />
    </div>
  );
}
