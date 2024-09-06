import { BillingInterval } from "@/types";
import clsx from "clsx";
import React from "react";
import Balancer from "react-wrap-balancer";

const billingIntervalOptions = [
  {
    label: "Monthly",
    value: "month",
  },
  {
    label: "Yearly",
    value: "year",
  },
  {
    label: "One-time",
    value: "one_time",
  },
];
const PricingHeader = ({
  billingInterval,
  onBillingIntervalChange,
}: {
  billingInterval: BillingInterval;
  onBillingIntervalChange: (value: BillingInterval) => void;
}) => {
  return (
    <div className="max-w-6xl mx-auto my-8">
      <div className="sm:flex sm:flex-col sm:align-center">
        <h1 className="text-4xl font-extrabold text-center sm:text-4xl">
          <Balancer>Subscription Plans</Balancer>
        </h1>
        <p className="max-w-2xl m-auto mt-5 text-xl text-zink text-center ">
          <Balancer>
            Subscribe to a pricing plan to begin unblurring and enhancing your
            images.
          </Balancer>
        </p>
        <div className="relative self-center mt-6 bg-gray rounded-lg p-0 sm:mt-8 border m-auto flex items-center justify-start cursor-pointer">
          {billingIntervalOptions.map((option, index) => (
            <button
              key={option.value}
              onClick={() =>
                onBillingIntervalChange(option.value as BillingInterval)
              }
              type="button"
              className={clsx(
                `${
                  billingInterval === option.value
                    ? "relative w-1/2 bg-purple border-zinc-800 shadow-sm text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-zink"
                }`,
                index === 1
                  ? "before:content-[''] before:absolute before:left-0 before:top-[10%] before:w-px before:h-[80%] before:bg-white/20 after:content-[''] after:absolute after:right-0 after:top-[10%] after:w-px after:h-[80%] after:bg-white/20"
                  : "",
                "rounded-md m-1 py-3 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingHeader;
