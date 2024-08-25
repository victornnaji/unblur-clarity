"use client";

import React from "react";
import Selector, { SelectorExtraInfo } from "@/components/UI/Selector";
import { DEFAULT_UNBLUR_OPTION, unblurOptions } from "@/config";
import Uploader from "./Uploader";
import Button from "../Button";
import ImageUpscaling from "./ImageUpscaling";

const UnblurSidebar = () => {
  const [photo, setPhoto] = React.useState(null);
  const [unblurOption, setUnblurOption] = React.useState(DEFAULT_UNBLUR_OPTION);

  const handlePhoto = (photo: any) => {
    setPhoto(photo);
  };

  const handleSelectOptions = (selectedOption: any) => {
    setUnblurOption(selectedOption);
  };

  return (
    <>
      <Uploader handlePhoto={handlePhoto} />
      <Selector
        label="Unblur Type"
        options={unblurOptions}
        defaultOption={unblurOption}
        id="unblurType"
        name="unblurType"
        handleSelect={handleSelectOptions}
        tooltipContent="The type of enhancement you want to apply to your image."
      >
        <SelectorExtraInfo
          link="/unblur-styles"
          text="Choose a style for your enhancement."
          linkText="Learn what they mean &#8594;"
        />
      </Selector>
      <div className="lg:h-80 overflow-scroll mb-5 p-1 box-border">
        {unblurOption && unblurOption.value === "image_upscaling" ? (
          <ImageUpscaling />
        ) : null}
      </div>
      <Button
        disabled={!photo}
        variant="flat"
        className="grid w-full md:w-1/2 md:mx-auto lg:w-full"
      >
        Upscale Image
      </Button>
    </>
  );
};

export default UnblurSidebar;
