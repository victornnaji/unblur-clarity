import CurvedArrow from "@/components/Icons/CurvedArrow";
import { links } from "@/config";
import { HandwritingFont } from "@/styles/fonts";
import clsx from "clsx";
import React from "react";
import Balancer from "react-wrap-balancer";
import ImageContainer from "./ImageContainer";
import Button from "@/components/UI/Button";
import BlurryParrot from "@/assets/1-before.png";
import ClearParrot from "@/assets/1-after.png";

const Hero = () => {
  return (
    <section className="grid grid-cols-1 mt-6 gap-10">
      <div className="hero-text h-full flex flex-col justify-center w-full place-items-center w-full gap-2">
        <Balancer
          ratio={1.0}
          as="h1"
          className="text-5xl lg:text-7xl font-bold flex flex-col flex-wrap gap-2 text-center"
        >
          Bring your <span className="inline text-purple">old </span>
          and <span className="inline text-purple">blurry</span> photos back to
          life with <span className="inline text-purple">AI</span>.
        </Balancer>

        <Balancer
          as="h2"
          className="text-xl mt-3 text-center lg:w-2/3 w-full mx-auto"
        >
          Restore blurry faces, enhance the quality of an old image, or even
          sharpen blurry texts. Our AI models can handle it all.
        </Balancer>

        <div className="mt-5 w-full sm:w-80">
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
          <div className="relative w-full lg:h-[600px] h-half-screen">
            <ImageContainer src={ClearParrot} alt="Clear Parrot" withGradient />
            <div className="absolute hidden lg:block top-4 left-[-20%] transform rotate-12">
              <div className="w-20">
                <CurvedArrow />
                <p className={clsx(HandwritingFont.className, "text-2xl")}>
                  Enhanced by Unblur Photos 🔥
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:h-[600px] h-half-screen">
            <ImageContainer
              src={BlurryParrot}
              alt="Blurry Parrot"
              withGradient
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
