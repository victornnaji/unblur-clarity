import React from "react";
import Ghost from "@/components/Icons/GhostIcon";
import { useAppStore } from "@/hooks/use-store";
import { Button } from "./Button/Button";
import { DollarSign } from "react-feather";
import { links } from "@/config";

const ErrorScreen = () => {
  const { appStatus } = useAppStore((state) => ({
    appStatus: state.appStatus,
    reset: state.reset
  }));

  return (
    <div className="text-center grid place-items-center h-full">
      <div className="flex flex-col items-center justify-center">
        <div className="w-1/2">
          <Ghost />
        </div>
        <h5 className="mt-12 text-md text-bold text-error">
          An error occurred!
        </h5>
        <p className="text-sm">{appStatus.message} </p>
        {appStatus.type === "credit" && (
          <div className="mt-4">
            <Button
              variant="solid"
              href={links.products.path}
              className="flex items-center justify-center"
            >
              <DollarSign size={18} />
              <span className="pr-2">Buy Credits</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorScreen;
