import React from "react";
import TextInput from "../TextInput";
import Selector, { SelectorExtraInfo } from "../Selector";
import {
  DEFAULT_UPSCALING_STYLE,
  imageUpscalingStyleOptions,
  tooltipText,
} from "@/config";
import { useAppStore } from "@/hooks/use-store";
import { ImageUpscalingStyleOptionType } from "@/types";

const ImageUpscaling = () => {
  const { payload, setPayload } = useAppStore((state) => state);

  const handlePromptChange = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const prompt = e.currentTarget.prompt.value;
      setPayload({ ...payload, prompt });
    },
    []
  );

  const handleSelectorChange = React.useCallback(
    (selectedOption: ImageUpscalingStyleOptionType) => {
      setPayload({ ...payload, upscaleStyle: selectedOption.value });
    },
    []
  );

  const selectedOption =
    imageUpscalingStyleOptions.find(
      (option) => option.value === payload.upscaleStyle
    ) || DEFAULT_UPSCALING_STYLE;

  return (
    <form
      noValidate={true}
      className="mb-4 mt-2 max-w-full box-border"
      onChange={handlePromptChange}
    >
      <TextInput
        type="textarea"
        label="Prompt (optional)"
        placeholder="Prompt"
        name="prompt"
        defaultValue={payload.prompt}
        id="prompt"
        tooltipContent={tooltipText.imageUpscalingInput}
      />
      <Selector
        label="Upscaling Style"
        options={imageUpscalingStyleOptions}
        defaultOption={selectedOption}
        name="unblurStyle"
        handleSelect={handleSelectorChange}
        id="unblurStyle"
        tooltipContent={tooltipText.imageUpscalingSelector}
      >
        <SelectorExtraInfo
          link="/unblur-styles"
          text="Choose a style for your image upscale."
          linkText="Learn what they mean &#8594;"
        />
      </Selector>
    </form>
  );
};

export default ImageUpscaling;
