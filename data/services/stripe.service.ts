"use server";

import { CustomError } from "@/errors/CustomError";
import type Stripe from "stripe";
import {
  createCustomerInStripeRepository,
  createStripePortalRepository,
  createStripeSessionRepository,
  retrieveCustomerFromStripeByEmailRepository,
  retrieveCustomerFromStripeByIdRepository,
  retrievePricesFromStripeRepository,
  retrieveProductsFromStripeRepository,
  retrieveSubscriptionFromStripeRepository
} from "@/data/repositories/stripe.repository";

export const createStripeCheckoutSession = async (
  params: Stripe.Checkout.SessionCreateParams
) => {
  try {
    const session = await createStripeSessionRepository(params);
    return session;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to create checkout session.", 500);
  }
};

export const createStripePortalSession = async (
  params: Stripe.BillingPortal.SessionCreateParams
) => {
  try {
    const portal = await createStripePortalRepository(params);
    return portal;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to create billing portal.", 500);
  }
};

export const createCustomerInStripe = async (
  userId: string,
  email: string
): Promise<string> => {
  try {
    const customer = await createCustomerInStripeRepository(userId, email);
    if (!customer) {
      throw new CustomError("Stripe customer creation failed.", 500, {
        cause: "Stripe customer creation failed.",
        context: {
          userId,
          email
        }
      });
    }
    return customer.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const retrieveProductsFromStripe = async () => {
  try {
    const products = await retrieveProductsFromStripeRepository();
    return products;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to retrieve products.", 500);
  }
};

export const retrievePricesFromStripe = async () => {
  try {
    const prices = await retrievePricesFromStripeRepository();
    return prices;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to retrieve prices.", 500);
  }
};

export const retrieveCustomerFromStripeById = async (customerId: string) => {
  try {
    const customer = await retrieveCustomerFromStripeByIdRepository(customerId);
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const retrieveCustomerFromStripeByEmail = async (email: string) => {
  try {
    const customers = await retrieveCustomerFromStripeByEmailRepository(email);
    return customers;
  } catch (error) {}
};

export const retrieveSubscriptionFromStripe = async () => {
  try {
    const subscription = await retrieveSubscriptionFromStripeRepository();
    return subscription;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to retrieve subscription.", 500);
  }
};
