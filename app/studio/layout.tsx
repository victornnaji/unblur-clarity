import Credits from "@/components/UI/Credits";
import PreviewContainer from "@/components/UI/PreviewContainer";
import SidebarContainer from "@/components/UI/SideBar";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto,auto,1fr] grid-cols-1 gap-2 lg:gap-4 lg:grid-cols-12 lg:grid-rows-[auto,1fr] mt-4 lg:mt-0">
      <section className="col-span-1 lg:col-span-3 order-first row-span-1 lg:row-[1,2] lg:order-none lg:mb-3">
        <Credits />
      </section>
      <section className="mb-8 lg:mb-0 col-span-1 lg:col-span-3 order-last row-span-1 lg:row-[2/-1] lg:order-none flex flex-col w-full justify-evenly">
        <SidebarContainer />
      </section>
      <section className="col-span-1 lg:col-span-9 row-span-1 lg:row-span-2 lg:order-none">
        <PreviewContainer>{children}</PreviewContainer>
      </section>
    </div>
  );
};

export default layout;
