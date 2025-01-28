"use client";

import React from "react";
import useSWR from "swr";
import PreviewCard from "@/components/UI/PreviewContainer/PreviewCard";
import { formatTime, shortenFileName } from "@/utils/helpers";
import { Spinner } from "@nextui-org/react";
import { getInProgressPredictions } from "@/data/services/predictions.service";

const InProgress = () => {
  const {
    data: predictions,
    error,
    isLoading
  } = useSWR("inProgressPredictions", getInProgressPredictions);

  if (error) return <div>Failed to load, please refresh the page</div>;
  if (isLoading) return <div>Loading your in progress Enhancements...</div>;
  if (predictions?.length === 0)
    return <div>No enhancements currently in progress</div>;

  return (
    <div className="card-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-auto-fit-300 gap-3">
      {predictions?.map((prediction) => (
        <div key={prediction.id} className="relative">
          <PreviewCard
            image={{
              src: prediction.original_image_url!,
              alt: prediction.image_name ?? "Original Image"
            }}
            footer={
              <div className="flex flex-col items-start">
                <span className="text-background text-sm">
                  {shortenFileName(prediction.image_name!)}
                </span>
                <span className="text-xs">
                  {`started ${formatTime(prediction.created_at ?? "")}`}
                </span>
              </div>
            }
          />
          <div className="absolute top-0 right-0 w-full h-full  grid place-items-center">
            <Spinner color="default" labelColor="foreground" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InProgress;
