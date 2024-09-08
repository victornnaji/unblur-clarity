import { Database } from "@/types";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { toDateTime } from "../helpers";
import { PriceDto, ProductDto } from "@/types/dtos";
import { stripe } from "../stripe/config";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase environment variables");
}

export const createServiceRoleClient = () =>
  createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

const supabaseAdmin = createServiceRoleClient();

export const getCustomer = async (customerId: string) => {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return { data, error };
};

export const createCustomer = async (userId: string, customerId: string) => {
  const { data, error: upsertError } = await supabaseAdmin
    .from("customers")
    .upsert(
      {
        id: userId,
        stripe_customer_id: customerId,
      },
      { onConflict: "id,stripe_customer_id" }
    );

  if (upsertError)
    throw new Error(
      `Supabase customer record creation failed: ${upsertError.message}`
    );

  return customerId;
};

export const createCustomerInStripe = async (userId: string, email: string) => {
  const customerData = { metadata: { userId }, email: email };
  const newCustomer = await stripe.customers.create(customerData);
  if (!newCustomer) throw new Error("Stripe customer creation failed.");

  return newCustomer.id;
};

export const createOrRetrieveCustomer = async ({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) => {
  // Check if the customer already exists in Supabase
  const { data: existingSupabaseCustomer, error: queryError } =
    await supabaseAdmin
      .from("customers")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

  if (queryError) {
    throw new Error(`Supabase customer lookup failed: ${queryError.message}`);
  }

  // Retrieve the Stripe customer ID using the Supabase customer ID, with email fallback
  let stripeCustomerId: string | undefined;
  if (existingSupabaseCustomer?.stripe_customer_id) {
    const existingStripeCustomer = await stripe.customers.retrieve(
      existingSupabaseCustomer.stripe_customer_id
    );
    stripeCustomerId = existingStripeCustomer.id;
  } else {
    // If Stripe ID is missing from Supabase, try to retrieve Stripe customer ID by email
    const stripeCustomers = await stripe.customers.list({ email: email });
    stripeCustomerId =
      stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : undefined;
  }

  const stripeIdToInsert = stripeCustomerId
    ? stripeCustomerId
    : await createCustomerInStripe(userId, email);
  if (!stripeIdToInsert) throw new Error("Stripe customer creation failed.");

  if (existingSupabaseCustomer && stripeCustomerId) {
    // If Supabase has a record but doesn't match Stripe, update Supabase record
    if (existingSupabaseCustomer.stripe_customer_id !== stripeCustomerId) {
      const { error: updateError } = await supabaseAdmin
        .from("customers")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("id", userId);

      if (updateError)
        throw new Error(
          `Supabase customer record update failed: ${updateError.message}`
        );
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
};

export const deleteProductRecord = async (product: Stripe.Product) => {
  const { error: deletionError } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", product.id);
  if (deletionError)
    throw new Error(`Product deletion failed: ${deletionError.message}`);
  console.log(`Product deleted: ${product.id}`);
};

export const deletePriceRecord = async (price: Stripe.Price) => {
  const { error: deletionError } = await supabaseAdmin
    .from("prices")
    .delete()
    .eq("id", price.id);
  if (deletionError)
    throw new Error(`Price deletion failed: ${deletionError.message}`);
  console.log(`Price deleted: ${price.id}`);
};

export const upsertPriceRecord = async (
  price: Stripe.Price,
  retryCount = 0,
  maxRetries = 3
) => {
  const priceData: PriceDto = {
    id: price.id,
    product_id: typeof price.product === "string" ? price.product : "",
    active: price.active,
    currency: price.currency,
    type: price.type,
    unit_amount: price.unit_amount ?? null,
    interval: (price.recurring?.interval as "month" | "year" | null) ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    trial_period_days: price.recurring?.trial_period_days ?? 0,
    description: null,
    metadata: null,
  };

  const { error: upsertError } = await supabaseAdmin
    .from("prices")
    .upsert([priceData]);

  if (upsertError?.message.includes("foreign key constraint")) {
    if (retryCount < maxRetries) {
      console.log(`Retry attempt ${retryCount + 1} for price ID: ${price.id}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await upsertPriceRecord(price, retryCount + 1, maxRetries);
    } else {
      throw new Error(
        `Price insert/update failed after ${maxRetries} retries: ${upsertError.message}`
      );
    }
  } else if (upsertError) {
    throw new Error(`Price insert/update failed: ${upsertError.message}`);
  } else {
    console.log(`Price inserted/updated: ${price.id}`);
  }
};

export const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: ProductDto = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: {
      marketing_features: JSON.stringify(product.marketing_features),
    },
  };

  const { error: upsertError } = await supabaseAdmin
    .from("products")
    .upsert([productData]);
  if (upsertError)
    throw new Error(`Product insert/update failed: ${upsertError.message}`);
  console.log(`Product inserted/updated: ${product.id}`);
};

export const upsertSubscription = async (
  subscription: Stripe.Subscription,
  userId: string
) => {
  const { data, error } = await supabaseAdmin.from("subscriptions").upsert(
    {
      cancel_at: subscription.cancel_at
        ? toDateTime(subscription.cancel_at).toISOString()
        : null,
      cancel_at_period_end: subscription.cancel_at_period_end,
      canceled_at: subscription.canceled_at
        ? toDateTime(subscription.canceled_at).toISOString()
        : null,
      created: toDateTime(subscription.created).toISOString(),
      current_period_end: toDateTime(
        subscription.current_period_end
      ).toISOString(),
      current_period_start: toDateTime(
        subscription.current_period_start
      ).toISOString(),
      ended_at: subscription.ended_at
        ? toDateTime(subscription.ended_at).toISOString()
        : null,
      metadata: subscription.metadata,
      status: subscription.status,
      user_id: userId,
      id: subscription.id,
    },
    { onConflict: "id" }
  );
  return { data, error };
};

export const updateCustomerCredits = async (
  userId: string,
  credits: number
) => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .update({
      credits,
    })
    .eq("id", userId);
  return { data, error };
};

export const removeCustomerCredits = async (userId: string) => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .update({ credits: 0 })
    .eq("id", userId);
  return { data, error };
};

export const updateCustomerOneTimeCredits = async (
  userId: string,
  creditsToAdd: number
) => {
  const { data: currentData, error: fetchError } = await supabaseAdmin
    .from("users")
    .select("one_time_credits")
    .eq("id", userId)
    .single();

  if (fetchError) {
    return { data: null, error: fetchError };
  }

  const currentCredits = currentData?.one_time_credits || 0;
  const newTotalCredits = currentCredits + creditsToAdd;

  const { error: updateError } = await supabaseAdmin
    .from("users")
    .update({ one_time_credits: newTotalCredits })
    .eq("id", userId);

  if (updateError) {
    return { data: null, error: updateError };
  }

  return { data: newTotalCredits, error: null };
};

export const getUserCredits = async (userId: string) => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("credits, one_time_credits")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching credits:", error);
    throw new Error("Failed to fetch credits");
  }

  const totalCredits = (data?.credits || 0) + (data?.one_time_credits || 0);

  return { data: totalCredits, error };
};

export const withdrawCredits = async (userId: string, creditsToWithdraw: number) => {
  // Fetch current credits and one-time credits
  const { data, error: fetchError } = await supabaseAdmin
    .from("users")
    .select("credits, one_time_credits")
    .eq("id", userId)
    .single();

  if (fetchError) {
    return { data: null, error: fetchError };
  }

  const currentCredits = data?.credits || 0;
  const currentOneTimeCredits = data?.one_time_credits || 0;
  const totalAvailableCredits = currentCredits + currentOneTimeCredits;

  // Check if user has enough total credits
  if (totalAvailableCredits < creditsToWithdraw) {
    return { data: null, error: new Error("Insufficient credits") };
  }

  // Calculate how many credits to withdraw from each column
  const creditsToWithdrawFromCredits = Math.min(currentCredits, creditsToWithdraw);
  const creditsToWithdrawFromOneTime = creditsToWithdraw - creditsToWithdrawFromCredits;

  // Update the credits
  const newCredits = currentCredits - creditsToWithdrawFromCredits;
  const newOneTimeCredits = currentOneTimeCredits - creditsToWithdrawFromOneTime;

  // Update the database
  const { error: updateError } = await supabaseAdmin
    .from("users")
    .update({ 
      credits: newCredits, 
      one_time_credits: newOneTimeCredits 
    })
    .eq("id", userId);

  if (updateError) {
    return { data: null, error: updateError };
  }

  return { 
    data: { 
      remainingCredits: newCredits, 
      remainingOneTimeCredits: newOneTimeCredits 
    }, 
    error: null 
  };
};
