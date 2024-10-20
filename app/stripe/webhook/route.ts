import { headers } from "next/headers";
import Stripe from "stripe";
import invariant from "tiny-invariant";
import { NextResponse } from "next/server";
import {
  handleCompletedCheckout,
  handlePriceRecordDeletion,
  handlePriceRecordUpdate,
  handleProductRecordDeletion,
  handleProductRecordUpdate,
  handleSubscription,
  handleSubscriptionDeletion,
  handleSubscriptionUpdate
} from "@/utils/stripe/server";
import { stripe } from "@/utils/stripe/config";

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

invariant(stripeWebhookSecret, "process.env.STRIPE_WEBHOOK_SECRET is required");
invariant(supabaseServiceRoleKey, "SUPABASE_SERVICE_ROLE_KEY is required");

export async function POST(request: Request) {
  const headersObj = headers();
  const sig = headersObj.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      {
        message: `Missing signature`
      },
      { status: 400 }
    );
  }

  if (!request.body) {
    return NextResponse.json(
      {
        message: `Missing body`
      },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      sig,
      stripeWebhookSecret!
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: `Webhook signature verification failed`
      },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "product.created":
      case "product.updated":
        await handleProductRecordUpdate(event.data.object as Stripe.Product);
        break;
      case "price.created":
      case "price.updated":
        await handlePriceRecordUpdate(event.data.object as Stripe.Price);
        break;
      case "price.deleted":
        await handlePriceRecordDeletion(event.data.object as Stripe.Price);
        break;
      case "product.deleted":
        await handleProductRecordDeletion(event.data.object as Stripe.Product);
        break;
      case "customer.subscription.created":
        await handleSubscription(event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(
          event as Stripe.CustomerSubscriptionUpdatedEvent
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeletion(
          event.data.object as Stripe.Subscription
        );
        break;
      case "checkout.session.completed":
        await handleCompletedCheckout(
          event.data.object as Stripe.Checkout.Session
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Webhook failed`
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: `Webhook received`
  });
}
