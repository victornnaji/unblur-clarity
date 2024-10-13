"use client";

import React from "react";
import SidebarUpscalingOptionsSeletors from "./SidebarImageUpscaleSelectors";
import SidebarModelSelector from "./SidebarModelSelector";
import SidebarImageSelector from "./SidebarImageSelector";
import SidebarButton from "./SidebarButton";
import Credits from "../Credits";

const SidebarContainer = ({ credits }: { credits: number }) => {
  return (
    <>
      <Credits />
      <SidebarImageSelector />
      <SidebarModelSelector />
      <div className="lg:h-80 overflow-scroll p-1 box-border">
        <SidebarUpscalingOptionsSeletors />
      </div>
      <SidebarButton credits={credits} />
    </>
  );
};

export default SidebarContainer;
