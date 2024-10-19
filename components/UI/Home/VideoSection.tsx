import React from "react";
import Balancer from "react-wrap-balancer";
import CloudinaryVideoPlayer from "../CloudinaryVideoPlayer";
import CurvedArrow from "@/components/Icons/CurvedArrow";
import { HandwritingFont } from "@/styles/fonts";
import { clsx } from "@/utils/clsx";

const VideoSection = () => {
  return (
    <section className="bg-gray p-6 lg:pb-12">
      <div className="flex flex-col justify-center items-center gap-3 mb-8">
        <Balancer as="h4" className="heading">
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
      <div className="relative container lg:w-half-screen mx-auto">
        <CloudinaryVideoPlayer
          publicId="unblur-videos/unblur.photos-product-demo"
          posterPublicId="unblur-videos/Unblur_Photos_Product_Demo"
        />
        <div className="absolute hidden lg:block top-[-10%] right-[-10%] transform rotate-[170deg]">
          <div className="w-20">
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
  );
};

export default VideoSection;
