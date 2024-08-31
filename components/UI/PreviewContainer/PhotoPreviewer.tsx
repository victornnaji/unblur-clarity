"use client";

import React, { useState } from "react";
import PhotoCompare from "@/components/UI/PhotoCompare";
import Toggle from "@/components/UI/Toggle";
import ZoomImageViewer from "@/components/UI/ImageViewer/ZoomImageViewer";
import { useAppStore } from "@/hooks/use-store";

const PhotoPreviewer = () => {
  const [sideBySide, setSideBySide] = useState(false);
  const toggleSwitch = () => setSideBySide(!sideBySide);
  const { photo } = useAppStore((state) => state);

  return (
    <div className="h-full">
      <Toggle
        initialState={sideBySide}
        onToggle={toggleSwitch}
        className={"mx-3"}
        leftText="Compare"
        rightText="Side by Side"
      />
      <div>
        {sideBySide ? (
          <div className="h-full lg:h-100 mt-6 flex flex-col items-start justify-between gap-6 sm:flex-row">
            <ZoomImageViewer
              classNames={{
                base: "lg:h-100",
                image: "mb-1 border",
              }}
              caption="Original Photo"
              alt="Left Image"
              src={photo.originalImage}
            />
            <ZoomImageViewer
              classNames={{
                base: "lg:h-100",
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
            className="h-100 mt-6 border border-gray"
          />
        )}
      </div>
    </div>
  );
};

export default PhotoPreviewer;
