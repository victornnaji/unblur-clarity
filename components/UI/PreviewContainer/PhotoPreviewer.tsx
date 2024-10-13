"use client";

import React, { useState } from "react";
import PhotoCompare from "@/components/UI/PhotoCompare";
import Toggle from "@/components/UI/Toggle";
import ZoomImageViewer from "@/components/UI/ImageViewer/ZoomImageViewer";
import { useAppStore } from "@/hooks/use-store";
import Summary from "./Summary";
import PreviewContainerFooter from "./PreviewContainerFooter";
import { ZoomImage } from "@/components/UI/ImageViewer";

const PhotoPreviewer = () => {
  const [sideBySide, setSideBySide] = useState(true);
  const toggleSwitch = () => setSideBySide((prevState) => !prevState);
  const photo = useAppStore((state) => state.photo);

  return (
    <div className="h-full grid grid-rows-[auto,1fr,auto] gap-6">
      <div className="grid lg:grid-cols-[1fr,auto] items-center">
        <Toggle
          initialState={sideBySide}
          onToggle={toggleSwitch}
          className={"mx-3"}
          leftText="Compare"
          rightText="Side by Side"
        />
        <div className="hidden lg:block">
          <PreviewContainerFooter />
        </div>
      </div>
      <div className="h-full">
        {sideBySide ? (
          <div className="h-full lg:h-[38rem] flex flex-col items-start justify-between gap-12 sm:flex-row sm:gap-3">
            <ZoomImageViewer
              classNames={{
                base: "lg:h-[38rem] relative",
                image: "border"
              }}
              caption="Original Photo"
              alt="Left Image"
              src={photo.originalImage}
            />
            <ZoomImageViewer
              classNames={{
                base: "lg:h-[38rem] relative",
                image: "border"
              }}
              caption="Restored Photo"
              alt="Right Image"
              src={photo.restoredImage}
            />
          </div>
        ) : (
         <div className="h-[38rem]">
           <ZoomImage>
            <PhotoCompare
              leftImage={photo.originalImage}
              rightImage={photo.restoredImage}
              leftAlt="Original Image"
              rightAlt="Restored Image"
              className="h-auto w-auto"
            />
          </ZoomImage>
         </div>
        )}
      </div>
      <div className="summary">
        <Summary />
        <div className="block lg:hidden">
          <PreviewContainerFooter />
        </div>
      </div>
    </div>
  );
};

export default PhotoPreviewer;
