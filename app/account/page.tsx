import BioCard from "@/components/UI/Accounts/BioCard";
import ClientContent from "@/components/UI/Accounts/ClientContent";

import { getUserCredits } from "@/data/services/credits.service";
import { getAllPredictions } from "@/data/services/predictions.service";
import { getSubscription } from "@/data/services/subscription.service";
import { getUser } from "@/data/services/users.service";
import { getCreditAmountByProductId } from "@/utils/api-helpers/server";

export default async function AccountPage() {
  const [user, subscription, creditsData, predictions] = await Promise.all([
    getUser(),
    getSubscription(),
    getUserCredits(),
    getAllPredictions()
  ]);

  const planCredit = subscription?.product_id
    ? await getCreditAmountByProductId(subscription?.product_id)
    : 0;

  return (
    <>
      <h1 className="text-4xl font-bold">Account Settings</h1>
      <h2 className="mt-2 text-darkzink">
        Manage your account settings and subscription settings
      </h2>
      <div className="mt-10 gap-y-2 lg:gap-4 grid _grid-areas-account">
        <div className="_grid-area-bio">
          <BioCard user={user} />
        </div>
        <ClientContent
          subscription={subscription}
          credits={creditsData.credits}
          oneTimeCredits={creditsData.oneTimeCredits}
          predictions={predictions}
          planCredit={planCredit}
        />
      </div>
    </>
  );
}
