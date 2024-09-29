"use client";

import StripeCard from "@/components/UI/Accounts/StripeCard";
import SubscriptionCard from "@/components/UI/Accounts/SubscriptionCard";
import { PredictionDto, SubscriptionDto } from "@/types/dtos";
import { createStripePortal } from "@/utils/stripe/admin";
import { useEffect, useState } from "react";


export function ClientContent({
  subscription,
  credits,
  oneTimeCredits,
  predictions,
}: {
  subscription: SubscriptionDto | null;
  credits: any;
  oneTimeCredits: any;
  predictions: PredictionDto[];
}) {
  const [stripePortalUrl, setStripePortalUrl] = useState("/account");
  useEffect(() => {
    const fetchStripePortalUrl = async () => {
      const url = await createStripePortal("/account");
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
        />
      </div>
      <div className="_grid-area-stripe h-full">
        <StripeCard url={stripePortalUrl} />
      </div>
    </>
  );
}

export default ClientContent;
