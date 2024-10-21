"use server";

import type Stripe from "stripe";
import { SubscriptionDto } from "@/types/dtos";
import { toDateTime } from "@/utils/helpers";
import { CustomError } from "@/errors/CustomError";
import { getAuthUserOrNull } from "./auth.service";
import { cache } from "react";
import { createSubscriptionRepository } from "@/data/repositories/subscription.repository";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export const upsertSubscriptionByAdmin = async (
  subscription: Stripe.Subscription,
  userId: string
) => {
  const supabaseAdmin = createServiceRoleClient();
  const subscriptionRepository = await createSubscriptionRepository();

  const subscriptionData: SubscriptionDto = {
    metadata: subscription.metadata,
    status: subscription.status,
    user_id: userId,
    id: subscription.id,
    product_id: subscription.items.data[0].price.product as string,
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
      : null
  };

  try {
    const { data, error } =
      await subscriptionRepository.upsertSubscription(
        supabaseAdmin,
        subscriptionData
      );

    if (error) {
      console.error(error);
      throw new CustomError("Updating subscription failed", 500, {
        cause: error.message || error.details
      });
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSubscriptionByUserId = async (userId: string) => {
  const supabase = createClient();
  const subscriptionRepository = await createSubscriptionRepository();
  try {
    const { data, error } =
      await subscriptionRepository.getSubscriptionByUserId(supabase, userId);

    if (error) {
      console.error(error);
      throw new CustomError("Error fetching subscription", 500, {
        cause: error.message || error.details
      });
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSubscription = cache(async () => {
  createClient();
  try {
    const user = await getAuthUserOrNull();
    if (!user) return null;
    const subscription = await getSubscriptionByUserId(user.id);
    return subscription;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const checkSubscriptionStatus = cache(async () => {
  const subscription = await getSubscription();
  return !!subscription;
});
