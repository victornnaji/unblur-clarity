import React from "react";
import { redirect } from "next/navigation";
import SidebarContainer from "@/components/UI/SideBar";
import PreviewContainer from "@/components/UI/PreviewContainer";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/actions";

export default async function Unblur() {
  const supabase = createClient();
  const user = await getUser(supabase);
  if (!user) {
    redirect("/signin");
  }
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
