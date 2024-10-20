"use server";

import type Stripe from "stripe";
import { stripe } from "@/utils/stripe/config";

export const createStripeSessionRepository = async (
  params: Stripe.Checkout.SessionCreateParams
) => {
  const session = await stripe.checkout.sessions.create(params);
  return session;
};

export const createStripePortalRepository = async (
  params: Stripe.BillingPortal.SessionCreateParams
) => {
  const portal = await stripe.billingPortal.sessions.create(params);
  return portal;
};

export const createCustomerInStripeRepository = async (userId: string, email: string) => {
  const customerData = { metadata: { userId }, email: email };
  const newCustomer = await stripe.customers.create(customerData);
  return newCustomer;
};

export const retrieveProductsFromStripeRepository = async () => {
  const products = await stripe.products.list({ active: true });
  return products;
};

export const retrievePricesFromStripeRepository = async () => {
  const prices = await stripe.prices.list({ active: true });
  return prices;
};

export const retrieveSubscriptionFromStripeRepository = async () => {
  const subscription = await stripe.subscriptions.list({
    status: "active"
  });
  return subscription;
};

export const retrieveCustomerFromStripeByIdRepository = async (customerId: string) => {
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
};

export const retrieveCustomerFromStripeByEmailRepository = async (email: string) => {
  const customers = await stripe.customers.list({ email });
  return customers.data;
};
