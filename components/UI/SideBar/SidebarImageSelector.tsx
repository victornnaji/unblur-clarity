import React from "react";
import dynamic from "next/dynamic";
import { Zone } from "../Uploader";

const Uploader = dynamic(() => import("../Uploader"), {
  loading: () => (
    <Zone>
      <span>loading...</span>
    </Zone>
  ),
});

const SidebarImageSelector = () => {
  return <Uploader />;
};

export default SidebarImageSelector;
