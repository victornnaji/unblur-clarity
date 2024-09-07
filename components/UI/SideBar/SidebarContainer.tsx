"use client";

import React from "react";
import SidebarUpscalingOptionsSeletors from "./SidebarImageUpscaleSelectors";
import SidebarModelSelector from "./SidebarModelSelector";
import SidebarImageSelector from "./SidebarImageSelector";
import SidebarButton from "./SidebarButton";

const SidebarContainer = () => {
  return (
    <>
      <SidebarImageSelector />
      <SidebarModelSelector />
      <div className="lg:h-80 overflow-scroll mb-5 p-1 box-border">
        <SidebarUpscalingOptionsSeletors />
      </div>
      <SidebarButton />
    </>
  );
};

export default SidebarContainer;
