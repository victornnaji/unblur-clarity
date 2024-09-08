"use client";

import React, { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/react";
import Balancer from "react-wrap-balancer";
import { SecondaryButton } from "./Button/Button";
import { Tooltip } from "./Tooltip";
import { useAppStore } from "@/hooks/use-store";
import { getPredictionStartTime } from "@/utils/api-helpers/server";
import { AlertOctagon } from "react-feather";

const ResetTab = () => {
  const { reset, prediction } = useAppStore((state) => ({
    reset: state.reset,
    prediction: state.prediction,
  }));
  const [isEmailOptIn, setIsEmailOptIn] = useState(true);
  const [showResetTab, setShowResetTab] = useState(false);

  useEffect(() => {
    const fetchStartTime = async () => {
      if (!prediction.id) return;
      const startTime = await getPredictionStartTime(prediction.id);
      console.log({ startTime });
      if (startTime) {
        const elapsedTime = Date.now() - new Date(startTime).getTime();
        const remainingTime = Math.max(2 * 60 * 1000 - elapsedTime, 0);

        if (remainingTime > 0) {
          const timer = setTimeout(() => {
            setShowResetTab(true);
          }, remainingTime);

          return () => clearTimeout(timer);
        } else {
          setShowResetTab(true);
        }
      }
    };
    fetchStartTime();
  }, [prediction.id]);

  const handleClick = React.useCallback(() => {
    reset();
  }, [reset]);

  if (!showResetTab) {
    return null;
  }

  return (
    <div className="text-center text-zinc mt-8">
      <Balancer ratio={0.99}>
        <h3 className="text-base text-bold mb-1 uppercase">
          Result taking too long?
        </h3>
        <p className="mx-auto text-sm text-center md:max-w-[80%]">
          Don't worry! Click the button below to reset this page and start
          another round of enhancement! Your image will be processed in the
          background.
        </p>
      </Balancer>
      <div className="mt-6">
        <div className="text-sm flex items-center justify-center">
          <Checkbox
            id="email-opt-in"
            name="email-opt-in"
            color="secondary"
            isSelected={isEmailOptIn}
            aria-activedescendant={undefined}
            onValueChange={() => setIsEmailOptIn((val) => !val)}
          >
            <span className="text-darkzink">
              Receive email update on completion
            </span>
          </Checkbox>
          <Tooltip content="By checking this box, You will recieve an email update with a link to your completed and enhanced image. To change the email address connected to your account, please visit your account page.">
            <span className="ml-2 text-darkzink">
              <AlertOctagon size={16} className="cursor-pointer" />
            </span>
          </Tooltip>
        </div>
        <SecondaryButton onClick={handleClick} className="mt-2">
          Start a new upload
        </SecondaryButton>
      </div>
    </div>
  );
};

export default ResetTab;
