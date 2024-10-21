"use server";

import { SupabaseClient } from "@supabase/supabase-js";

class CustomersRepository {
  async getCustomerById(supabase: SupabaseClient, userId: string) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    return { data, error };
  }

  async getCustomerByCustomerId(
    supabase: SupabaseClient,
    customerId: string
  ) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();

    return { data, error };
  }

  async createCustomer(supabase: SupabaseClient, userId: string, customerId: string) {
    const { error } = await supabase.from("customers").upsert({
      id: userId,
      stripe_customer_id: customerId
    });

    return { error };
  }

  async updateCustomer(supabase: SupabaseClient, userId: string, stripeCustomerId: string) {
    const { error } = await supabase
      .from("customers")
      .update({ stripe_customer_id: stripeCustomerId })
      .eq("id", userId);

    return { error };
  }
}

export async function createCustomersRepository() {
  return new CustomersRepository();
}
