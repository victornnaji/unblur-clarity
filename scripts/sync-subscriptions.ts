import { syncStripeSubscription } from "@/utils/stripe/admin";

const main = async () => {
  try {
    await syncStripeSubscription();
    console.log("Stripe subscription sync completed successfully");
  } catch (error) {
    console.error("Error during Stripe subscription sync:", error);
    process.exit(1);
  }
};

main();