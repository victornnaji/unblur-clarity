import BioCard from "@/components/UI/Accounts/BioCard";
import { createStripePortal } from "@/utils/stripe/admin";
import { getUser } from "@/utils/supabase/actions";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  // const url  = await createStripePortal('/unblur');
  // redirect(url);

  const user = await getUser();

  return (
    <div>
      <h1 className="text-4xl font-bold">Account Settings</h1>
      <h2 className="mt-2 text-darkzink">
        Manage your account settings and subscription settings
      </h2>
      <div className="mt-10 lg:grid-cols-3 grid-cols-1 gap-4 grid">
        <div className="col-span-1 gap-2 xl:gap-4 flex flex-col">
          <BioCard user={user} />
          <div className="manage">
            <Card radius="sm" className="w-full h-full bg-gray border-2">
              <CardHeader>Manage</CardHeader>
            </Card>
          </div>
        </div>

        <div className="subscription col-span-2">
          <Card radius="sm" className="w-full h-full bg-gray border-2">
            <CardHeader>Subscription</CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
