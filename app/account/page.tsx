import BioCard from "@/components/UI/Accounts/BioCard";
import ClientContent from "@/components/UI/Accounts/ClientContent";
import { getUser } from "@/data/services/user.service";

import {
  getSubscriptionForUser,
  getAllPredictionsByUser,
  getUsersCreditsOnly,
  getUsersOneTimeCreditsOnly,
} from "@/utils/supabase/actions";

export default async function AccountPage() {
  const [user, subscription, credits, oneTimeCredits, predictions] =
    await Promise.all([
      getUser(),
      getSubscriptionForUser(),
      getUsersCreditsOnly(),
      getUsersOneTimeCreditsOnly(),
      getAllPredictionsByUser(),
    ]);

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
          credits={credits}
          oneTimeCredits={oneTimeCredits}
          predictions={predictions}
        />
      </div>
    </>
  );
}
