"use client";

import React, {
  forwardRef,
  useRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import { mergeRefs } from "react-merge-refs";

import styles from "./Button.module.css";
import clsx from "clsx";
import LoadingDots from "@/components/UI/LoadingDots";
import Link from "next/link";

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
          {children}
          {loading && (
            <i className="flex pl-2 m-0">
              <LoadingDots />
            </i>
          )}
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
        {children}
        {loading && (
          <i className="flex pl-2 m-0">
            <LoadingDots />
          </i>
        )}
      </Component>
    );
  }
);
Button.displayName = "Button";

export default Button;
