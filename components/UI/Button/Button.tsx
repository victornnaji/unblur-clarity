"use client";

import React from "react";
import styles from "./Button.module.css";
import LoadingDots from "@/components/UI/LoadingDots";
import Link from "next/link";
import {
  Button as PrimitiveButton,
  ButtonProps as BaseButtonProps
} from "@nextui-org/react";
import { type Icon } from "react-feather";
import { clsx } from "@/utils/clsx";

interface ButtonProps extends BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  plain?: boolean;
  isLoading?: boolean;
  withFancyGradient?: boolean;
}
export const Button = ({
  className,
  href,
  plain,
  isLoading,
  ...props
}: ButtonProps) => {
  const rootClassName = clsx(
    styles.root,
    { [styles.plain]: plain },
    { [styles.disabled]: props.isDisabled },
    {
      [styles.fancyGradient]:
        props.withFancyGradient && !props.isDisabled && !plain
    },
    plain ? "" : "bg-gradient",
    className
  );

  return (
    <PrimitiveButton
      as={href ? Link : "button"}
      size="lg"
      radius={props.radius || "sm"}
      variant={props.variant}
      className={rootClassName}
      href={href}
      isLoading={isLoading}
      spinnerPlacement="end"
      spinner={
        <i className="flex m-0">
          <LoadingDots />
        </i>
      }
      {...props}
    >
      {props.children}
    </PrimitiveButton>
  );
};

Button.displayName = "Button";

interface IconButtonProps extends BaseButtonProps {
  Icon: Icon;
  onClick: () => void;
  className?: string;
}
export const IconButton = ({
  Icon,
  onClick,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <PrimitiveButton
      as={"div"}
      isIconOnly
      size="sm"
      variant="flat"
      className={clsx(
        "cursor-pointer flex text-background items-center border-none justify-center ",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <Icon size={20} className="hover:scale-110 transition-all" />
    </PrimitiveButton>
  );
};

export default Button;
