import { headers } from "next/headers";
import Stripe from "stripe";
import invariant from "tiny-invariant";
import { NextResponse } from "next/server";
import {
  handleCredits,
  handleCustomer,
  handleOneTimeCredit,
  handleSubscription,
  handleSubscriptionDeletion,
} from "@/utils/stripe/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

invariant(stripeSecretKey, "STRIPE_SECRET_KEY is required");
invariant(stripeWebhookSecret, "process.env.STRIPE_WEBHOOK_SECRET is required");
invariant(supabaseServiceRoleKey, "SUPABASE_SERVICE_ROLE_KEY is required");

export async function POST(request: Request) {
  const headersObj = headers();
  const sig = headersObj.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      {
        message: `Missing signature`,
      },
      { status: 400 }
    );
  }

  if (!request.body) {
    return NextResponse.json(
      {
        message: `Missing body`,
      },
      { status: 400 }
    );
  }
  const stripe = new Stripe(stripeSecretKey!, {
    typescript: true,
  });

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
        message: `Webhook signature verification failed`,
      },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
    //   case "checkout.session.completed": {
    //     const session = event.data.object as Stripe.Checkout.Session;
    //     const userId = session.client_reference_id;
    //     const customerId = session.customer as string;

    //     if (!userId) {
    //       return NextResponse.json(
    //         {
    //           message: `Missing user ID`,
    //         },
    //         { status: 400 }
    //       );
    //     }
    //     await handleCustomer(customerId, userId);
    //     break;
    //   }
      case "customer.created": {
        const customer = event.data.object as Stripe.Customer;
        await handleCustomer(customer);
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscription(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeletion(subscription);
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleCredits(invoice);
        break;
      }
      case "payment_intent.succeeded": {
        const payment = event.data.object as Stripe.PaymentIntent;
        await handleOneTimeCredit(payment);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Webhook failed`,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: `Webhook received`,
  });
}
