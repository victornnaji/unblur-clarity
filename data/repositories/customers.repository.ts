"use server";

import { createServiceRoleClient } from "@/utils/supabase/admin";

export const getCustomerByIdByAdminRepository = async (userId: string) => {
  const supabaseAdmin = createServiceRoleClient();

  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  return { data, error };
};

export const getCustomerByCustomerIdByAdminRepository = async (customerId: string) => {
  const supabaseAdmin = createServiceRoleClient();

  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  return { data, error };
};

export const createCustomerRepository = async (userId: string, customerId: string) => {
  const supabaseAdmin = createServiceRoleClient();

  const { error } = await supabaseAdmin.from("customers").upsert(
    {
      id: userId,
      stripe_customer_id: customerId
    },
    { onConflict: "id,stripe_customer_id" }
  );

  return { error };
};

export const updateCustomerRepository = async (
  userId: string,
  stripeCustomerId: string
) => {
  const supabaseAdmin = createServiceRoleClient();

  const { error } = await supabaseAdmin
    .from("customers")
    .update({ stripe_customer_id: stripeCustomerId })
    .eq("id", userId);

  return { error };
};

