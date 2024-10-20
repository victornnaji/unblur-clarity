"use server";

import type Stripe from "stripe";
import { links } from "@/config";
import { CheckoutResponse } from "@/types";
import { PriceDto } from "@/types/dtos";
import { getErrorRedirect, getStatusRedirect, getURL } from "@/utils/helpers";
import { createOrRetrieveCustomer } from "@/data/services/customers.service";
import { getAuthUser } from "@/data/services/auth.service";
import {
  createStripePortalSession,
  createStripeCheckoutSession,
  retrieveProductsFromStripe,
  retrievePricesFromStripe
} from "@/data/services/stripe.service";
import { upsertProduct } from "@/data/services/products.service";
import { upsertPrice } from "@/data/services/prices.service";
import { CustomError } from "@/errors/CustomError";

export async function checkoutWithStripe(
  price: PriceDto,
  redirectPath: string = "/studio"
): Promise<CheckoutResponse> {
  try {
    const user = await getAuthUser();
    const customer = await createOrRetrieveCustomer({
      userId: user.id,
      email: user.email || ""
    });

    if (!customer) {
      throw new Error("Could not get customer.");
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
      cancel_url: getURL(redirectPath),
      success_url: successUrl
    };

    const session = await createStripeCheckoutSession(params);
    if (session) {
      return { sessionUrl: session.url };
    } else {
      throw new Error("Unable to create checkout session.");
    }
  } catch (error) {
    if (error instanceof CustomError) {
      return {
        errorRedirect: getErrorRedirect(
          links.products.path,
          error.message,
          "Please try again later or contact a system administrator."
        )
      };
    } else {
      return {
        errorRedirect: getErrorRedirect(
          links.products.path,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      };
    }
  }
}

export const createStripePortal = async (currentPath: string) => {
  try {
    const user = await getAuthUser();
    const customer = await createOrRetrieveCustomer({
      userId: user.id || "",
      email: user.email || ""
    });

    if (!customer) {
      throw new Error("Could not get customer.");
    }

    try {
      const { url } = await createStripePortalSession({
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
    const products = await retrieveProductsFromStripe();

    const prices = await retrievePricesFromStripe();

    for (const product of products.data) {
      await upsertProduct(product);
    }

    for (const price of prices.data) {
      await upsertPrice(price);
    }

    console.log("Stripe products and prices synced successfully");
  } catch (error) {
    console.error("Error syncing Stripe products and prices:", error);
    throw error;
  }
};
