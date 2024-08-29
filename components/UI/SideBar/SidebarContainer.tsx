"use client";

import React from "react";
import ImageUpscalingComponents from "./ImageUpscalingComponents";
import SidebarModelSelector from "./SidebarModelSelector";
import SidebarImageSelector from "./SidebarImageSelector";
import Button from "@/components/UI/Button";
import { useAppStore } from "@/hooks/use-store";

const SidebarContainer = () => {
  const { photo, model, setAppStatus, appStatus } = useAppStore((state) => state);

  const buttonText =
    model === "image_upscaling" ? "Upscale Image" : "Enhance Image";

  return (
    <>
      <SidebarImageSelector />
      <SidebarModelSelector />
      <div className="lg:h-80 overflow-scroll mb-5 p-1 box-border">
        {model === "image_upscaling" && <ImageUpscalingComponents />}
      </div>
      <Button
        disabled={!photo.name}
        loading={appStatus.status === "processing"}
        onClick={() => setAppStatus({ status: "processing", message: "" })}
        variant="flat"
        className="grid w-full md:w-1/2 md:mx-auto lg:w-full"
      >
        {buttonText}
      </Button>
    </>
  );
};

export default SidebarContainer;
