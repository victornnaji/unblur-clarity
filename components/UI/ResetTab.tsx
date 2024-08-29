import { Checkbox } from "@nextui-org/react";
import React from "react";
import Balancer from "react-wrap-balancer";
import { SecondaryButton } from "./Button/Button";
import { Tooltip } from "./Tooltip";
import { useAppStore } from "@/hooks/use-store";

const ResetTab = () => {
  const { reset, appStatus } = useAppStore((state) => state);
  const [isEmailOptIn, setIsEmailOptIn] = React.useState(true);

  const handleClick = React.useCallback(() => {
    reset();
  }, [reset]);

  console.log(appStatus);

  return (
    <div className="text-center text-zinc">
      <Balancer ratio={0.99}>
        <h3 className="text-lg text-bold mb-1 uppercase">
          Your image processing may take some time
        </h3>
        <p className="mx-auto text-base text-center md:max-w-[80%]">
          Don't worry, you can click the button below to reset this page and start another round of
          enhancement! Your image will be processed in the background.
        </p>
      </Balancer>
      <div className="mt-6">
        <div className="text-sm flex items-center justify-center">
          <Checkbox
            id="email-opt-in"
            name="email-opt-in"
            color="secondary"
            isSelected={isEmailOptIn}
            onValueChange={() => setIsEmailOptIn((val) => !val)}
          >
            <Tooltip content="By checking this box, you agree to receive email updates about your image processing.">
              <span className="text-darkzink">
                Receive email update on completion
              </span>
            </Tooltip>
          </Checkbox>
        </div>
        <SecondaryButton onClick={handleClick} className="mt-2">
          Start a new upload
        </SecondaryButton>
      </div>
    </div>
  );
};

export default ResetTab;
