import { Spacer } from "@nextui-org/react";

import { productsFaq } from "@/config";

import { getProducts, getUserHasSubscription } from "@/utils/supabase/actions";

import PricingTable from "@/components/UI/Stripe/PricingTable";
import InteractiveSliders from "@/components/UI/Home/InteractiveSliders";
import Testimonials from "@/components/UI/Home/Testimonials";
import Hero from "@/components/UI/Home/Hero";
import VideoSection from "@/components/UI/Home/VideoSection";
import FAQ from "@/components/UI/FAQ";
import Features from "@/components/UI/Home/Features";

export default async function Index() {
  const [products, hasSubscription] = await Promise.all([
    getProducts(),
    getUserHasSubscription()
  ]);

  return (
    <div className="w-full grid lg:gap-32 gap-24 grid-cols-1">
      <Hero />
      <Features />
      <InteractiveSliders />
      <VideoSection />
      <Testimonials />
      <PricingTable products={products} hasSubscription={hasSubscription} />
      <FAQ contents={productsFaq} />
      <Spacer y={12} />
    </div>
  );
}
