"use client";

import React, { useId } from "react";
import { getCldImageUrl } from "next-cloudinary";
import IsInView from "@/components/UI/IsInView";
import dynamic from "next/dynamic";
import "next-cloudinary/dist/cld-video-player.css";

interface CloudinaryVideoPlayerProps {
  publicId: string;
  posterPublicId?: string;
}

const DynamicCldVideoPlayer = dynamic(
  () => import("next-cloudinary").then((mod) => mod.CldVideoPlayer),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const CloudinaryVideoPlayer: React.FC<CloudinaryVideoPlayerProps> = ({
  publicId,
  posterPublicId
}) => {
  return (
    <IsInView>
      <DynamicCldVideoPlayer
        id={useId()}
        logo={false}
        src={publicId}
        autoPlay={false}
        poster={getCldImageUrl({
          src: posterPublicId || publicId,
          quality: "default",
          format: "default"
        })}
      />
    </IsInView>
  );
};

export default CloudinaryVideoPlayer;
