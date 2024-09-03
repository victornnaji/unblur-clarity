import React from "react";
import { getServerUser } from "@/utils/auth-helpers/server";
import { redirect } from "next/navigation";
import PricingTables from "@/components/UI/Stripe/PricingTables";
import Faq from "@/components/UI/FAQ";
import { productsFaq } from "@/config";

export default async function Products() {
  const user = await getServerUser();
  if (!user) {
    redirect("/signin?redirect=/products");
  }

  return (
    <div>
      <PricingTables user={user} />
      <Faq contents={productsFaq} />
    </div>
  );
}
