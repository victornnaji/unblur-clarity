"use client";

import GoogleIcon from "@/components/Icons/GoogleIcon";
import Button from "@/components/UI/Button";
import { signInWithOAuth } from "@/utils/auth-helpers/client";
import { type Provider } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

const providers: OAuthProviders[] = [
  {
    name: "google",
    displayName: "Google",
    icon: <GoogleIcon />
  }
];
export default function OauthSignInForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    const redirectToUrl = searchParams.get("redirectTo");
    await signInWithOAuth(e, redirectToUrl);
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8">
      {providers.map((provider) => (
        <form
          key={provider.name}
          className="pb-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input type="hidden" name="provider" value={provider.name} />
          <Button
            type="submit"
            className="w-full font-normal text-gray font-bold"
            plain
            isLoading={isSubmitting}
            startContent={provider.icon}
          >
            {provider.displayName}
          </Button>
        </form>
      ))}
    </div>
  );
}
