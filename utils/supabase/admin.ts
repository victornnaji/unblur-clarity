import { Database } from "@/types";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { toDateTime } from "../helpers";

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

export const getCustomerByEmail = async (email: string) => {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("email", email)
    .maybeSingle();
  return { data, error };
};

export const createCustomer = async (userId: string, customerId: string) => {
  const { data, error } = await supabaseAdmin.from("customers").insert({
    id: userId,
    stripe_customer_id: customerId,
  });
  return { data, error };
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
    .from("credits")
    .upsert(
      {
        user_id: userId,
        credits,
      },
      { onConflict: "user_id" }
    )
    .select();
  return { data, error };
};

export const updateCustomerOneTimeCredits = async (
  userId: string,
  credits: number
) => {
  const { data, error } = await supabaseAdmin
    .from("one_time_credits")
    .upsert({ user_id: userId, credits });
  return { data, error };
};

export const removeCustomerCredits = async (userId: string) => {
  const { data, error } = await supabaseAdmin
    .from("credits")
    .update({ credits: 0 })
    .eq("user_id", userId);
  return { data, error };
};
