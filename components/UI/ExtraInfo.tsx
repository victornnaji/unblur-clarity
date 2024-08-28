import Link from "next/link";
import React from "react";

interface ExtraInfoProps {
  text: string;
  link: string;
  linkText: string;
}
const ExtraInfo = ({ text, link, linkText }: ExtraInfoProps) => {
  return (
    <span className="mb-6 text-sm text-left text-zink flex flex-col">
      <span>{text}</span>
      <Link
        target="_blank"
        href={link}
        className="inline-block text-purple transition-all hover:underline"
      >
        {linkText}
      </Link>
    </span>
  );
};

export default ExtraInfo;
