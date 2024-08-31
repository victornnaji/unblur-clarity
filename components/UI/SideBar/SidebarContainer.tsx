"use client";

import React, { useCallback } from "react";
import ImageUpscalingComponents from "./ImageUpscalingComponents";
import SidebarModelSelector from "./SidebarModelSelector";
import SidebarImageSelector from "./SidebarImageSelector";
import Button from "@/components/UI/Button";
import { useAppStore } from "@/hooks/use-store";
import { initiatePrediction } from "@/app/unblur/actions";
import { pollPredictionStatus } from "@/utils/api-helpers/server";

const SidebarContainer = () => {
  const { photo, model, setAppStatus, appStatus, payload, setPhoto } =
    useAppStore((state) => state);

  const buttonText =
    model === "image_upscaling" ? "Upscale Image" : "Enhance Image";

  const startPrediction = useCallback(async () => {
    setAppStatus({ status: "processing", message: "Gathering image data..." });

    try {
      const response = await initiatePrediction({
        image_url: photo.originalImage,
        model,
        prompt: payload.prompt,
        upscale_style: payload.upscaleStyle,
      });

      if (!response.predictionId) {
        throw new Error("No prediction ID returned");
      }

      setAppStatus({ status: "processing", message: "Processing image..." });
      setPhoto({
        ...photo,
        originalImage: response.secure_url,
      });

      const prediction = await pollPredictionStatus(response.predictionId);
      switch (prediction.status) {
        case "succeeded":
          setAppStatus({
            status: "success",
            message: "Image processed successfully",
          });
          setPhoto({
            ...photo,
            restoredImage: prediction?.image_url || "",
          });
          break;
        case "failed":
          throw new Error(prediction.error || "Prediction failed");
        case "canceled":
          throw new Error("Prediction was canceled");
        default:
          throw new Error(`Unexpected prediction status: ${prediction.status}`);
      }
    } catch (error) {
      console.error("Prediction error:", error);
      setAppStatus({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred while processing your image.",
      });
    }
  }, [setAppStatus, photo.originalImage, model, payload]);

  return (
    <>
      <SidebarImageSelector />
      <SidebarModelSelector />
      <div className="lg:h-80 overflow-scroll mb-5 p-1 box-border">
        {model === "image_upscaling" && <ImageUpscalingComponents />}
      </div>
      <Button
        disabled={!photo.name}
        loading={appStatus.status === "processing"}
        onClick={startPrediction}
        variant="flat"
        className="grid w-full md:w-1/2 md:mx-auto lg:w-full"
      >
        {buttonText}
      </Button>
    </>
  );
};

export default SidebarContainer;
