import React from "react";
import { getInProgressPredictions } from "./action";
import PreviewCardsContainer from "@/components/UI/PreviewContainer/PreviewCardsContainer";

const InProgressPage = async () => {
  const predictions = await getInProgressPredictions();

  if (predictions.error)
    return <div>Failed to load, please refresh the page</div>;
  if (!predictions.data) return <div>Loading...</div>;
  if (predictions.data.length === 0)
    return <div>No predictions currently in progress</div>;

  return (
    <div className="max-h-full w-full overflow-scroll">
      <PreviewCardsContainer type="inProgress" predictions={predictions.data} />
    </div>
  );
};

export default InProgressPage;
