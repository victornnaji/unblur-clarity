"use client";

import React, { useState } from "react";
import PhotoCompare from "@/components/UI/PhotoCompare";
import Toggle from "@/components/UI/Toggle";
import ZoomImageViewer from "@/components/UI/ImageViewer/ZoomImageViewer";
import { useAppStore } from "@/hooks/use-store";
import { ZoomImage } from "../ImageViewer";

const PhotoPreviewer = () => {
  const [sideBySide, setSideBySide] = useState(true);
  const toggleSwitch = () => setSideBySide(!sideBySide);
  const photo = useAppStore((state) => state.photo);

  return (
    <div className="h-full grid grid-rows-[auto,1fr] gap-6">
      <Toggle
        initialState={sideBySide}
        onToggle={toggleSwitch}
        className={"mx-3"}
        leftText="Compare"
        rightText="Side by Side"
      />
      <div className="h-full">
        {sideBySide ? (
          <div className="h-full flex flex-col items-start justify-between gap-12 sm:flex-row sm:gap-3">
            <ZoomImageViewer
              classNames={{
                base: "lg:h-[32rem] relative",
                image: "mb-1 border",
              }}
              caption="Original Photo"
              alt="Left Image"
              src={photo.originalImage}
            />
            <ZoomImageViewer
              classNames={{
                base: "lg:h-[32rem] relative",
                image: "mb-1 border",
              }}
              caption="Restored Photo"
              alt="Right Image"
              src={photo.restoredImage}
            />
          </div>
        ) : (
          <PhotoCompare
            leftImage={photo.originalImage}
            rightImage={photo.restoredImage}
            leftAlt="Original Image"
            rightAlt="Restored Image"
            className="lg:h-[32rem] mt-6 border border-gray"
          />
        )}
      </div>
    </div>
  );
};

export default PhotoPreviewer;
