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
  if (!customer || customer.error || !customer.data) {
    throw new Error("Supabase customer lookup failed");
  }
  const userId = customer.data.id;
  try {
    const { error } = await upsertSubscription(subscription, userId);
    if (error) {
      console.error("Supabase subscription upsert error:", error);
      throw new Error(`Supabase subscription upsert failed: ${error.message}`);
    }
    console.log(
      `Subscription ${subscription.id} upserted successfully for user ${userId}`
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
  if (!customer || customer.error || !customer.data) {
    throw new Error("Supabase customer lookup failed");
  }
  const userId = customer.data.id;

  try {
    const { error } = await upsertSubscription(subscription, userId);
    if (error) {
      console.error("Supabase subscription upsert error:", error);
      throw new Error(`Supabase subscription upsert failed: ${error.message}`);
    }
    if (subscription.status === "canceled") {
      const { data: creditData, error: creditError } = await removeCredits(
        userId
      );
      if (creditError) {
        throw new Error("Supabase credit deletion failed");
      }
      console.log({ creditData });
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleCompletedCheckout = async (
  checkout: Stripe.Checkout.Session
) => {
  const customer = await getCustomer(checkout.customer as string);
  if (!customer || customer.error || !customer.data) {
    throw new Error("Supabase customer lookup failed");
  }
  const userId = customer.data.id;

  if (checkout.mode === "subscription") {
    const subscription = await stripe.checkout.sessions.listLineItems(
      checkout.id
    );
    const planId = subscription.data[0].price?.product as string;
    const { error } = await updateCreditsByPlan(userId, planId);
    if (error) {
      throw new Error("Supabase credit update failed");
    }
  } else if (checkout.mode === "payment") {
    const payment = await stripe.checkout.sessions.listLineItems(checkout.id);
    const planId = payment.data[0].price?.product as string;
    const { error } = await updateOneTimeCreditsByPlan(userId, planId);
    if (error) {
      throw new Error("Supabase credit update failed");
    }
  }
};

export const updateCreditsByPlan = async (userId: string, planId: string) => {
  const creditAmount = getCreditsForPlan(planId);

  if (!creditAmount) {
    throw new Error("Invalid plan Id");
  }

  const { data, error } = await updateCustomerCredits(userId, creditAmount);

  return { data, error };
};

export const updateOneTimeCreditsByPlan = async (userId: string, planId: string) => {
  const creditAmount = getCreditsForPlan(planId);

  if (!creditAmount) {
    throw new Error("Invalid plan Id");
  }

  const { data, error } = await updateCustomerOneTimeCredits(
    userId,
    creditAmount
  );

  return { data, error };
};

export const removeCredits = async (userId: string) => {
  const { data, error } = await removeCustomerCredits(userId);
  return { data, error };
};

export const handlePriceRecordUpdate = async (price: Stripe.Price) => {
  return await upsertPriceRecord(price);
};

export const handleProductRecordUpdate = async (product: Stripe.Product) => {
  return await upsertProductRecord(product);
};

export const handlePriceRecordDeletion = async (price: Stripe.Price) => {
  return await deletePriceRecord(price);
};

export const handleProductRecordDeletion = async (product: Stripe.Product) => {
  return await deleteProductRecord(product);
};
