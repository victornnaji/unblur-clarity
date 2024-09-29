import React from "react";
import { Link, LinkProps } from "@nextui-org/react";
import { clsx } from "@/utils/clsx";

interface CustomLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  type?: "block" | "inline";
  className?: string;
}

const CustomLink = ({
  href,
  children,
  type = "block",
  className,
  ...props
}: CustomLinkProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        type === "inline" &&
          "text-purple inline-block transition-all hover:underline",
        className
      )}
      isBlock={type === "block"}
      color="foreground"
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
