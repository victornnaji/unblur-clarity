import { syncStripeProductsAndPrices } from '@/utils/stripe/admin';

const main = async () => {
  try {
    await syncStripeProductsAndPrices();
    console.log("Stripe sync completed successfully");
  } catch (error) {
    console.error("Error during Stripe sync:", error);
    process.exit(1);
  }
};

main();
