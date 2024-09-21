import React from "react";
import Button from "@/components/UI/Button";
import AccountCard from "./Card";

const StripeCard = ({ url }: { url: string }) => {
  return (
    <div>
      <AccountCard header="Account">
        <div className="text-sm mb-4 text-darkzink">
          Manage your account on stripe - Upgrade your subscription plan, change
          your payment method, etc.
        </div>
        <div className="flex justify-start md:w-[fit-content]">
          <Button href={url} target="_blank" className="w-full">
            Manage Account
          </Button>
        </div>
      </AccountCard>
    </div>
  );
};

export default StripeCard;
