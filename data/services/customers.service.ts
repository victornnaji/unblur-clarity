"use server";

import { CustomError } from "@/errors/CustomError";

import {
  createCustomerInStripe,
  retrieveCustomerFromStripeByEmail,
  retrieveCustomerFromStripeById
} from "@/data/services/stripe.service";

import { createCustomersRepository } from "@/data/repositories/customers.repository";
import { createServiceRoleClient } from "@/utils/supabase/admin";

const supabaseAdmin = createServiceRoleClient();

export const getCustomerByIdByAdmin = async (id: string) => {
  const customersRepository = await createCustomersRepository();
  try {
    const { data, error } = await customersRepository.getCustomerById(
      supabaseAdmin,
      id
    );
    if (error) {
      console.error(error);
      throw new CustomError("Error fetching customer", 500, {
        cause: error.message || error.details
      });
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCustomerByCustomerIdByAdmin = async (customerId: string) => {
  const customersRepository = await createCustomersRepository();
  try {
    const { data, error } = await customersRepository.getCustomerByCustomerId(
      supabaseAdmin,
      customerId
    );
    if (error) {
      console.error(error);
      throw new CustomError("Error fetching customer", 500, {
        cause: error.message || error.details
      });
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCustomer = async (userId: string, customerId: string) => {
  const customersRepository = await createCustomersRepository();
  try {
    const { error } = await customersRepository.createCustomer(
      supabaseAdmin,
      userId,
      customerId
    );
    if (error) {
      console.error(error);
      throw new CustomError("Error creating customer", 500, {
        cause: error.message || error.details
      });
    }
    return customerId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCustomer = async (
  userId: string,
  stripeCustomerId: string
) => {
  const customersRepository = await createCustomersRepository();
  try {
    const { error } = await customersRepository.updateCustomer(
      supabaseAdmin,
      userId,
      stripeCustomerId
    );
    if (error) {
      console.error(error);
      throw new CustomError("Error updating customer", 500, {
        cause: error.message || error.details
      });
    }
    return stripeCustomerId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOrRetrieveCustomer = async ({
  userId,
  email
}: {
  userId: string;
  email: string;
}) => {
  try {
    const existingSupabaseCustomer = await getCustomerByIdByAdmin(userId);

    // Retrieve the Stripe customer ID using the Supabase customer ID, with email fallback
    let stripeCustomerId: string | undefined;
    if (existingSupabaseCustomer?.stripe_customer_id) {
      const existingStripeCustomer = await retrieveCustomerFromStripeById(
        existingSupabaseCustomer.stripe_customer_id
      );
      stripeCustomerId = existingStripeCustomer.id;
    } else {
      // If Stripe ID is missing from Supabase, try to retrieve Stripe customer ID by email
      const stripeCustomers = await retrieveCustomerFromStripeByEmail(email);
      stripeCustomerId =
        stripeCustomers.length > 0 ? stripeCustomers[0].id : undefined;
    }

    const stripeIdToInsert = stripeCustomerId
      ? stripeCustomerId
      : await createCustomerInStripe(userId, email);
    if (!stripeIdToInsert) throw new Error("Stripe customer creation failed.");

    if (existingSupabaseCustomer && stripeCustomerId) {
      // If Supabase has a record but doesn't match Stripe, update Supabase record
      if (existingSupabaseCustomer.stripe_customer_id !== stripeCustomerId) {
        await updateCustomer(userId, stripeCustomerId);
        console.warn(
          `Supabase customer record mismatched Stripe ID. Supabase record updated.`
        );
      }
      // If Supabase has a record and matches Stripe, return Stripe customer ID
      return stripeCustomerId;
    } else {
      console.warn(
        `Supabase customer record was missing. A new record was created.`
      );
      // If Supabase has no record, create a new record and return Stripe customer ID
      const upsertedStripeCustomer = await createCustomer(
        userId,
        stripeIdToInsert
      );

      if (!upsertedStripeCustomer)
        throw new Error("Supabase customer record creation failed.");

      return upsertedStripeCustomer;
    }
  } catch (error) {}
};
