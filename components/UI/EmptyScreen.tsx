import React from "react";
import Ghost from "@/components/Icons/GhostIcon";

const EmptyScreen = () => {
  return (
    <div className="text-center grid place-items-center h-full mb-5 lg:mb-0">
      <div className="flex flex-col items-center justify-center">
        <Ghost />
        <h5 className="mt-6 lg:mt-12 text-md text-bold">No Image here yet!</h5>
        <p className="text-sm">Begin upscaling to see your image progress. </p>
      </div>
    </div>
  );
};

export default EmptyScreen;
