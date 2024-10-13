import React from "react";
import Image, { ImageProps } from "next/image";
import { clsx } from "@/utils/clsx";

const ImageContainer = ({
  src,
  alt,
  classNames,
  withGradient,
}: {
  src: ImageProps["src"];
  alt: string;
  classNames?: {
    container?: string;
    image?: string;
    gradient?: string;
  };
  withGradient?: boolean;
}) => {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        className={clsx("object-cover", classNames?.image)}
        sizes="(max-width: 1200px) 100%, 1200px"
      />
      {withGradient && (
        <div
          className={clsx(
            "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background opacity-100",
          classNames?.gradient
        )}
        ></div>
      )}
    </>
  );
};

export default ImageContainer;
