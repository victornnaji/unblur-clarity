"use client";

import React from "react";
import SidebarUpscalingOptionsSeletors from "./SidebarImageUpscaleSelectors";
import SidebarModelSelector from "./SidebarModelSelector";
import SidebarImageSelector from "./SidebarImageSelector";
import SidebarButton from "./SidebarButton";

const SidebarContainer = ({ credits }: { credits: number }) => {
  return (
    <>
      <SidebarImageSelector />
      <SidebarModelSelector />
      <div className="lg:h-80 overflow-scroll box-border">
        <SidebarUpscalingOptionsSeletors />
      </div>
      <SidebarButton credits={credits} />
    </>
  );
};

export default SidebarContainer;
