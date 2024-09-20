import React from "react";
import PreviewCardsContainer from "@/components/UI/PreviewContainer/PreviewCardsContainer";
import { getCompletedPredictions } from "./action";

const CompletedPage = async () => {
  const { predictions, error } = await getCompletedPredictions();

  if (!predictions) return <p>Loading...</p>;
  if (error) return <p>Failed to load, please refresh the page</p>;
  if (predictions.length === 0)
    return (
      <p>
        No completed enhancements so far. <br />
        Try enhancing or unblurring some images!
      </p>
    );

  return (
    <div className="max-h-full w-full overflow-scroll">
      <PreviewCardsContainer type="completed" predictions={predictions} />
    </div>
  );
};

export default CompletedPage;
