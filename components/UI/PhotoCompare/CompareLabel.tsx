import React from "react";

import clsx from "clsx";
import style from "./photoCompare.module.css";

export const CompareLabel = ({
  label,
  labelOpacity,
  className,
}: {
  label: string;
  labelOpacity: number;
  className?: string;
}) => {
  const labelStyle = clsx(
    style.backdrop,
    "absolute px-2 py-1 text-sm text-background border-none rounded rounded-md transition-opacity duration-250 ease-in-out",
    className
  );
  return (
    <span
      className={labelStyle}
      style={{ opacity: labelOpacity }}
      aria-label={label}
    >
      {label}
    </span>
  );
};
