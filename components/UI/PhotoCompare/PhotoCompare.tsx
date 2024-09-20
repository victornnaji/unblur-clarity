"use client";

import clsx from "clsx";
import React, { useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { CompareLabel } from "./CompareLabel";

interface PhotoCompareProps {
  leftImage: string;
  rightImage: string;
  className?: string;
  leftAlt: string;
  rightAlt: string;
}

const PhotoCompare = ({
  leftImage,
  rightImage,
  className,
  leftAlt,
  rightAlt,
}: PhotoCompareProps) => {
  const [labelOpacity, setLabelOpacity] = useState(1);
  return (
    <ReactCompareSlider
      className={clsx("relative w-full h-full", className)}
      onPointerDown={() => setLabelOpacity(0)}
      onPointerUp={() => setLabelOpacity(1)}
      itemOne={
        <div className="flex items-center w-full h-full justify-start">
          <CompareLabel
            label="Original"
            labelOpacity={labelOpacity}
            className="ml-2"
          />
          <ReactCompareSliderImage src={leftImage} alt={leftAlt} />
        </div>
      }
      itemTwo={
        <div className="flex items-center w-full h-full justify-end">
          <CompareLabel
            label="Restored"
            labelOpacity={labelOpacity}
            className="mr-2"
          />
          <ReactCompareSliderImage src={rightImage} alt={rightAlt} />
        </div>
      }
    />
  );
};

export default PhotoCompare;
