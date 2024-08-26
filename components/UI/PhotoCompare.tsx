"use client";

import clsx from "clsx";
import Image from "next/image";
import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
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
  rightAlt,
}: PhotoCompareProps) => {
  const [loaded, setLoaded] = React.useState(0);
  const imageStyle = {
    opacity: loaded === 2 ? 1 : 0,
    transition: 'opacity 1s 0.5s ease-in-out'
  };
  return (
    <ReactCompareSlider
      className={clsx("relative", className)}
      //   style={imageStyle}
      itemOne={
        <ReactCompareSliderImage
          src={leftImage}
          alt={leftAlt}
        //   style={imageStyle}
          //   layout="fill"
          onLoad={() => setLoaded((prev) => prev + 1)}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={rightImage}
        //   style={imageStyle}
          alt={rightAlt}
          //   layout="fill"
          onLoad={() => setLoaded((prev) => prev + 1)}
        />
      }
    />
  );
};

export default PhotoCompare;
