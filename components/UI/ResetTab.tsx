"use client";

import React, { useState, useEffect, useRef } from "react";
import { Checkbox } from "@nextui-org/react";
import Balancer from "react-wrap-balancer";
import { Button } from "./Button/Button";
import { Tooltip } from "./Tooltip";
import { useAppStore } from "@/hooks/use-store";
import { getPredictionStartTime } from "@/utils/api-helpers/server";
import { AlertOctagon } from "react-feather";

const ResetTab = () => {
  const { reset, prediction } = useAppStore((state) => ({
    reset: state.reset,
    prediction: state.prediction
  }));
  const [isEmailOptIn, setIsEmailOptIn] = useState(true);
  const [showResetTab, setShowResetTab] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchStartTime = async () => {
      if (!prediction.id) return;
      const startTime = await getPredictionStartTime(prediction.id);
      if (startTime) {
        const checkElapsedTime = () => {
          const elapsedTime = Date.now() - new Date(startTime).getTime();
          const twoMinutes = 2 * 60 * 1000;

          if (elapsedTime >= twoMinutes) {
            setShowResetTab(true);
          } else {
            if (timeoutRef.current !== null) {
              clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = window.setTimeout(checkElapsedTime, 10000);
          }
        };
        checkElapsedTime();
      }
    };
    fetchStartTime();
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
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
        <p className="mx-auto text-sm text-center md:max-w-4/5">
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
        <Button onClick={handleClick} className="mt-2">
          Start a new upload
        </Button>
      </div>
    </div>
  );
};

export default ResetTab;
