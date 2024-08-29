"use client";

import React from "react";
import PhotoPreviewer from "./PhotoPreviewer";
import { useAppStore } from "@/hooks/use-store";
import PreviewContainerFooter from "./PreviewContainerFooter";
import Summary from "./Summary";
import EmptyScreen from "../EmptyScreen";
import PreviewLoadingScreen from "./PreviewLoadingScreen";

const PreviewContainer = () => {
  const {
    photo,
    appStatus: { status }
  } = useAppStore((state) => state);
  const hasBothPhotos = photo.originalImage && photo.restoredImage;
  return (
    <div className="lg:rounded-md shadow-md my-6 lg:mt-0 pt-6 lg:p-6 h-auto lg:h-full border-t lg:border-gray lg:border-2">
      {status === "idle" || status === "reset" ? (
        <EmptyScreen />
      ) : (
        <div className="grid lg:grid-rows-[35rem_minmax(0,_1fr)] h-full">
          {status === "success" && hasBothPhotos ? (
            <>
              <PhotoPreviewer />
              <div className="mt-8 lg:mt-4">
                <Summary />
                <PreviewContainerFooter />
              </div>
            </>
          ) : (
            status === "processing" && <PreviewLoadingScreen />
          )}
        </div>
      )}
    </div>
  );
};

export default PreviewContainer;
