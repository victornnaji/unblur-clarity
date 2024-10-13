"use client";

import React from "react";
import ImageFrame from "./ImageFrame";
import BlurryParrot from "@/assets/1-before.png";
import ClearParrot from "@/assets/1-after.png";
import BlurryGirl from "@/assets/2-before.png";
import ClearGirl from "@/assets/2-after.png";
import BlurryText from "@/assets/3-before.png";
import ClearText from "@/assets/3-after.png";

import { Tabs, Tab } from "@nextui-org/react";

const features = [
  {
    id: "Image Upscaling",
    content: [
      {
        src: BlurryParrot,
        alt: "Blurry Parrot",
        caption: "Old Photo"
      },
      {
        src: ClearParrot,
        alt: "Clear Parrot",
        caption: "Enhanced Photo"
      }
    ]
  },
  {
    id: "Face Restoration",
    content: [
      {
        src: BlurryGirl,
        alt: "Blurry Girl",
        caption: "Old Photo"
      },
      {
        src: ClearGirl,
        alt: "Clear Girl",
        caption: "Sharpened Face Photo"
      }
    ]
  },
  {
    id: "Text Sharpening",
    content: [
      {
        src: BlurryText,
        alt: "Blurry Text",
        caption: "Blurry Text"
      },
      {
        src: ClearText,
        alt: "Clear Text",
        caption: "Sharpened Text"
      }
    ]
  }
];

const Features = () => {
  return (
    <div className="w-full">
      <div className="text-center text-4xl font-bold">Features</div>
      <Tabs
        aria-label="Unblur Features"
        items={features}
        placement="end"
        variant="light"
        classNames={{
          wrapper:
            "w-full mt-10 md:mt-20 flex-col xl:flex-row-reverse items-center gap-10 xl:gap-6",
          panel: "w-full relative top-4 lg:top-0",
          base: "w-full items-center justify-center",
          tabList: "w-full md:w-96 border-2",
          tab: "w-full h-16 lg:h-20 text-zink font-bold border-2",
          cursor: "w-full bg-zink"
        }}
      >
        {(item) => (
          <Tab key={item.id} title={item.id}>
            <div className="relative min-h-[500px]">
              <div className="relative md:absolute w-full h-full md:left-[20%]  z-10 rotate-6 lg:rotate-12">
                <ImageFrame
                  src={item.content[1].src}
                  alt={item.content[1].alt}
                  caption={item.content[1].caption}
                />
              </div>
              <div className="relative md:absolute w-full h-full md:right-[20%] top-[5%] rotate-[-6deg] xl:rotate-[-10deg]">
                <ImageFrame
                  src={item.content[0].src}
                  alt={item.content[0].alt}
                  caption={item.content[0].caption}
                />
              </div>
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default Features;
