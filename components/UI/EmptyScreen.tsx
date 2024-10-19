import React from "react";
import Ghost from "@/components/Icons/GhostIcon";

const EmptyScreen = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center grid place-items-center h-full mb-5 lg:mb-0">
      <div className="flex flex-col items-center justify-center">
        <div className="w-24 h-24"><Ghost /></div>
        <h5 className="mt-6 lg:mt-12 text-md text-bold">{title}</h5>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default EmptyScreen;
