import type Stripe from "stripe";
import { stripe } from "@/utils/stripe/config";

const createStripeSession = async (
  params: Stripe.Checkout.SessionCreateParams
) => {
  const session = await stripe.checkout.sessions.create(params);
  return session;
};

const createStripePortal = async (
  params: Stripe.BillingPortal.SessionCreateParams
) => {
  const portal = await stripe.billingPortal.sessions.create(params);
  return portal;
};

const createCustomerInStripe = async (userId: string, email: string) => {
  const customerData = { metadata: { userId }, email: email };
  const newCustomer = await stripe.customers.create(customerData);
  return newCustomer;
};

const retrieveProductsFromStripe = async () => {
  const products = await stripe.products.list({ active: true });
  return products;
};

const retrievePricesFromStripe = async () => {
  const prices = await stripe.prices.list({ active: true });
  return prices;
};

const retrieveSubscriptionFromStripe = async () => {
  const subscription = await stripe.subscriptions.list({
    status: "active"
  });
  return subscription;
};

const retrieveCustomerFromStripeById = async (customerId: string) => {
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
};

const retrieveCustomerFromStripeByEmail = async (email: string) => {
  const customers = await stripe.customers.list({ email });
  return customers.data;
};

export const stripeRepository = {
  createStripeSession,
  createStripePortal,
  createCustomerInStripe,
  retrieveProductsFromStripe,
  retrieveCustomerFromStripeById,
  retrieveCustomerFromStripeByEmail,
  retrievePricesFromStripe,
  retrieveSubscriptionFromStripe
};
