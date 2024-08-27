"use client";

import React from "react";
import PhotoPreviewer from "./PhotoPreviewer";
import { useAppStore } from "@/hooks/use-store";
import PreviewUserActions from "./PreviewUserActions";

const PreviewContainer = () => {
  const [photo] = useAppStore((state) => [state.photo]);
  const hasBothPhotos = photo.originalImage && photo.restoredImage;
  return (
    <div className="lg:rounded-md shadow-md my-6 lg:mt-0 pt-6 lg:p-6 h-auto lg:h-full border-t lg:border-gray lg:border-2">
      {!hasBothPhotos ? (
        <div className="grid lg:grid-rows-[35rem_minmax(0,_1fr)] h-full">
          <PhotoPreviewer />
          <div className="mt-8 lg:mt-4">
            <PreviewUserActions />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PreviewContainer;
