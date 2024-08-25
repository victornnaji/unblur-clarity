import React from "react";
import Balancer from "react-wrap-balancer";

const UnblurLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: React.ReactNode | string;
}) => {
  return (
    <div className="mt-12 mb-6 text-center">
      <h1 className="mb-12 text-2xl sm:text-4xl">
        {title ? (
          <Balancer>{title}</Balancer>
        ) : (
          <Balancer>Restore your photos&apos; sharpness with ease</Balancer>
        )}
      </h1>
      {children}
    </div>
  );
};

export default UnblurLayout;
