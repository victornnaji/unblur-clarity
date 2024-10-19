"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Download, Maximize2, Trash2 } from "react-feather";
import { downloadPhoto, formatTime, shortenFileName } from "@/utils/helpers";
import { getCompletedPredictions } from "@/app/studio/completed/action";
import PreviewCard from "@/components/UI/PreviewContainer/PreviewCard";
import { IconButton } from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import PhotoCompare from "@/components/UI/PhotoCompare";

const Completed = () => {
  const [openPredictionId, setOpenPredictionId] = useState<string | null>(null);

  const { data, error, isLoading } = useSWR(
    "completedPredictions",
    getCompletedPredictions
  );

  if (!data?.predictions || isLoading)
    return <div>Loading your completed Enhancements...</div>;
  if (data.predictions.length === 0)
    return <div>No enhancements currently in progress</div>;
  if (error || data?.error) return <p>Failed to load, please refresh the page</p>;

  return (
    <div className="card-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-auto-fit-300 gap-3">
      <>
        {data?.predictions &&
          data.predictions.map((prediction) => (
            <div key={prediction.id}>
              <PreviewCard
                header={
                  <IconButton
                    Icon={Maximize2}
                    onClick={() => setOpenPredictionId(prediction.id)}
                    aria-label="Expand"
                  />
                }
                image={{
                  src: prediction.image_url!,
                  alt: prediction.image_name ?? "restored Image"
                }}
                footer={
                  <>
                    <div className="flex flex-col">
                      <span className="text-background text-sm">
                        {shortenFileName(prediction.image_name!)}
                      </span>
                      <span className="text-xs">
                        {formatTime(prediction.completed_at ?? "")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <IconButton
                        Icon={Download}
                        onClick={() =>
                          downloadPhoto(
                            prediction.image_url!,
                            prediction.image_name!
                          )
                        }
                        aria-label="Download"
                      />
                      <div className="ml-1">
                        <IconButton
                          Icon={Trash2}
                          onClick={() => console.log()}
                          aria-label="Delete"
                        />
                      </div>
                    </div>
                  </>
                }
              />
              <Modal
                isOpen={openPredictionId === prediction.id}
                onClose={() => setOpenPredictionId(null)}
              >
                <PhotoCompare
                  leftImage={prediction.original_image_url!}
                  rightImage={prediction.image_url!}
                  leftAlt="Original Image"
                  rightAlt="Restored Image"
                  className="w-full border border-gray"
                />
              </Modal>
            </div>
          ))}
      </>
    </div>
  );
};

export default Completed;
