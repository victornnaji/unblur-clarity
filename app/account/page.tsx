import BioCard from "@/components/UI/Accounts/BioCard";
import StripeCard from "@/components/UI/Accounts/StripeCard";
import SubscriptionCard from "@/components/UI/Accounts/SubscriptionCard";
import { createStripePortal } from "@/utils/stripe/admin";
import {
  getSubscriptionForUser,
  getUser,
  getAllPredictionsByUser,
  getUsersCreditsOnly,
  getUsersOneTimeCreditsOnly,
} from "@/utils/supabase/actions";

export default async function AccountPage() {
  const [
    user,
    stripePortalUrl,
    subscription,
    credits,
    oneTimeCredits,
    predictions,
  ] = await Promise.all([
    getUser(),
    createStripePortal("/account"),
    getSubscriptionForUser(),
    getUsersCreditsOnly(),
    getUsersOneTimeCreditsOnly(),
    getAllPredictionsByUser(),
  ]);

  const subscriptionUpgradeUrl = subscription?.id
    ? `${stripePortalUrl}/subscriptions/${subscription.id}/update`
    : null;

  return (
    <div>
      <h1 className="text-4xl font-bold">Account Settings</h1>
      <h2 className="mt-2 text-darkzink">
        Manage your account settings and subscription settings
      </h2>
      <div className="mt-10 lg:grid-cols-3 grid-cols-1 gap-y-2 lg:gap-4 grid">
        <div className="col-span-1 gap-2 xl:gap-4 flex flex-col">
          <BioCard user={user} />
          <StripeCard url={stripePortalUrl} />
        </div>

        <div className="col-span-2">
          <SubscriptionCard
            subscription={subscription}
            credits={credits}
            oneTimeCredits={oneTimeCredits}
            subscriptionUpgradeUrl={subscriptionUpgradeUrl}
            predictions={predictions}
          />
        </div>
      </div>
    </div>
  );
}
