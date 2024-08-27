"use client";

import React, { useState } from "react";
import PhotoCompare from "@/components/UI/PhotoCompare";
import Toggle from "@/components/UI/Toggle";
import ZoomablePhoto from "@/components/UI/PhotoZoomViewer/ZoomablePhoto";

const PhotoPreviewer = () => {
  const [sideBySide, setSideBySide] = useState(false);
  const toggleSwitch = () => setSideBySide(!sideBySide);

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
            <ZoomablePhoto
              classNames={{
                base: "lg:h-100",
                image: "mb-1 border"
              }}
              caption="Original Photo"
              alt="Left Image"
              src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-1.jpg"
            />
            <ZoomablePhoto
              classNames={{
                base: "lg:h-100",
                image: "mb-1 border"
              }}
              caption="Restored Photo"
              alt="Right Image"
              src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-2.jpg"
            />
          </div>
        ) : (
          <PhotoCompare
            leftImage="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-1.jpg"
            rightImage="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-2.jpg"
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
