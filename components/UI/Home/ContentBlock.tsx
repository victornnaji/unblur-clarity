import React from "react";
import ExtraInfo from "../ExtraInfo";
import Balancer from "react-wrap-balancer";

interface ContentBlockProps {
  title?: string;
  description?: string;
  link?: {
    text: string;
    href: string;
  };
}

const ContentBlock = ({ title, description, link }: ContentBlockProps) => {
  return (
    <div className="flex flex-col gap-2">
      {title && <h4 className="lg:text-4xl text-3xl font-bold mb-2">{title}</h4>}
      {description && (
        <p className="text-md w-full mx-auto">
          <Balancer>{description}</Balancer>
        </p>
      )}
      {link && (
        <div className="w-full flex items-center justify-center">
          <ExtraInfo
            link={link.href}
            text={""}
            linkText={link.text}
            className="text-center text-base"
          />
        </div>
      )}
    </div>
  );
};

export default ContentBlock;
