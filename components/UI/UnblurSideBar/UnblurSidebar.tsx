"use client";

import React from "react";
import Uploader from "./Uploader";
import Button from "../Button";
import ImageUpscaling from "./ImageUpscaling";
import { useAppStore } from "@/hooks/use-store";
import { PhotoType } from "@/types";
import ModelSelector from "./ModelSelector";

const UnblurSidebar = () => {
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
        {model && model === "image_upscaling" ? <ImageUpscaling /> : null}
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

export default UnblurSidebar;
