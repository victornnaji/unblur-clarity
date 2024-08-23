"use client";

import GoogleIcon from "@/components/Icons/GoogleIcon";
import Button from "@/components/UI/Button";
import { signInWithOAuth } from "@/utils/auth-helpers/client";
import { type Provider } from "@supabase/supabase-js";
import { useState } from "react";

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

export default function OauthSignIn() {
  const providers: OAuthProviders[] = [
    {
      name: "google",
      displayName: "Google",
      icon: <GoogleIcon />,
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await signInWithOAuth(e);
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
            variant="slim"
            type="submit"
            className="w-full"
            loading={isSubmitting}
          >
            <span className="mr-2">{provider.icon}</span>
            <span>{provider.displayName}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
