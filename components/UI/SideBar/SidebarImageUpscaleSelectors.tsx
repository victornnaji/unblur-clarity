'use client';

import React from "react";
import TextInput from "../TextInput";
import Selector from "../Selector";
import {
  DEFAULT_UPSCALING_STYLE,
  imageUpscalingStyleOptions,
  tooltipText
} from "@/config";
import { useAppStore } from "@/hooks/use-store";
import { ImageUpscalingStyleOptionType } from "@/types";
import ExtraInfo from "../ExtraInfo";

const SidebarUpscalingOptionsSeletors = () => {
  const { payload, setPayload } = useAppStore((state) => ({
    payload: state.payload,
    setPayload: state.setPayload,
  }));

  const handlePromptChange = React.useCallback(
    (prompt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const promptValue = prompt.currentTarget.value;
      setPayload({ ...payload, prompt: promptValue });
    },
    [payload]
  );

  const handleSelectorChange = React.useCallback(
    (selectedOption: ImageUpscalingStyleOptionType) => {
      setPayload({ ...payload, upscaleStyle: selectedOption.value });
    },
    [payload]
  );

  const selectedOption =
    imageUpscalingStyleOptions.find(
      (option) => option.value === payload.upscaleStyle
    ) || DEFAULT_UPSCALING_STYLE;

  return (
    <div className="mb-4 mt-2 max-w-full box-border">
      <TextInput
        type="textarea"
        label="Prompt (optional)"
        placeholder="Prompt"
        name="prompt"
        id="prompt"
        key="prompt"
        value={payload.prompt}
        aria-activedescendant={undefined}
        onChange={handlePromptChange}
        tooltipContent={tooltipText.imageUpscalingInput}
      />
      <Selector
        label="Upscaling Style"
        options={imageUpscalingStyleOptions}
        defaultOption={selectedOption}
        name="unblurStyle"
        aria-activedescendant={undefined}
        handleSelect={handleSelectorChange}
        id="unblurStyle"
        tooltipContent={tooltipText.imageUpscalingSelector}
      >
        <ExtraInfo
          link="/unblur-styles"
          text="Choose a style for your image upscale."
          linkText="Learn what they mean &#8594;"
        />
      </Selector>
    </div>
  );
};

export default SidebarUpscalingOptionsSeletors;
