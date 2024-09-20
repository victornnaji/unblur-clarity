"use server";

import Stripe from "stripe";
import {
  upsertSubscription,
  updateCustomerCredits,
  removeCustomerCredits,
  updateCustomerOneTimeCredits,
  upsertPriceRecord,
  upsertProductRecord,
  deletePriceRecord,
  deleteProductRecord,
  getCustomer,
} from "../supabase/admin";
import { getCreditsForPlan } from "../api-helpers/client";
import { stripe } from "./config";

export const handleSubscription = async (subscription: Stripe.Subscription) => {
  const customer = await getCustomer(subscription.customer as string);
  if (!customer) {
    throw new Error("Supabase customer lookup failed");
  }
  const userId = customer.id;
  try {
    await upsertSubscription(subscription, userId);
    console.log(
      `Subscription ${subscription.id} updated successfully for user ${userId}`
    );
  } catch (error) {
    console.error("Error in handleSubscription:", error);
    throw error;
  }
};

export const handleSubscriptionDeletion = async (
  subscription: Stripe.Subscription
) => {
  const customer = await getCustomer(subscription.customer as string);
  if (!customer) {
    throw new Error("Supabase customer lookup failed");
  }
  const userId = customer.id;

  try {
    await upsertSubscription(subscription, userId);
    if (subscription.status === "canceled") {
      await removeCustomerCredits(userId);
      console.log(
        `Credits removed for user ${userId} on subscription deletion`
      );
    }
    return {
      data: {
        success: true,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export const handleCompletedCheckout = async (
  checkout: Stripe.Checkout.Session
) => {
  const customer = await getCustomer(checkout.customer as string);
  if (!customer) {
    throw new Error("Supabase customer lookup failed");
  }
  const userId = customer.id;

  if (checkout.mode === "subscription") {
    const subscription = await stripe.checkout.sessions.listLineItems(
      checkout.id
    );
    const planId = subscription.data[0].price?.product as string;
    try {
      await updateCreditsByPlan(userId, planId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else if (checkout.mode === "payment") {
    const payment = await stripe.checkout.sessions.listLineItems(checkout.id);
    const planId = payment.data[0].price?.product as string;
    try {
      await updateOneTimeCreditsByPlan(userId, planId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export const updateCreditsByPlan = async (userId: string, planId: string) => {
  const creditAmount = getCreditsForPlan(planId);

  if (!creditAmount) {
    throw new Error("Invalid plan Id");
  }

  const data = await updateCustomerCredits(userId, creditAmount);

  return data;
};

export const updateOneTimeCreditsByPlan = async (
  userId: string,
  planId: string
) => {
  const creditAmount = getCreditsForPlan(planId);

  if (!creditAmount) {
    throw new Error("Invalid plan Id");
  }

  const data = await updateCustomerOneTimeCredits(userId, creditAmount);

  return data;
};

export const handlePriceRecordUpdate = async (price: Stripe.Price) => {
  try {
    return await upsertPriceRecord(price);
  } catch (error) {
    console.error(error);
  }
};

export const handleProductRecordUpdate = async (product: Stripe.Product) => {
  try {
    return await upsertProductRecord(product);
  } catch (error) {
    console.error(error);
  }
};

export const handlePriceRecordDeletion = async (price: Stripe.Price) => {
  try {
    return await deletePriceRecord(price);
  } catch (error) {
    console.error(error);
  }
};

export const handleProductRecordDeletion = async (product: Stripe.Product) => {
  try {
    return await deleteProductRecord(product);
  } catch (error) {
    console.error(error);
  }
};
