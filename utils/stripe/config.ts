import invariant from "tiny-invariant";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

invariant(stripeSecretKey, "STRIPE_SECRET_KEY is required");
export const stripe = require("stripe")(stripeSecretKey);