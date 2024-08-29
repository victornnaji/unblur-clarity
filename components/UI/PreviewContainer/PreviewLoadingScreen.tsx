"use client";

import React, { useState, useEffect } from "react";
import ZoomImageViewer from "../ImageViewer/ZoomImageViewer";
import StatusNotification from "../StatusNotification";
import { CircularProgress } from "@nextui-org/react";
import ResetTab from "@/components/UI/ResetTab";

const PreviewLoadingScreen = () => {
  const statusTexts = [
    "",
    "Loading...",
    "Fetching data...",
    "",
    "Almost there...",
    "Preparing preview..."
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (currentTextIndex < statusTexts.length - 1) {
      intervalId = setInterval(() => {
        setCurrentTextIndex((prevIndex) => prevIndex + 1);
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentTextIndex, statusTexts.length]);

  return (
    <div style={{ marginBottom: "20px" }} className="relative h-full">
      <div className="relative">
        <div className="absolute inset-0 z-10 flex justify-center flex-col items-center bg-black bg-opacity-80">
          <CircularProgress
            strokeWidth={4}
            color="secondary"
            aria-label="Loading..."
          />
          <StatusNotification message={statusTexts[currentTextIndex]} />
        </div>
        <div className="h-full lg:h-100 mt-6 flex flex-col items-start justify-between gap-6 sm:flex-row mb-12">
          <ZoomImageViewer
            classNames={{
              base: "lg:h-100",
              image: "mb-1 border"
            }}
            alt="Left Image"
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/sydney-opera-house-1.jpg"
          />
        </div>
      </div>
      <ResetTab />
    </div>
  );
};

export default PreviewLoadingScreen;
