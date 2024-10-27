"use client";

import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { Download, Maximize2, Trash2 } from "react-feather";
import {
  downloadPhoto,
  formatName,
  formatTime,
  shortenFileName
} from "@/utils/helpers";
import PreviewCard from "@/components/UI/PreviewContainer/PreviewCard";
import { IconButton } from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import PhotoCompare from "@/components/UI/PhotoCompare";
import { getCompletedPredictions } from "@/data/services/predictions.service";
import { initiatePredictionDeletion } from "@/app/studio/actions";
import ConfirmModal from "../Modal/ConfirmModal";
import { Checkbox } from "@nextui-org/react";
import { clsx } from "@/utils/clsx";
import { PredictionDto } from "@/types/dtos";

const Completed = () => {
  const [openPredictionId, setOpenPredictionId] = useState<string | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedPredictions, setSelectedPredictions] = useState<string[]>([]);

  const {
    data: predictions,
    error,
    isLoading
  } = useSWR("completedPredictions", getCompletedPredictions);

  if (error) return <p>Failed to load, please refresh the page</p>;
  if (!predictions || isLoading)
    return <div>Loading your completed Enhancements...</div>;
  if (predictions.length === 0)
    return <div>No completed Enhancements so far</div>;

  const initiatePredictionDeletions = async () => {
    mutate(
      "completedPredictions",
      async (currentPredictions: PredictionDto[] | undefined) => {
        if (!currentPredictions) return [];
        await Promise.all(selectedPredictions.map(initiatePredictionDeletion));
        return currentPredictions.filter(
          (p) => !selectedPredictions.includes(p.id)
        );
      },
      { revalidate: false }
    );
    setSelectedPredictions([]);
  };

  const handleDeletePrediction = (predictionId: string) => {
    setOpenConfirmModal(true);
    setSelectedPredictions((prev) => {
      if (!prev.includes(predictionId)) {
        return [...prev, predictionId];
      }
      return prev;
    });
  };

  const handleSelectPrediction = (predictionId: string) => {
    setSelectedPredictions((prev) =>
      prev.includes(predictionId)
        ? prev.filter((id) => id !== predictionId)
        : [...prev, predictionId]
    );
  };

  const handleSelectAllPredictions = () => {
    if (predictions) {
      if (selectedPredictions.length === predictions.length) {
        // If all are selected, deselect all
        setSelectedPredictions([]);
      } else {
        // Otherwise, select all
        setSelectedPredictions(predictions.map((prediction) => prediction.id));
      }
    }
  };

  return (
    <div className="card-container">
      <div className="mb-2 flex justify-end size-full">
        <Checkbox
          classNames={{
            base: clsx(
              "inline-flex w-full m-0",
              "items-center justify-start",
              "cursor-pointer",
              "outline-none ring-0 focus:ring-0 focus:ring-offset-0",
              "data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-0"
            )
          }}
          id="select-all"
          color="secondary"
          name="select all"
          isSelected={selectedPredictions.length === predictions.length}
          onValueChange={handleSelectAllPredictions}
        >
          Select All
        </Checkbox>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-auto-fit-300 gap-3">
        {predictions &&
          predictions.map((prediction) => {
            const image =
              prediction.status === "failed"
                ? {
                    src: prediction.original_image_url!,
                    alt: prediction.image_name ?? "Original Image"
                  }
                : {
                    src: prediction.image_url!,
                    alt: prediction.image_name ?? "Restored Image"
                  };
            return (
              <div key={prediction.id}>
                <PreviewCard
                  classNames={{
                    header: "justify-between w-full flex-row items-center",
                    image: `${
                      prediction.status === "failed" ? "!opacity-40" : ""
                    }`,
                    footer: `${
                      prediction.status === "failed" ? "bg-white/40" : ""
                    }`
                  }}
                  onPress={() => handleSelectPrediction(prediction.id)}
                  header={
                    <>
                      <span>
                        <Checkbox
                          id="select-image"
                          name="select image"
                          color="secondary"
                          isSelected={selectedPredictions.includes(
                            prediction.id
                          )}
                          onValueChange={() =>
                            handleSelectPrediction(prediction.id)
                          }
                        />
                      </span>
                      {prediction.status !== "failed" && (
                        <IconButton
                          Icon={Maximize2}
                          onClick={() => setOpenPredictionId(prediction.id)}
                          aria-label="Expand"
                        />
                      )}
                    </>
                  }
                  image={image}
                  footer={
                    <>
                      <div className="flex flex-col justify-start items-start">
                        <span className="text-background text-sm">
                          {shortenFileName(prediction.image_name ?? "")}
                        </span>
                        <span className="text-gray text-xs opacity-80">
                          {formatName(prediction.model ?? "")}
                        </span>
                        <span
                          className={clsx(
                            "text-xs",
                            prediction.status === "failed" ? "text-red-900" : ""
                          )}
                        >
                          {prediction.status === "failed"
                            ? `failed ${formatTime(
                                prediction.completed_at ?? ""
                              )}`
                            : formatTime(prediction.completed_at ?? "")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        {prediction.status !== "failed" && (
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
                        )}
                        <div className="ml-1">
                          <IconButton
                            Icon={Trash2}
                            onClick={() =>
                              handleDeletePrediction(prediction.id)
                            }
                            aria-label="Delete"
                          />
                        </div>
                      </div>
                    </>
                  }
                />
                {prediction.status !== "failed" && (
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
                )}
              </div>
            );
          })}
        <ConfirmModal
          header={`Delete Image${selectedPredictions.length > 1 ? "s" : ""}?`}
          isOpen={openConfirmModal}
          onConfirm={initiatePredictionDeletions}
          onCancel={() => setOpenConfirmModal(false)}
          onClose={() => setOpenConfirmModal(false)}
        >
          This action cannot be undone and will permanently remove{" "}
          {selectedPredictions.length > 1
            ? `the selected ${selectedPredictions.length} images `
            : "the selected image "}
          from your completed Enhancements and account.
        </ConfirmModal>
      </div>
    </div>
  );
};

export default Completed;
