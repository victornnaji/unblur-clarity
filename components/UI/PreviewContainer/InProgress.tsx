import { PredictionDto } from "@/types/dtos";
import React from "react";
import PreviewAccordion from "../PreviewAccordion";
import useSWR from "swr";
import { fetcher } from "@/utils/api-helpers/client";

const InProgress = () => {
  const { data, error } = useSWR<PredictionDto[]>(
    "/api/client/predictions/inprogress",
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnMount: true,
    }
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="h-full w-full overflow-scroll">
      <PreviewAccordion predictions={data} type="progress" />
    </div>
  );
};

export default InProgress;
