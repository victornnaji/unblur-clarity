import React from "react";
import PhotoCompare from "@/components/UI/PhotoCompare";
import BlurryGirl from "@/assets/2-before.png";
import ClearGirl from "@/assets/2-after.png";
import BlurryText from "@/assets/3-before.png";
import ClearText from "@/assets/3-after.png";
import BlurryParrot from "@/assets/1-before.png";
import ClearParrot from "@/assets/1-after.png";
import ContentBlock from "@/components/UI/Home/ContentBlock";
import { clsx } from "@/utils/clsx";
import Balancer from "react-wrap-balancer";

const interactiveSliderItems = [
  {
    id: 1,
    title: "Image Upscaling",
    description:
      "Using Clarity AI's powerful model, you can upscale your images to improve their quality. This enhancement is suitable for photos of outside, landscape, designs and many more",
    leftImage: BlurryParrot.src,
    rightImage: ClearParrot.src
  },
  {
    id: 2,
    title: "Face Restoration",
    description:
      "Our Face Restoration feature works wonders, smoothing out blemishes and bringing faces back to life. It’s perfect for reviving those special moments. Suitable for portraits, and photos of people.",
    leftImage: BlurryGirl.src,
    rightImage: ClearGirl.src
  },
  // {
  //   id: 3,
  //   title: "Text Sharpening",
  //   description:
  //     "Don’t let blurry text ruin important documents or old photos! Our Text Sharpening tool helps you restore clarity, making sure everything is legible again.",
  //   // link: {
  //   //   text: "Learn more about Text Sharpening in our knowledge base",
  //   //   href: "/unblur-styles"
  //   // },
  //   leftImage: BlurryText.src,
  //   rightImage: ClearText.src
  // },
  // {
  //   id: 4,
  //   title: "General Image Restoration",
  //   description:
  //     "Whether it’s nature shots, objects, or other non-human images, our General Image Restoration tool can help. It’s great for bringing back the details you thought were lost!",
  //   // link: {
  //   //   text: "Learn more about Image Restoration in our knowledge base",
  //   //   href: "/unblur-styles"
  //   // },
  //   leftImage: BlurryText.src,
  //   rightImage: ClearText.src
  // }
];

const InteractiveSliders = () => {
  return (
    <section>
      <h3 className="heading text-purple">
        <Balancer>Various ways to enhance or restore your photos</Balancer>
      </h3>
      {interactiveSliderItems.map((item, index) => (
        <div
          key={item.id}
          className={clsx(
            "flex flex-col lg:flex-row gap-4 text-center mt-10 xl:h-[800px] lg:h-[600px] lg:p-6",
            index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
          )}
        >
          <div className="w-full lg:w-1/3 flex flex-col justify-center ">
            <ContentBlock
              title={`${item.id}. ${item.title}`}
              description={item.description}
              // link={item.link}
            />
          </div>
          <div className="w-full md:w-3/4 mx-auto lg:w-2/3">
            <PhotoCompare
              leftImage={item.leftImage}
              rightImage={item.rightImage}
              leftAlt={`Blurry ${item.title}`}
              rightAlt={`Clear ${item.title}`}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default InteractiveSliders;
