import React, { useId } from "react";
import { ZoomImage } from "./ZoomImage";
import { ReactCompareSliderImage } from "react-compare-slider";
import clsx from "clsx";

type ClassNames = {
  caption?: string;
  base?: string;
  image?: string;
};
interface ZoomImageViewerProps {
  alt: string;
  caption?: string;
  src: string;
  classNames?: ClassNames;
}

const ZoomImageViewer = ({
  alt,
  caption,
  src,
  classNames
}: ZoomImageViewerProps) => {
  const id = useId();
  return (
    <figure className={clsx("w-full", classNames?.base)} key={id}>
      <ZoomImage id={id}>
        <ReactCompareSliderImage
          src={src}
          alt={alt}
          className={classNames?.image}
        />
      </ZoomImage>
      {caption && (
        <figcaption
          className={clsx(
            "flex text-center text-sm text-zinc mt-2",
            classNames?.caption
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ZoomImageViewer;
