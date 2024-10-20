import { stripeRepository } from "@/data/repositories/stripe.repository";
import { CustomError } from "@/errors/CustomError";
import type Stripe from "stripe";

export const createStripeCheckoutSession = async (
  params: Stripe.Checkout.SessionCreateParams
) => {
  try {
    const session = await stripeRepository.createStripeSession(params);
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
    const portal = await stripeRepository.createStripePortal(params);
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
    const customer = await stripeRepository.createCustomerInStripe(
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
  try {
    const products = await stripeRepository.retrieveProductsFromStripe();
    return products;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to retrieve products.", 500);
  }
};

export const retrievePricesFromStripe = async () => {
  try {
    const prices = await stripeRepository.retrievePricesFromStripe();
    return prices;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to retrieve prices.", 500);
  }
};

export const retrieveCustomerFromStripeById = async (customerId: string) => {
  try {
    const customer = await stripeRepository.retrieveCustomerFromStripeById(
      customerId
    );
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const retrieveCustomerFromStripeByEmail = async (email: string) => {
  try {
    const customers = await stripeRepository.retrieveCustomerFromStripeByEmail(
      email
    );
    return customers;
  } catch (error) {}
};
