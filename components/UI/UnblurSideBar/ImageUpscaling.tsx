import React from "react";
import TextInput from "../TextInput";
import Selector, { SelectorExtraInfo } from "../Selector";
import { DEFAULT_UPSCALING_STYLE, imageUpscalingStyleOptions } from "@/config";

const ImageUpscaling = () => {
  const [prompt, setPrompt] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrompt(e.currentTarget.prompt.value);
  };
  return (
    <form
      noValidate={true}
      className="mb-4 mt-2 max-w-full box-border"
      onSubmit={handleSubmit}
    >
      <TextInput
        type="textarea"
        label="Prompt (optional)"
        placeholder="Prompt"
        name="prompt"
        tooltipContent="Add a prompt or leave empty to use system prompt. Make sure to add a prompt that is relevant to the image you are upscaling."
      />
      <Selector
        label="Upscaling Style"
        options={imageUpscalingStyleOptions}
        defaultOption={DEFAULT_UPSCALING_STYLE}
        name="unblurStyle"
        handleSelect={() => {}}
        id="unblurStyle"
        tooltipContent="Add a style to change the way your image is upscaled. Leave default to match the original image style as close as possible."
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
