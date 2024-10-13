import BlurryParrot from "@/assets/1-before.png";
import ClearParrot from "@/assets/1-after.png";
import { clsx } from "@/utils/clsx";
import ImageContainer from "@/components/UI/Home/ImageContainer";
import CurvedArrow from "@/components/Icons/CurvedArrow";
import Button from "@/components/UI/Button";
import { links } from "@/config";
import Features from "@/components/UI/Home/Features";
import { Spacer } from "@nextui-org/react";
import { HandwritingFont } from "@/styles/fonts";
import Balancer from "react-wrap-balancer";
import PricingTable from "@/components/UI/Stripe/PricingTable";
import FAQ from "@/components/UI/FAQ";
import { productsFaq } from "@/config";
import { getProducts, getUserHasSubscription } from "@/utils/supabase/actions";
import CloudinaryVideoPlayer from "@/components/UI/CloudinaryVideoPlayer";
import InteractiveSliderContainer from "@/components/UI/Home/InteractiveSliderContainer";
import Testimonials from "@/components/UI/Home/Testimonials";

export default async function Index() {
  const [products, hasSubscription] = await Promise.all([
    getProducts(),
    getUserHasSubscription()
  ]);

  return (
    <div className="w-full grid lg:gap-32 gap-24 grid-cols-1">
      <section className="hero grid grid-cols-1 mt-6 gap-10">
        <div className="hero-text h-full flex flex-col justify-center w-full place-items-center w-full gap-2">
          <Balancer
            ratio={1.0}
            as="h1"
            className="text-5xl lg:text-7xl font-bold flex flex-col flex-wrap gap-2 text-center"
          >
            Bring your <span className="inline text-purple">old, </span>
            and <span className="inline text-purple">blurry</span> photos back
            to life with <span className="inline text-purple">AI</span>.
          </Balancer>

          <Balancer
            as="h2"
            className="text-xl mt-3 text-center lg:w-2/3 w-full mx-auto"
          >
            Restore blurry faces, enhance the quality of an old image, or even
            sharpen blurry texts. Our AI models can handle it all.
          </Balancer>

          <div className="mt-5 w-[300px]">
            <Button
              className="p-8 text-xl w-full"
              href={links.studio.path}
              withFancyGradient
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className="grid w-full md:w-4/6 mx-auto place-items-center h-full">
          <div className="hero-image grid grid-cols-2 lg:gap-4 gap-2 size-full">
            <div className="relative w-full lg:h-[600px] h-[50vh]">
              <ImageContainer
                src={ClearParrot}
                alt="Clear Parrot"
                withGradient
              />
              <div className="absolute hidden lg:block top-4 left-[-20%] transform rotate-12">
                <div className="w-[5.5rem]">
                  <CurvedArrow />
                  <p className={clsx(HandwritingFont.className, "text-2xl")}>
                    Enhanced by Unblur Photos 🔥
                  </p>
                </div>
              </div>
            </div>
            <div className="relative w-full lg:h-[600px] h-[50vh]">
              <ImageContainer
                src={BlurryParrot}
                alt="Blurry Parrot"
                withGradient
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <Features />
      </section>

      <section>
        <InteractiveSliderContainer />
      </section>

      <section className="bg-gray p-6 lg:pb-12">
        <div className="flex flex-col justify-center items-center gap-3 mb-8">
          <Balancer
            as="h4"
            className="lg:text-4xl text-3xl font-bold text-center w-full"
          >
            Restoring & enhancing your photos is that easy.
          </Balancer>
          <div className="text-base lg:text-lg flex flex-col">
            <span className="flex flex-col lg:flex-row lg:gap-4">
              <span className="before:content-['🔥'] before:mr-2">
                Upload your photo
              </span>
              <span className="before:content-['🔥'] before:mr-2">
                Select the type of restoration you want
              </span>
            </span>
            <span className="flex flex-col lg:flex-row lg:gap-4">
              <span className="before:content-['🔥'] before:mr-2">
                Start the restoration
              </span>
              <span className="before:content-['🔥'] before:mr-2">
                Download your enhanced photo
              </span>
            </span>
          </div>
        </div>
        <div className="relative w-full container w-full lg:w-[50vw] mx-auto">
          <CloudinaryVideoPlayer
            publicId="unblur-videos/unblur.photos-product-demo"
            posterPublicId="unblur-videos/Unblur_Photos_Product_Demo"
          />
          <div className="absolute hidden lg:block top-[-10%] right-[-10%] transform rotate-[170deg]">
            <div className="w-[4.5rem]">
              <CurvedArrow />
              <p
                className={clsx(
                  HandwritingFont.className,
                  "text-2xl rotate-180 -mt-6"
                )}
              >
                Check it out
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Testimonials />

        <div className="mt-10 w-[300px] mx-auto">
          <Button
            className="p-8 text-xl w-full"
            href={links.studio.path}
            withFancyGradient
          >
            Start restoring your photos
          </Button>
        </div>
      </section>

      <section>
        <PricingTable products={products} hasSubscription={hasSubscription} />
      </section>

      <section>
        <FAQ contents={productsFaq} />
      </section>

      <Spacer y={12} />
    </div>
  );
}
