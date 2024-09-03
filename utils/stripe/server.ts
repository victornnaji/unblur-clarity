"use server";

import Stripe from "stripe";
import {
  getCustomer,
  createCustomer,
  upsertSubscription,
  updateCustomerCredits,
  removeCustomerCredits,
  updateCustomerOneTimeCredits,
  getCustomerByEmail,
} from "../supabase/admin";
import { getCreditsForPlan } from "../api-helpers/client";
import { creditsByPlan } from "@/config";
import { PlanName } from "@/types";

export const handleSubscription = async (subscription: Stripe.Subscription) => {
  const customerId = subscription.customer as string;
  if (!customerId) {
    throw new Error("Missing customer ID");
  }

  const customer = await getCustomer(customerId);
  if (!customer || customer.error || !customer.data) {
    throw new Error("Supabase customer lookup failed");
  }
  if (customer.data.stripe_customer_id !== subscription.customer) {
    throw new Error("Unblur customer ID does not match stripe customer ID");
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
  const customerId = subscription.customer as string;
  if (!customerId) {
    throw new Error("Missing customer ID");
  }

  const customer = await getCustomer(customerId);
  if (!customer || customer.error || !customer.data) {
    throw new Error("Supabase customer lookup failed");
  }

  const userId = customer.data.id;

  try {
    if (subscription.status === "canceled") {
      const { error } = await upsertSubscription(subscription, userId);
      if (error) {
        console.error("Supabase subscription upsert error:", error);
        throw new Error(
          `Supabase subscription upsert failed: ${error.message}`
        );
      }
      const { data: creditData, error: creditError } = await deleteCredits(
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

export const handleCredits = async (invoice: Stripe.Invoice) => {
  const customerId = invoice.customer as string;
  if (!customerId) {
    throw new Error("Missing customer ID");
  }

  const customer = await getCustomer(customerId);
  if (!customer || customer.error || !customer.data) {
    throw new Error("Supabase customer lookup failed");
  }
  if (customer.data.stripe_customer_id !== customerId) {
    throw new Error("Unblur customer ID does not match stripe customer ID");
  }

  const userId = customer.data.id;

  try {
    const planId = invoice.lines?.data[0].price?.product as string;
    if (!planId) {
      throw new Error("Missing plan ID");
    }
    const { data: creditData, error: creditError } = await updateCredits(
      userId,
      planId
    );
    if (creditError) {
      throw new Error("Supabase credit update failed");
    }
    console.log({ creditData });
  } catch (error) {
    console.error(error);
  }
};

export const handleOneTimeCredit = async (
  paymentIntent: Stripe.PaymentIntent
) => {
  const customerId = paymentIntent.customer as string;
  if (!customerId) {
    throw new Error("Missing customer ID");
  }

  const customer = await getCustomer(customerId);
  if (!customer || customer.error || !customer.data) {
    throw new Error("Supabase customer lookup failed");
  }
  if (customer.data.stripe_customer_id !== customerId) {
    throw new Error("Unblur customer ID does not match stripe customer ID");
  }

  const userId = customer.data.id;
  const { data, error } = await updateOneTimeCredits(userId);
  if (error) {
    throw new Error("Supabase one-time credit update failed");
  }
  console.log({ data });
};

export const handleCustomer = async (customer: Stripe.Customer) => {
  const { email, id: customerId } = customer;

  if (!email) {
    throw new Error("Missing customer email");
  }
  const { data, error: queryError } = await getCustomerByEmail(email);

  if (queryError) {
    throw new Error("Supabase customer lookup failed");
  }

  if (!data) {
    const { error } = await createCustomer(userId, customerId);

    if (error) {
      throw new Error("Supabase customer creation failed");
    }
  }
};

export const updateCredits = async (userId: string, planId: string) => {
  const creditAmount = getCreditsForPlan(planId);

  console.log({ creditAmount, userId, planId });

  if (!creditAmount) {
    throw new Error("Invalid plan ID");
  }

  const { data, error } = await updateCustomerCredits(userId, creditAmount);

  return { data, error };
};

export const updateOneTimeCredits = async (userId: string) => {
  const oneTimeCreditPlan = getCreditsForPlan(
    creditsByPlan[PlanName.ONE_TIME].id
  );

  if (!oneTimeCreditPlan) {
    throw new Error("Invalid plan ID");
  }

  const { data, error } = await updateCustomerOneTimeCredits(
    userId,
    oneTimeCreditPlan
  );
  return { data, error };
};

export const deleteCredits = async (userId: string) => {
  const { data, error } = await removeCustomerCredits(userId);
  return { data, error };
};