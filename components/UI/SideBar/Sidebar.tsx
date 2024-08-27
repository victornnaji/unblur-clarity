"use client";

import React from "react";
import Uploader from "./Uploader";
import { PhotoType } from "@/types";
import { useAppStore } from "@/hooks/use-store";
import Button from "../Button";
import ImageUpscalingComponents from "./ImageUpscalingComponents";
import ModelSelector from "./ModelSelector";

const Sidebar = () => {
  const { photo, model, setPhoto } = useAppStore((state) => state);

  const handlePhotoChange = React.useCallback((photo: PhotoType) => {
    setPhoto(photo);
  }, []);

  const buttonText =
    model === "image_upscaling" ? "Upscale Image" : "Enhance Image";

  return (
    <>
      <Uploader handlePhoto={handlePhotoChange} />
      <ModelSelector />
      <div className="lg:h-80 overflow-scroll mb-5 p-1 box-border">
        {model && model === "image_upscaling" ? (
          <ImageUpscalingComponents />
        ) : null}
      </div>
      <Button
        disabled={!photo.name}
        variant="flat"
        className="grid w-full md:w-1/2 md:mx-auto lg:w-full"
      >
        {buttonText}
      </Button>
    </>
  );
};

export default Sidebar;
