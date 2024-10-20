import { createServiceRoleClient } from "@/utils/supabase/admin";

const getCustomerByIdByAdmin = async (userId: string) => {
  const supabaseAdmin = createServiceRoleClient();

  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  return { data, error };
};

const getCustomerByCustomerIdByAdmin = async (customerId: string) => {
  const supabaseAdmin = createServiceRoleClient();

  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  return { data, error };
};

const createCustomer = async (userId: string, customerId: string) => {
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

const updateCustomer = async (userId: string, stripeCustomerId: string) => {
  const supabaseAdmin = createServiceRoleClient();

  const { error } = await supabaseAdmin
    .from("customers")
    .update({ stripe_customer_id: stripeCustomerId })
    .eq("id", userId);

  return { error };
};

export const customerRepository = {
  getCustomerByIdByAdmin,
  createCustomer,
  updateCustomer,
  getCustomerByCustomerIdByAdmin
};
