import { HandwritingFont } from "@/styles/fonts";
import { clsx } from "@/utils/clsx";
import Image, { ImageProps } from "next/image";
import React from "react";

const ImageFrame = ({
  src,
  caption,
  alt
}: {
  src: ImageProps["src"];
  caption: string;
  alt: string;
}) => {
  return (
    <div className="w-full max-w-[380px] mx-auto bg-zink p-3 rounded-md shadow-md">
      <div className="relative aspect-square overflow-hidden rounded-sm">
        <Image
          src={src}
          alt={alt}
          loading="lazy"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 380px"
          className="object-cover"
        />
      </div>
      {caption && (
        <div
          className={clsx(
            HandwritingFont.className,
            "text-lg sm:text-xl lg:text-2xl mt-2 text-gray flex justify-center items-center"
          )}
        >
          {caption}
        </div>
      )}
    </div>
  );
};

export default ImageFrame;
