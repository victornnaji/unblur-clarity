import React from "react";
import { PredictionDto } from "@/types/dtos";
import { Accordion, AccordionItem } from "@nextui-org/react";
import PhotoCompare from "./PhotoCompare";
import { downloadPhoto, formatTime } from "@/utils/helpers";
import { SecondaryButton } from "./Button/Button";
import { Download } from "react-feather";
import { ReactCompareSliderImage } from "react-compare-slider";
import EmptyScreen from "./EmptyScreen";

const PreviewAccordion = ({
  predictions,
  type,
}: {
  predictions: PredictionDto[];
  type: "completed" | "progress";
}) => {
  if (predictions.length === 0) {
    return (
      <div className="h-full w-full">
        <EmptyScreen
          title="No data here yet!"
          description={
            type === "completed"
              ? "Completed data will appear here."
              : "Upgrades in progress will appear here."
          }
        />
      </div>
    );
  }

  return (
    <Accordion variant="light" className="px-0 mx-auto text-sm">
      {predictions.map((prediction) => (
        <AccordionItem
          textValue={prediction.image_name ?? ""}
          key={prediction.id}
          title={
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-zink text-sm font-light">
                  {prediction.image_name}
                </span>
                <span className="text-xs text-darkzink">
                  {type === "completed"
                    ? formatTime(prediction.completed_at ?? "")
                    : `started ${formatTime(prediction.created_at ?? "")}`}
                </span>
              </div>
              <div>
                {type === "completed" && prediction.image_url && (
                  <SecondaryButton
                    as={"div"}
                    href={prediction.image_url!}
                    isIconOnly
                    variant="faded"
                    className="cursor-pointer flex text-zink bg-transparent items-center border-none justify-center lg:min-w-8 lg:h-8 hover:bg-transparent"
                    onClick={() => {
                      downloadPhoto(
                        prediction.image_url!,
                        prediction.image_name!
                      );
                    }}
                  >
                    <Download size={20} />
                  </SecondaryButton>
                )}
              </div>
            </div>
          }
          classNames={{
            base: "bg-zinc-800 px-2 text-sm",
            title: "text-zinc-50",
            content: "text-zinc-50",
          }}
        >
          {type === "completed" ? (
            <PhotoCompare
              leftImage={prediction.original_image_url!}
              rightImage={prediction.image_url!}
              leftAlt={prediction.image_name!}
              rightAlt={prediction.image_name!}
              className="lg:h-[80vh]"
            />
          ) : (
            <div className="lg:h-[50vh] bg-black opacity-50">
              <ReactCompareSliderImage
                src={prediction.original_image_url ?? ""}
                alt={prediction.image_name!}
                className="h-full w-full"
              />
            </div>
          )}
          <div className="text-sm text-zink mt-4">
            Generation time: {prediction.predict_time ?? "**"}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default PreviewAccordion;
