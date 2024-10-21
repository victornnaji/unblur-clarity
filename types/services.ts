import type Stripe from "stripe";

export interface UserUpdate {
  email?: string;
  full_name?: string;
}

export interface UpdateCreditsPayload {
  credits?: number;
  oneTimeCredits?: number;
}
