"use client";
import React, { useState } from "react";
import { Maximize2, Download, Trash2 } from "react-feather";
import { PredictionDto } from "@/types/dtos";
import { shortenFileName, formatTime, downloadPhoto } from "@/utils/helpers";
import { IconButton } from "@/components/UI/Button";
import PhotoCompare from "@/components/UI/PhotoCompare";
import PreviewCard from "./PreviewCard";
import Modal from "@/components/UI/Modal";
import { Spinner } from "@nextui-org/react";

const PreviewCardsContainer = ({
  type,
  predictions
}: {
  type: "inProgress" | "completed";
  predictions: PredictionDto[];
}) => {
  return (
    <div className="card-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-auto-fit-300 gap-3">
      {type === "inProgress" ? (
        <InProgress predictions={predictions} />
      ) : (
        <Completed predictions={predictions} />
      )}
    </div>
  );
};

const InProgress = ({ predictions }: { predictions: PredictionDto[] }) => {
  return (
    <>
      {predictions.map((prediction) => (
        <div key={prediction.id} className="relative">
          <PreviewCard
            image={{
              src: prediction.original_image_url!,
              alt: prediction.image_name ?? "restored Image"
            }}
            footer={
              <div className="flex flex-col">
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
    </>
  );
};

const Completed = ({ predictions }: { predictions: PredictionDto[] }) => {
  const [openPredictionId, setOpenPredictionId] = useState<string | null>(null);
  return (
    <>
      {predictions.map((prediction) => (
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
  );
};

export default PreviewCardsContainer;
