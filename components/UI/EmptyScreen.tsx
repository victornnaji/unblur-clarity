import React from "react";
import Ghost from "@/components/Icons/GhostIcon";

const EmptyScreen = () => {
  return (
    <div className="text-center grid place-items-center h-full">
      <div className="flex flex-col items-center justify-center">
        <Ghost />
        <h5 className="mt-12 text-md text-bold">No Image here yet!</h5>
        <p className="text-sm">Begin upscaling to see your image here. </p>
      </div>
    </div>
  );
};

export default EmptyScreen;
