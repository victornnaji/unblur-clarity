"use client";

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

const SidebarUpscalingOptionsSeletors = () => {
  const { payload, model, setPayload } = useAppStore((state) => ({
    payload: state.payload,
    model: state.model,
    setPayload: state.setPayload
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

  if (model !== "image_upscaling") {
    return null;
  }

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
      {/* <Selector
        label="Upscaling Style"
        options={imageUpscalingStyleOptions}
        defaultOption={selectedOption}
        name="unblurStyle"
        aria-activedescendant={undefined}
        handleSelect={handleSelectorChange}
        id="unblurStyle"
        tooltipContent={tooltipText.imageUpscalingSelector}
      > */}
        {/* <ExtraInfo
          link="/knowledge-base"
          text="Choose a style for your image upscale."
          linkText="Learn what they mean &#8594;"
        /> */}
      {/* </Selector> */}
    </div>
  );
};

export default SidebarUpscalingOptionsSeletors;
