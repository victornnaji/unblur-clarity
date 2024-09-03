"use client";
import { User } from "@/types";
import React, { useEffect } from "react";

interface StripePricingTableProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  "pricing-table-id": string;
  "publishable-key": string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": StripePricingTableProps;
    }
  }
}

const PricingTables = ({ user }: { user: User | null }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col w-full">
      <stripe-pricing-table
        pricing-table-id="prctbl_1PuGIvBb8uOnuhORd7pU4Xwv"
        publishable-key="pk_test_51I0J8ABb8uOnuhOR9b1xuavSpYcbzZ5TvJXflkTVZ8Fy7FFBWldW5OvpPdt93vXLRKOoxZGIiMRyYCCqrXtp7huu00VB6p31Zd"
        client-reference-id={user?.id}
        customer-email={user?.email}
      ></stripe-pricing-table>
    </div>
  );
};

export default PricingTables;
