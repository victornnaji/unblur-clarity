import React from "react";
import { getServerUser } from "@/utils/auth-helpers/server";
import { redirect } from "next/navigation";
import UnblurSidebar from "@/components/UI/UnblurSideBar";
import PreviewContainer from "@/components/UI/PreviewContainer";

export default async function Unblur() {
  const user = await getServerUser();
  if (!user) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 mt-4 lg:mt-0">
      <section className="col-span-1 lg:col-span-3">
        <UnblurSidebar />
      </section>
      <section className="col-span-1 lg:col-span-9">
        <PreviewContainer />
      </section>
    </div>
  );
}
