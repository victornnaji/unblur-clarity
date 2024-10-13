import React from "react";
import CustomLink from "@/components/UI/CustomLink";
import { clsx } from "@/utils/clsx";

interface ExtraInfoProps {
  text: string;
  link: string;
  linkText: string;
  className?: string;
}
const ExtraInfo = ({ text, link, linkText, className }: ExtraInfoProps) => {
  return (
    <span className={clsx("mb-6 text-sm text-left text-zink flex flex-col", className)}>
      <span>{text}</span>
      <CustomLink type="inline" href={link} className="text-sm">
        {linkText}
      </CustomLink>
    </span>
  );
};

export default ExtraInfo;
