import React from "react";
import { Download, AlertCircle, RefreshCcw } from "react-feather";
import { SecondaryButton } from "../Button/Button";
import { clsx } from "clsx";
import { downloadPhoto } from "@/utils/helpers";
import { useAppStore } from "@/hooks/use-store";

const PreviewContainerFooter = () => {
  const { photo, reset } = useAppStore((state) => ({
    photo: state.photo,
    reset: state.reset,
  }));

  const buttons = [
    {
      label: "Download",
      onClick: () => {
        downloadPhoto(photo.restoredImage, photo.name);
      },
      variant: "solid",
      icon: Download,
      className: "mb-3 lg:mb-0 border-gray",
    },
    // {
    //   label: "Report",
    //   onClick: () => {},
    //   icon: AlertCircle,
    //   variant: "ghost",
    //   className:
    //     "md:ml-3 mb-3 lg:mb-0 bg-gray text-zink hover:bg-default-100 hover:text-gray",
    // },
    {
      label: "Reset",
      onClick: reset,
      icon: RefreshCcw,
      variant: "ghost",
      className:
        "md:ml-3 bg-gray text-zink hover:bg-default-100 hover:text-gray",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row text-xs mt-4 lg:mt-0">
      {buttons.map((button, index) => {
        const Icon = button.icon;
        return (
          <SecondaryButton
            key={index}
            variant={button.variant as any}
            onClick={button.onClick}
            className={clsx(
              "flex items-center justify-center rounded-md border lg:min-w-8 lg:h-8",
              button.className
            )}
          >
            <Icon size={20} />
            <span className="block lg:hidden pr-2">{button.label}</span>
          </SecondaryButton>
        );
      })}
    </div>
  );
};

export default PreviewContainerFooter;
