import React from "react";
import {
  CardFooter,
  CardHeader,
  Image,
  Card as PrimitiveCard
} from "@nextui-org/react";
import clsx from "clsx";

interface CardProps {
  header?: React.ReactNode | string;
  image: {
    src: string;
    alt: string;
  };
  footer?: React.ReactNode | string;
  classNames?: {
    header?: string;
    image?: string;
    footer?: string;
  };
}
const PreviewCard = ({ header, image, footer, classNames }: CardProps) => {
  return (
    <PrimitiveCard
      isFooterBlurred
      className="w-full h-[350px] col-span-12 sm:col-span-5"
      radius="none"
      isBlurred
    >
      <CardHeader
        className={clsx(
          "absolute z-10 top-1 flex-col items-end font-bold text-background",
          classNames?.header
        )}
      >
        {header}
      </CardHeader>
      <Image
        removeWrapper
        alt={image.alt}
        className={clsx(
          "z-0 w-full h-full scale-125 object-cover object-top",
          classNames?.image
        )}
        src={image.src}
      />
      <CardFooter
        className={clsx(
          "absolute bg-white/30 bottom-0 z-10 justify-between text-background",
          classNames?.footer
        )}
      >
        {footer}
      </CardFooter>
    </PrimitiveCard>
  );
};

export default PreviewCard;
