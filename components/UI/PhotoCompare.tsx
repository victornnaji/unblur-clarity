"use client";

import clsx from "clsx";
import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from "react-compare-slider";

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
  rightAlt
}: PhotoCompareProps) => {
  return (
    <ReactCompareSlider
      className={clsx("relative", className)}
      itemOne={<ReactCompareSliderImage src={leftImage} alt={leftAlt} />}
      itemTwo={<ReactCompareSliderImage src={rightImage} alt={rightAlt} />}
    />
  );
};

export default PhotoCompare;
