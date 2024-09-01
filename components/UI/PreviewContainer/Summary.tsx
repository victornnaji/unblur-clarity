"use client";

import { useAppStore } from "@/hooks/use-store";
import React from "react";

const Summary = () => {
  const { prediction } = useAppStore((state) => ({
    prediction: state.prediction,
  }));

  return (
    <div className="text-sm text-left text-zink lg:mt-2">
      <span>Restoration time: {prediction?.predict_time?.toFixed(2)} </span>
    </div>
  );
};

export default Summary;
