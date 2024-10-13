import { clsx } from "@/utils/clsx";
import React from "react";
import {
  CardFooter,
  CardHeader,
  Image,
  Card as PrimitiveCard
} from "@nextui-org/react";

const Card = ({
  header,
  children,
  footer,
  classNames
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  classNames?: { header: string; footer: string };
}) => {
  return (
    <PrimitiveCard
      isFooterBlurred
      className="w-full h-full"
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
      {children}
      {footer && (
        <CardFooter
          className={clsx(
            "absolute bg-white/30 bottom-0 z-10 justify-between text-background",
            classNames?.footer
          )}
        >
          {footer}
        </CardFooter>
      )}
    </PrimitiveCard>
  );
};

export default Card;
