import Stripe from "stripe";
import { Database } from "@/types";
import { createClient } from "@supabase/supabase-js";
import { toDateTime } from "../helpers";
import { PredictionDto } from "@/types/dtos";
import { randomUUID } from "crypto";

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
      detectSessionInUrl: false
    }
  });

const supabaseAdmin = createServiceRoleClient();

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
      product_id: subscription.items.data[0].price.product as string
    },
    { onConflict: "id" }
  );
  if (error) {
    throw new Error("Updating subscription failed");
  }
  return data;
};

export const uploadImageToSupabase = async (imageUrl: string) => {
  try {
    const fileName = `${randomUUID()}-unblurred.png`;
    const uploadResult = await supabaseAdmin.storage
      .from("unblurred-photos")
      .upload(fileName, imageUrl, {
        cacheControl: "3600",
        contentType: "image/png"
      });

    if (uploadResult.error) {
      throw uploadResult.error;
    }

    const { data } = supabaseAdmin.storage
      .from("unblurred-photos")
      .getPublicUrl(fileName);

    return { url: data.publicUrl };
  } catch (error) {
    console.error("Error uploading image to Supabase:", error);
    throw new Error("Failed to upload image");
  }
};

export const updatePrediction = async (
  prediction: Partial<PredictionDto>
): Promise<{ id: string }> => {
  if (!prediction.id) {
    throw new Error("Prediction ID is required for update");
  }

  const { data, error: updateError } = await supabaseAdmin
    .from("predictions")
    .update(prediction)
    .eq("id", prediction.id)
    .select()
    .single();

  if (updateError) {
    console.error("Update error:", updateError);
    throw new Error(`Error updating prediction: ${updateError.message}`);
  }

  if (!data) {
    throw new Error("No data returned after updating prediction");
  }

  return { id: data.id };
};
