"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { handleRequest } from "@/utils/auth-helpers/client";
import { signInWithMagiclink } from "@/utils/auth-helpers/server";
import TextInput from "@/components/UI/TextInput";
import Button from "@/components/UI/Button";

const MagicLinkSignIn = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await handleRequest(e, signInWithMagiclink, router);
    setIsSubmitting(false);
  };

  return (
    <form
      noValidate={true}
      className="mb-4 mt-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <TextInput
        label="Email Address"
        type="email"
        name="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isSubmitting}
      />
      <Button
        variant="slim"
        type="submit"
        className="mt-5 w-full"
        loading={isSubmitting}
      >
        Sign in
      </Button>
    </form>
  );
};

export default MagicLinkSignIn;
