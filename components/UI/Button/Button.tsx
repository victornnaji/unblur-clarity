"use client";

import React, { forwardRef, useRef, ButtonHTMLAttributes } from "react";
import { mergeRefs } from "react-merge-refs";

import styles from "./Button.module.css";
import clsx from "clsx";
import LoadingDots from "@/components/UI/LoadingDots";
import Link from "next/link";
import { Button as PrimitiveButton, ButtonProps } from "@nextui-org/react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: "slim" | "flat";
  active?: boolean;
  width?: number;
  loading?: boolean;
  Component?: React.ComponentType;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (props, buttonRef) => {
    const {
      className,
      variant = "flat",
      children,
      active,
      width,
      loading = false,
      disabled = false,
      style = {},
      Component = "button",
      href,
      ...rest
    } = props;
    const ref = useRef(null);
    const rootClassName = clsx(
      styles.root,
      {
        [styles.slim]: variant === "slim",
        [styles.loading]: loading,
        [styles.disabled]: disabled,
      },
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          passHref
          aria-pressed={active}
          data-variant={variant}
          className={rootClassName}
          style={{
            width,
            ...style,
          }}
          {...rest}
        >
          {loading && (
            <i className="flex pr-2 m-0">
              <LoadingDots />
            </i>
          )}
          {children}
        </Link>
      );
    }

    return (
      <Component
        aria-pressed={active}
        data-variant={variant}
        ref={mergeRefs([ref, buttonRef])}
        className={rootClassName}
        disabled={disabled}
        style={{
          width,
          ...style,
        }}
        {...rest}
      >
        {loading && (
          <i className="flex pr-2 m-0">
            <LoadingDots />
          </i>
        )}
        {children}
      </Component>
    );
  }
);
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

export default Button;
