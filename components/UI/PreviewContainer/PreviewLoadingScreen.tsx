"use client";

import React, { useState, useEffect } from "react";
import StatusNotification from "./StatusNotification";
import { CircularProgress } from "@nextui-org/react";
import { useAppStore } from "@/hooks/use-store";
import Image from "next/image";

const PreviewLoadingScreen = () => {
  // const statusTexts = [
  //   "Gathering image data....",
  //   "Fetching data...",
  //   "",
  //   "Almost there...",
  //   "Preparing preview...",
  // ];
  // const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const { photo, message } = useAppStore((state) => ({
    photo: state.photo,
    message: state.appStatus.message,
  }));

  // useEffect(() => {
  //   let intervalId: string | number | NodeJS.Timeout | undefined;

  //   if (currentTextIndex < statusTexts.length - 1) {
  //     intervalId = setInterval(() => {
  //       setCurrentTextIndex((prevIndex) => prevIndex + 1);
  //     }, 2000);
  //   }

  //   return () => {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //   };
  // }, [currentTextIndex, statusTexts.length]);

  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 flex justify-center flex-col items-center bg-black bg-opacity-80">
        <CircularProgress
          strokeWidth={4}
          color="secondary"
          aria-label="Loading..."
        />
        <StatusNotification message={message} />
        {/* <ResetTab /> // TODO: Add reset tab functionality */}
      </div>
      <div className="relative h-[50vh] lg:h-[45rem] flex flex-col items-start justify-between gap-6 sm:flex-row mb-12">
        <Image
          fill
          className="border"
          objectFit="cover"
          alt="original image"
          src={photo.originalImage}
        />
      </div>
    </div>
  );
};

export default PreviewLoadingScreen;
