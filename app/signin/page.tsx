import UnblurLayout from "@/components/UnblurLayout";
import Separator from "@/components/UI/Separator";
import MagicLinkSignInForm from "@/components/UI/AuthForms/MagicLinkSignInForm";
import OauthSignInForm from "@/components/UI/AuthForms/OauthSigninForm";

export default async function SignIn() {
  return (
    <UnblurLayout>
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
          <p className="flex justify-center mb-4 text-md">
            👋🏻 Hello there! please sign in to start enhancing your photos.
          </p>
          <div className="flex flex-col space-y-4 mt-4">
            <MagicLinkSignInForm />
            <Separator text="Third-party sign-in" />
            <OauthSignInForm />
          </div>
        </div>
      </div>
    </UnblurLayout>
  );
}
