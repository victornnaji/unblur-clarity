"use client";

import React from "react";
import { Button } from "@/components/UI/Button";
import AccountCard from "./Card";

const StripeCard = ({ url }: { url: string }) => {
  return (
    <AccountCard header="Account">
      <div className="text-sm mb-4 text-darkzink">
        Manage your account on stripe - Upgrade your subscription plan, change
        your payment method, etc.
      </div>
      <div className="flex justify-start sm:w-[fit-content]">
        <Button href={url} className="w-full">
          Manage Account
        </Button>
      </div>
    </AccountCard>
  );
};

export default StripeCard;
