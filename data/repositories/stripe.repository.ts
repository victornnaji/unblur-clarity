"use server";

import type Stripe from "stripe";

class StripeRepository {
  async createStripeSession(
    stripe: Stripe,
    params: Stripe.Checkout.SessionCreateParams
  ) {
    const session = await stripe.checkout.sessions.create(params);
    return session;
  }

  async createStripePortal(
    stripe: Stripe,
    params: Stripe.BillingPortal.SessionCreateParams
  ) {
    const portal = await stripe.billingPortal.sessions.create(params);
    return portal;
  }

  async createCustomerInStripe(stripe: Stripe, userId: string, email: string) {
    const customerData = { metadata: { userId }, email: email };
    const newCustomer = await stripe.customers.create(customerData);
    return newCustomer;
  }

  async retrieveProductsFromStripe(stripe: Stripe) {
    const products = await stripe.products.list({ active: true });
    return products;
  }

  async retrievePricesFromStripe(stripe: Stripe) {
    const prices = await stripe.prices.list({ active: true });
    return prices;
  }

  async retrieveSubscriptionFromStripe(stripe: Stripe) {
    const subscription = await stripe.subscriptions.list({
      status: "active"
    });
    return subscription;
  }

  async retrieveCustomerFromStripeById(stripe: Stripe, customerId: string) {
    const customer = await stripe.customers.retrieve(customerId);
    return customer;
  }

  async retrieveCustomerFromStripeByEmail(stripe: Stripe, email: string) {
    const customers = await stripe.customers.list({ email });
    return customers.data;
  }
}

export async function createStripeRepository() {
  return new StripeRepository();
}
