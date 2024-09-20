"use client";

import React, { forwardRef } from "react";

import styles from "./Button.module.css";
import clsx from "clsx";
import LoadingDots from "@/components/UI/LoadingDots";
import Link from "next/link";
import {
  Button as PrimitiveButton,
  useButton,
  ButtonProps as BaseButtonProps,
} from "@nextui-org/react";
import { Icon } from "react-feather";

interface Props extends BaseButtonProps {
  Component?: React.ComponentType;
  active?: boolean;
}

const BaseButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    domRef,
    children,
    spinner = (
      <i className="flex pr-2 m-0">
        <LoadingDots />
      </i>
    ),
    startContent,
    endContent,
    isLoading,
    getButtonProps,
    Component = "button",
  } = useButton({
    ref,
    ...props,
  });

  const rootClassName = clsx(
    styles.root,
    { [styles.disabled]: props.isDisabled },
    props.className
  );

  return (
    <Component
      aria-pressed={props.active}
      ref={domRef}
      className={rootClassName}
      disabled={props.isDisabled}
      {...getButtonProps()}
    >
      {startContent}
      {isLoading && spinner}
      {children}
      {endContent}
    </Component>
  );
});

interface ButtonProps extends Omit<Props, "ref"> {
  href?: string;
  onClick?: () => void;
}

const Button = ({ href, ...rest }: ButtonProps) => {
  if (href) {
    return (
      <Link href={href} passHref className={clsx(styles.root, rest.className)}>
        {rest.children}
      </Link>
    );
  }

  return <BaseButton {...rest} />;
};

Button.displayName = "Button";

interface SecondaryButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export const SecondaryButton = (props: SecondaryButtonProps | ButtonProps) => {
  return (
    <PrimitiveButton
      size="lg"
      variant={props.variant}
      className={props.className}
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

interface IconButtonProps extends ButtonProps {
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
