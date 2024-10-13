import { getCredits } from "@/app/studio/actions";
import { clsx } from "@/utils/clsx";
import React from "react";
import useSWR from "swr";

const Credits = ({ className }: { className?: string }) => {
  const { data: creditsData, error, isLoading } = useSWR("credits", getCredits);

  return (
    <div
      className={clsx(
        "py-2 text-sm border-gray border-3 text-zink text-center mb-3",
        className
      )}
    >
      {error ? (
        <span className="text-error">
          Failed to load credits, please refresh
        </span>
      ) : (
        <>
          <span>Credits:</span>{" "}
          <span className="font-bold">
            {isLoading ? "***" : creditsData?.credits ?? 0} 💰
          </span>
        </>
      )}
    </div>
  );
};

export default Credits;
