import React, { useCallback } from "react";
import Button from "@/components/UI/Button";
import { useAppStore } from "@/hooks/use-store";
import { initiatePrediction } from "@/app/unblur/actions";
import { pollPredictionStatus } from "@/utils/api-helpers/server";

const SidebarButton = ({ credits }: { credits: number }) => {
  const {
    photo,
    model,
    setAppStatus,
    appStatus,
    payload,
    setPhoto,
    setPrediction,
  } = useAppStore((state) => ({
    model: state.model,
    photo: state.photo,
    payload: state.payload,
    appStatus: state.appStatus,
    setAppStatus: state.setAppStatus,
    setPhoto: state.setPhoto,
    setPrediction: state.setPrediction,
  }));

  const buttonText =
    model === "image_upscaling" ? "Upscale Image" : "Enhance Image";

  const startPrediction = useCallback(async () => {
    setAppStatus({ status: "processing", message: "Gathering image data..." });

    try {
      if (credits < 12) {
        setAppStatus({
          status: "error",
          message: "Not enough credits to unblur image",
        });
        return;
      }
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
      setPrediction({
        id: response.predictionId,
        status: "processing",
        predict_time: "",
        error: null,
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
            restoredImage: prediction.image_url!,
          });
          setPrediction({
            id: prediction.id,
            status: prediction.status,
            predict_time: prediction.predict_time,
            error: prediction.error,
          });
          break;
        case "failed":
          setAppStatus({
            status: "error",
            message: prediction.error || "Prediction failed",
          });
        case "canceled":
          setAppStatus({
            status: "canceled",
            message: "Prediction was canceled",
          });
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
  }, [setAppStatus, photo, model, payload, setPhoto]);
  return (
    <Button
      disabled={!photo.name}
      loading={appStatus.status === "processing"}
      onClick={startPrediction}
      variant="flat"
      className="grid w-full md:w-1/2 md:mx-auto lg:w-full"
    >
      {buttonText}
    </Button>
  );
};

export default SidebarButton;
