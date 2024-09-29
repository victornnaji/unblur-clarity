import React from "react";
import Ghost from "@/components/Icons/GhostIcon";
import { useAppStore } from "@/hooks/use-store";
import { Button } from "./Button/Button";
import { RefreshCcw } from "react-feather";

const ErrorScreen = () => {
  const { appStatus, reset } = useAppStore((state) => ({
    appStatus: state.appStatus,
    reset: state.reset
  }));
  return (
    <div className="text-center grid place-items-center h-full">
      <div className="flex flex-col items-center justify-center">
        <Ghost />
        <h5 className="mt-12 text-md text-bold text-error">Error!</h5>
        <p className="text-sm">{appStatus.message} </p>
        <div className="mt-4">
          <Button
            variant="solid"
            onClick={reset}
            className="flex items-center justify-center p-2 rounded-md border"
          >
            <RefreshCcw size={18} />
            <span className="pr-2">Try Again</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
