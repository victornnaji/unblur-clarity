import { useAppStore } from "@/hooks/use-store";
import React from "react";
import EmptyScreen from "../EmptyScreen";
import ErrorScreen from "../ErrorScreen";
import PreviewLoadingScreen from "./PreviewLoadingScreen";
import PhotoPreviewer from "./PhotoPreviewer";

const Studio = () => {
  const {
    photo,
    appStatus: { status },
  } = useAppStore((state) => ({
    photo: state.photo,
    appStatus: state.appStatus,
  }));

  const hasBothPhotos = photo.originalImage && photo.restoredImage;

  if (status === "processing") {
    return <PreviewLoadingScreen />;
  }

  if (status === "success" && hasBothPhotos) {
    return <PhotoPreviewer />;
  }

  if (status === "error") {
    return <ErrorScreen />;
  }

  return <EmptyScreen />;
};

export default Studio;
