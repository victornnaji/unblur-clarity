import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51I0J8ABb8uOnuhOR9b1xuavSpYcbzZ5TvJXflkTVZ8Fy7FFBWldW5OvpPdt93vXLRKOoxZGIiMRyYCCqrXtp7huu00VB6p31Zd"
    );
  }

  return stripePromise;
};
