import React from "react";
import SidebarContainer from "@/components/UI/SideBar";
import PreviewContainer from "@/components/UI/PreviewContainer";

export default async function Unblur() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 mt-4 lg:mt-0">
      <section className="col-span-1 lg:col-span-3">
        <SidebarContainer />
      </section>
      <section className="col-span-1 lg:col-span-9">
        <PreviewContainer />
      </section>
    </div>
  );
}
