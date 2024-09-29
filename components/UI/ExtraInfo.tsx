import React from "react";
import CustomLink from "@/components/UI/CustomLink";

interface ExtraInfoProps {
  text: string;
  link: string;
  linkText: string;
}
const ExtraInfo = ({ text, link, linkText }: ExtraInfoProps) => {
  return (
    <span className="mb-6 text-sm text-left text-zink flex flex-col">
      <span>{text}</span>
      <CustomLink type="inline" href={link} className="text-sm">
        {linkText}
      </CustomLink>
    </span>
  );
};

export default ExtraInfo;
