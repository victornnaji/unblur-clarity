import { createStripePortal } from "@/utils/stripe/admin";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const url  = await createStripePortal('/unblur');
  redirect(url);
}
