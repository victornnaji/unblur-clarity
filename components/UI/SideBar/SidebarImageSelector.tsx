'use client';

import { useAppStore } from "@/hooks/use-store";
import { PhotoType } from "@/types";
import React from "react";
import Uploader from "../Uploader";

const ImageSelector = () => {
  const { setPhoto } = useAppStore((state) => state);

  const handlePhotoChange = React.useCallback((photo: PhotoType) => {
    setPhoto(photo);
  }, []);

  return <Uploader handlePhoto={handlePhotoChange} />;
};

export default ImageSelector;
