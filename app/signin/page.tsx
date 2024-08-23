import UnblurLayout from "@/components/UnblurLayout";
import MagicLinkSignIn from "@/components/UI/AuthForms/MagicLinkSignIn";
import { getServerUser } from "@/utils/auth-helpers/server";
import Separator from "@/components/UI/Separator";
import OauthSignIn from "@/components/UI/AuthForms/OauthSignin";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await getServerUser();

  if (user) {
    redirect("/");
  }

  return (
    <UnblurLayout>
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
          <p className="flex justify-center mb-4 text-md">
            👋🏻 Hello there! please sign in to start deblurring your photos.
          </p>
          <div className="flex flex-col space-y-4 mt-4">
            <MagicLinkSignIn />
            <Separator text="Third-party sign-in" />
            <OauthSignIn />
          </div>
        </div>
      </div>
    </UnblurLayout>
  );
}
