import React from "react";
import { redirect } from "next/navigation";
import PricingTables from "@/components/UI/Stripe/PricingTables";
import Faq from "@/components/UI/FAQ";
import { productsFaq } from "@/config";
import {
  getProducts,
  getSubscriptions,
  getUser,
} from "@/utils/supabase/actions";
import { createClient } from "@/utils/supabase/server";

export default async function Products() {
  const supabase = createClient();

  const user = await getUser(supabase);

  if (!user) {
    redirect("/signin?redirect=/products");
  }
  const [products, subscription] = await Promise.all([
    getProducts(supabase),
    getSubscriptions(supabase),
  ]);

  return (
    <div>
      <PricingTables
        user={user}
        products={products ?? []}
        subscription={subscription}
      />
      <Faq contents={productsFaq} />
    </div>
  );
}
