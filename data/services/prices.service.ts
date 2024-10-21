"use server";

import { CustomError } from "@/errors/CustomError";
import { PriceDto } from "@/types/dtos";
import type Stripe from "stripe";
import { createPricesRepository } from "@/data/repositories/prices.repository";
import { createServiceRoleClient } from "@/utils/supabase/admin";

const supabaseAdmin = createServiceRoleClient();

export const upsertPrice = async (
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
    metadata: null
  };

  const pricesRepository = await createPricesRepository();

  try {
    const { error } = await pricesRepository.upsertPrice(
      supabaseAdmin,
      priceData
    );
    if (error) {
      if (error.message.includes("foreign key constraint")) {
        if (retryCount < maxRetries) {
          console.log(
            `Retry attempt ${retryCount + 1} for price ID: ${price.id}`
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
          await upsertPrice(price, retryCount + 1, maxRetries);
        } else {
          throw new CustomError(
            `Price insert/update failed after ${maxRetries} retries: ${error.message}`,
            500,
            {
              cause: error.message || error.details,
              context: {
                priceId: price.id
              }
            }
          );
        }
      }
      throw new CustomError("Error upserting price", 500, {
        cause: error.message || error.details,
        context: {
          priceId: price.id
        }
      });
    }
    console.log(`Price inserted/updated: ${price.id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePrice = async (priceId: string) => {
  const pricesRepository = await createPricesRepository();
  try {
    const { error } = await pricesRepository.deletePrice(
      supabaseAdmin,
      priceId
    );
    if (error) {
      throw new CustomError("Error deleting price", 500, {
        cause: error.message || error.details
      });
    }
    console.log(`Price deleted: ${priceId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
