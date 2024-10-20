"use server";

import Stripe from "stripe";
import { upsertSubscription } from "../supabase/admin";
import { getCreditsForPlan } from "../api-helpers/client";
import { stripe } from "./config";
import { calculateFairUpgradeCredits } from "../helpers";
import { getCustomerByIdByAdmin } from "@/data/services/customers.service";
import { deleteProduct, upsertProduct } from "@/data/services/products.service";
import { deletePrice, upsertPrice } from "@/data/services/prices.service";
import {
  getUserCreditsByAdmin,
  removeAllUserSubscriptionCreditsByAdmin,
  updateUserCreditsByAdmin
} from "@/data/services/credits.service";

export const handleSubscription = async (subscription: Stripe.Subscription) => {
  const customer = await getCustomerByIdByAdmin(
    subscription.customer as string
  );
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

export const handleSubscriptionUpdate = async (
  subscription: Stripe.CustomerSubscriptionUpdatedEvent
) => {
  const customer = await getCustomerByIdByAdmin(
    subscription.data.object.customer as string
  );
  if (!customer) {
    throw new Error("Supabase customer lookup failed");
  }
  const userId = customer.id;

  try {
    await upsertSubscription(
      subscription.data.object as Stripe.Subscription,
      userId
    );
    console.log(
      `Subscription ${subscription.id} updated successfully for user ${userId}`
    );

    const previousPlan =
      subscription.data.previous_attributes?.items?.data[0]?.plan;
    const newPlan = subscription.data.object.items?.data[0]?.plan;

    if (previousPlan && newPlan) {
      const newProductId = newPlan.product as string;
      const previousPlanPrice = previousPlan.amount as number;
      const newPlanPrice = newPlan.amount as number;

      if (previousPlanPrice < newPlanPrice) {
        const invoice = await stripe.invoices.retrieve(
          subscription.data.object.latest_invoice as string
        );
        const amountPaid = invoice.amount_paid;
        const { credits: currentCredits } = await getUserCreditsByAdmin(userId);
        const totalCreditsInNewPlan = getCreditsForPlan(newProductId);

        console.log(
          "amountPaid",
          amountPaid,
          "newPlanPrice",
          newPlanPrice,
          "previousPlanPrice",
          previousPlanPrice,
          "totalCreditsInNewPlan",
          totalCreditsInNewPlan,
          "currentCredits",
          currentCredits
        );

        const fairCredits = calculateFairUpgradeCredits(
          previousPlanPrice,
          newPlanPrice,
          totalCreditsInNewPlan,
          amountPaid,
          currentCredits
        );

        const newCredits = await updateUserCreditsByAdmin(userId, {
          credits: fairCredits
        });
        console.log(
          `Credits updated successfully for user ${userId} to ${newCredits}`
        );
        return newCredits;
      } else {
        console.log(
          `Plan changed for user ${userId}, but no credit update needed`
        );
      }
    } else {
      console.log(
        `Subscription updated for user ${userId} without plan change`
      );
    }
  } catch (error) {
    console.error("Error in handleSubscriptionUpdate:", error);
    throw error;
  }
};

export const handleSubscriptionDeletion = async (
  subscription: Stripe.Subscription
) => {
  const customer = await getCustomerByIdByAdmin(
    subscription.customer as string
  );
  if (!customer) {
    throw new Error("Supabase customer lookup failed");
  }
  const userId = customer.id;

  try {
    await upsertSubscription(subscription, userId);
    if (subscription.status === "canceled") {
      await removeAllUserSubscriptionCreditsByAdmin(userId);
      console.log(
        `Credits removed for user ${userId} on subscription deletion`
      );
    }
    return {
      data: {
        success: true
      }
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred"
    };
  }
};

export const handleCompletedCheckout = async (
  checkout: Stripe.Checkout.Session
) => {
  const customer = await getCustomerByIdByAdmin(checkout.customer as string);
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
      console.log(`Credits updated for user ${userId} on completed checkout`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else if (checkout.mode === "payment") {
    const payment = await stripe.checkout.sessions.listLineItems(checkout.id);
    const planId = payment.data[0].price?.product as string;
    try {
      await updateOneTimeCreditsByPlan(userId, planId);
      console.log(
        `One-time credits updated for user ${userId} on completed checkout`
      );
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

  const data = await updateUserCreditsByAdmin(userId, {
    credits: creditAmount
  });

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

  const data = await updateUserCreditsByAdmin(userId, {
    oneTimeCredits: creditAmount
  });

  return data;
};

export const handlePriceRecordUpdate = async (price: Stripe.Price) => {
  try {
    return await upsertPrice(price);
  } catch (error) {
    console.error(error);
  }
};

export const handleProductRecordUpdate = async (product: Stripe.Product) => {
  try {
    return await upsertProduct(product);
  } catch (error) {
    console.error(error);
  }
};

export const handlePriceRecordDeletion = async (price: Stripe.Price) => {
  try {
    return await deletePrice(price.id);
  } catch (error) {
    console.error(error);
  }
};

export const handleProductRecordDeletion = async (product: Stripe.Product) => {
  try {
    return await deleteProduct(product.id);
  } catch (error) {
    console.error(error);
  }
};
