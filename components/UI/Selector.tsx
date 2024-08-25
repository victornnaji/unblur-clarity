import clsx from "clsx";
import Link from "next/link";
import React, { useId } from "react";
import Select, { StylesConfig } from "react-select";
import { AlertOctagon } from "react-feather";
import { Tooltip } from "@/components/UI/Tooltip";

interface OptionType {
  value: string;
  label: string;
}

interface SelectorProps {
  id: string;
  name: string;
  label: string;
  children: React.ReactNode;
  tooltipContent?: string;
  options: OptionType[];
  defaultOption: OptionType;
  handleSelect: (selectedOption: OptionType) => void;
}

const Selector = ({
  id,
  options,
  defaultOption,
  handleSelect,
  name,
  tooltipContent,
  children,
  label,
}: SelectorProps) => {
  const generated = useId();
  const appliedId = id || generated;

  const customStyles: StylesConfig = {
    singleValue: (styles) => ({
      ...styles,
      color: "#d4d4d8",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#27272a",
      border: "1px solid #d4d4d8",
      padding: "0",
      margin: "0",
    }),
    control: (styles) => ({
      ...styles,
      height: "3.5rem",
      borderRadius: 0,
      border: "1px solid #27272a",
      cursor: "pointer",
      backgroundColor: "#27272a",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#DEEBFF"
        : isFocused
        ? "#DEEBFF"
        : "#27272a",
      color: isSelected || isFocused ? "#27272a" : "#D1D5DB",
      cursor: "pointer",
    }),
  };

  return (
    <div className="block mx-auto mt-8 ">
      <label
        htmlFor={appliedId}
        className="mb-2 text-zinc-300 flex items-center gap-2"
      >
        <span>{label}</span>
        {tooltipContent && (
          <Tooltip content={tooltipContent}>
            <AlertOctagon size={16} className="cursor-pointer" />
          </Tooltip>
        )}
      </label>
      <Select
        key={appliedId}
        instanceId={appliedId}
        inputId={appliedId}
        name={name}
        options={options}
        defaultValue={defaultOption}
        styles={customStyles}
        className={clsx("mb-2 cursor-pointer")}
        onChange={(selectedOption: unknown) => {
          if (selectedOption) {
            handleSelect(selectedOption as OptionType);
          }
        }}
      />
      {children}
    </div>
  );
};

interface SelectorExtraInfoProps {
  text: string;
  link: string;
  linkText: string;
}

export const SelectorExtraInfo = ({
  text,
  link,
  linkText,
}: SelectorExtraInfoProps) => {
  return (
    <span className="mb-6 text-sm text-left text-gray-500 flex flex-col">
      <span>{text}</span>
      <Link
        target="_blank"
        href={link}
        className="inline-block text-blue-600 transition-all hover:underline"
      >
        {linkText}
      </Link>
    </span>
  );
};

export default Selector;
