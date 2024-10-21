"use server";

import { CustomError } from "@/errors/CustomError";
import type Stripe from "stripe";
import {
  createStripeRepository
} from "@/data/repositories/stripe.repository";
import { stripe } from "@/utils/stripe/config";

export const createStripeCheckoutSession = async (
  params: Stripe.Checkout.SessionCreateParams
) => {
  const stripeRepository = await createStripeRepository();
  try {
    const session = await stripeRepository.createStripeSession(stripe, params);
    if (session.url) {
      return session.url;
    } else {
      throw new CustomError("Unable to create checkout session.", 500);
    }
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to create checkout session.", 500);
  }
};

export const createStripePortalSession = async (
  params: Stripe.BillingPortal.SessionCreateParams
) => {
  const stripeRepository = await createStripeRepository();
  try {
    const portal = await stripeRepository.createStripePortal(stripe, params);
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
  const stripeRepository = await createStripeRepository();
  try {
    const customer = await stripeRepository.createCustomerInStripe(
      stripe,
      userId,
      email
    );
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
  const stripeRepository = await createStripeRepository();
  try {
    const products = await stripeRepository.retrieveProductsFromStripe(stripe);
    return products;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to retrieve products.", 500);
  }
};

export const retrievePricesFromStripe = async () => {
  const stripeRepository = await createStripeRepository();
  try {
    const prices = await stripeRepository.retrievePricesFromStripe(stripe);
    return prices;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to retrieve prices.", 500);
  }
};

export const retrieveCustomerFromStripeById = async (customerId: string) => {
  const stripeRepository = await createStripeRepository();
  try {
    const customer = await stripeRepository.retrieveCustomerFromStripeById(
      stripe,
      customerId
    );
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const retrieveCustomerFromStripeByEmail = async (email: string) => {
  const stripeRepository = await createStripeRepository();
  try {
    const customers = await stripeRepository.retrieveCustomerFromStripeByEmail(
      stripe,
      email
    );
    return customers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const retrieveSubscriptionFromStripe = async () => {
  const stripeRepository = await createStripeRepository();
  try {
    const subscription = await stripeRepository.retrieveSubscriptionFromStripe(
      stripe
    );
    return subscription;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to retrieve subscription.", 500);
  }
};
