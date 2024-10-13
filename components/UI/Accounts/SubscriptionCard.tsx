"use client";

import { PredictionDto, SubscriptionDto } from "@/types/dtos";
import { getCreditsForPlan } from "@/utils/api-helpers/client";
import { Chip } from "@nextui-org/react";
import React from "react";
import { Button } from "@/components/UI/Button";
import { SubscriptionRow } from "./SubscriptionRow";
import AccountCard from "./Card";
import { links } from "@/config";

const SubscriptionCard = ({
  subscription,
  credits,
  oneTimeCredits,
  subscriptionUpgradeUrl,
  predictions
}: {
  subscription: SubscriptionDto | null;
  credits: number | null;
  oneTimeCredits: number | null;
  subscriptionUpgradeUrl: string | null;
  predictions: PredictionDto[];
}) => {
  const plan = getCreditsForPlan(subscription?.products?.id || "");
  const completedPredictions = predictions.filter(
    (prediction) => prediction.status === "succeeded"
  ).length;
  const totalPredictions = predictions.length;

  return (
    <AccountCard header="Subscription Overview">
      <div className="flex flex-col gap-2 h-full justify-center">
        <div className="flex gap-1 items-center">
          {subscription ? (
            <>
              <span>{subscription?.products?.name}</span>
              <span>
                <Chip size="sm" variant="light" color="success">
                  {subscription?.status}
                </Chip>
              </span>
            </>
          ) : (
            <span>No subscription</span>
          )}
        </div>
        <div className="border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            {subscription && (
              <SubscriptionRow
                title="Subscription Credits"
                description={
                  <div className="flex gap-2">
                    <div>
                      <span className="text-darkzink">Remaining: </span>
                      <span>{credits}</span>
                    </div>
                    <span> / </span>
                    <div>
                      <span className="text-darkzink">Total: </span>
                      <span>{plan}</span>
                    </div>
                  </div>
                }
              />
            )}
            <SubscriptionRow
              title="One-Time Credits"
              description={oneTimeCredits}
            />
            <SubscriptionRow
              title="Enhancements"
              description={
                <div className="flex gap-2">
                  <div>
                    <span className="text-darkzink">Completed: </span>
                    <span>{completedPredictions}</span>
                  </div>
                  <span> / </span>
                  <div>
                    <span className="text-darkzink">Total: </span>
                    <span>{totalPredictions}</span>
                  </div>
                </div>
              }
            />
          </dl>
        </div>
        {subscriptionUpgradeUrl ? (
          <div className="flex justify-start sm:w-fit">
            <Button href={subscriptionUpgradeUrl} className="w-full">Upgrade Subscription</Button>
          </div>
        ) : (
          <div className="flex justify-start sm:w-fit">
            <Button className="w-full" href={links.products.path}>
              Buy Credits
            </Button>
          </div>
        )}
      </div>
    </AccountCard>
  );
};

export default SubscriptionCard;
