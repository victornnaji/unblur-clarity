import PreviewContainer from "@/components/UI/PreviewContainer";
import SidebarContainer from "@/components/UI/SideBar";
import { getUserCredits } from "@/utils/supabase/actions";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const credits = await getUserCredits();
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 mt-4 lg:mt-0">
      <section className="col-span-1 lg:col-span-3">
        <SidebarContainer credits={credits ?? 0} />
      </section>
      <section className="col-span-1 lg:col-span-9">
        <PreviewContainer>{children}</PreviewContainer>
      </section>
    </div>
  );
};

export default layout;
