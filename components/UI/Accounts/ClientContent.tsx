"use client";

import StripeCard from "@/components/UI/Accounts/StripeCard";
import SubscriptionCard from "@/components/UI/Accounts/SubscriptionCard";
import { links } from "@/config";
import { SubscriptionWithProduct } from "@/types";
import { PredictionDto } from "@/types/dtos";
import { createStripePortal } from "@/utils/stripe/admin";
import { useEffect, useState } from "react";

export function ClientContent({
  subscription,
  credits,
  oneTimeCredits,
  predictions,
  planCredit,
}: {
  subscription: SubscriptionWithProduct | null;
  credits: any;
  oneTimeCredits: any;
  predictions: PredictionDto[];
  planCredit: number | null;
}) {
  const [stripePortalUrl, setStripePortalUrl] = useState(
    links.account.path || ""
  );
  useEffect(() => {
    const fetchStripePortalUrl = async () => {
      const url = await createStripePortal(links.account.path || "");
      setStripePortalUrl(url);
    };
    fetchStripePortalUrl();
  }, []);

  const subscriptionUpgradeUrl = subscription?.id
    ? `${stripePortalUrl}/subscriptions/${subscription.id}/update`
    : null;

  return (
    <>
      <div className="_grid-area-sub">
        <SubscriptionCard
          subscription={subscription}
          credits={credits}
          oneTimeCredits={oneTimeCredits}
          subscriptionUpgradeUrl={subscriptionUpgradeUrl}
          predictions={predictions}
          planCredit={planCredit}
        />
      </div>
      <div className="_grid-area-stripe h-full">
        <StripeCard url={stripePortalUrl} />
      </div>
    </>
  );
}

export default ClientContent;
