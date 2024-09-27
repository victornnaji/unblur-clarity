"use server";
import { CheckoutResponse } from "@/types";
import { PriceDto } from "@/types/dtos";
import { createClient } from "@/utils/supabase/server";
import {
  createOrRetrieveCustomer,
  upsertPriceRecord,
  upsertProductRecord
} from "@/utils/supabase/admin";
import { getErrorRedirect, getStatusRedirect, getURL } from "@/utils/helpers";
import Stripe from "stripe";
import { stripe } from "./config";

export async function checkoutWithStripe(
  price: PriceDto,
  redirectPath: string = "/unblur"
): Promise<CheckoutResponse> {
  try {
    const supabase = createClient();
    const {
      error,
      data: { user }
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error(error);
      throw new Error("Could not get user session.");
    }

    let customer: string;
    try {
      customer = await createOrRetrieveCustomer({
        userId: user?.id || "",
        email: user?.email || ""
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to access customer record.");
    }

    const isSubscription = price.type === "recurring";

    const successUrl = getURL(
      getStatusRedirect(
        redirectPath,
        "success",
        "Purchase Successful 🎉",
        `You have successfully ${
          isSubscription ? "subscribed" : "purchased credits"
        }. Happy unblurring!`,
        true
      )
    );

    let params: Stripe.Checkout.SessionCreateParams = {
      customer,
      customer_update: {
        address: "auto"
      },
      line_items: [
        {
          price: price.id,
          quantity: 1
        }
      ],

      client_reference_id: user.id,
      mode: isSubscription ? "subscription" : "payment",
      cancel_url: getURL("/products"),
      success_url: successUrl
    };

    let session;
    try {
      session = await stripe.checkout.sessions.create(params);
    } catch (err) {
      console.error(err);
      throw new Error("Unable to create checkout session.");
    }

    if (session) {
      return { sessionUrl: session.url };
    } else {
      throw new Error("Unable to create checkout session.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          error.message,
          "Please try again later or contact a system administrator."
        )
      };
    } else {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      };
    }
  }
}

export const createStripePortal = async (currentPath: string) => {
  try {
    const supabase = createClient();
    const {
      error,
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      if (error) {
        console.error(error);
      }
      throw new Error("Could not get user session.");
    }

    let customer;
    try {
      customer = await createOrRetrieveCustomer({
        userId: user.id || "",
        email: user.email || ""
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to access customer record.");
    }

    if (!customer) {
      throw new Error("Could not get customer.");
    }

    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: getURL(currentPath)
      });
      if (!url) {
        throw new Error("Could not create billing portal");
      }
      return url;
    } catch (err) {
      console.error(err);
      throw new Error("Could not create billing portal");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return getErrorRedirect(
        currentPath,
        error.message,
        "Please try again later or contact a system administrator."
      );
    } else {
      return getErrorRedirect(
        currentPath,
        "An unknown error occurred.",
        "Please try again later or contact a system administrator."
      );
    }
  }
};

export const syncStripeProductsAndPrices = async () => {
  try {
    const products = await stripe.products.list({ active: true });

    const prices = await stripe.prices.list({ active: true });

    for (const product of products.data) {
      await upsertProductRecord(product);
    }

    for (const price of prices.data) {
      await upsertPriceRecord(price);
    }

    console.log("Stripe products and prices synced successfully");
  } catch (error) {
    console.error("Error syncing Stripe products and prices:", error);
    throw error;
  }
};
