"use client";

import React from "react";
import Selector from "@/components/UI/Selector";
import { DEFAULT_UNBLUR_OPTION, tooltipText, unblurOptions } from "@/config";
import { useAppStore } from "@/hooks/use-store";
import { UnblurOptionType } from "@/types";
import ExtraInfo from "../ExtraInfo";

const SidebarModelSelector = () => {
  const { model, setModel, payload } = useAppStore((state) => state);

  const handleSelectOptions = React.useCallback(
    (selectedOption: UnblurOptionType) => {
      setModel(selectedOption.value);
    },
    []
  );

  const selectedOption =
    unblurOptions.find((option) => option.value === model) ||
    DEFAULT_UNBLUR_OPTION;

  return (
    <Selector
      label="Unblur Type"
      options={unblurOptions}
      defaultOption={selectedOption}
      id="unblurType"
      name="unblurType"
      aria-activedescendant={undefined}
      handleSelect={handleSelectOptions}
      tooltipContent={tooltipText.modelSelector}
    >
      <ExtraInfo
        link="/unblur-styles"
        text="Choose a style for your enhancement."
        linkText="Learn what they mean &#8594;"
      />
    </Selector>
  );
};

export default SidebarModelSelector;
