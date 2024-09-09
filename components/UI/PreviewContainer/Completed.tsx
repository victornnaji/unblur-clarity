import { PredictionDto } from "@/types/dtos";
import { fetcher } from "@/utils/api-helpers/client";
import React from "react";
import useSWR from "swr";
import PreviewAccordion from "../PreviewAccordion";

const Completed = () => {
  const { data, error } = useSWR<PredictionDto[]>(
    "/api/client/predictions/completed",
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnMount: true,
    }
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-h-full w-full overflow-scroll">
      <PreviewAccordion predictions={data} type="completed" />
    </div>
  );
};

export default Completed;
