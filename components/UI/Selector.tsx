"use client";
import clsx from "clsx";
import React, { useId } from "react";
import Select, { StylesConfig } from "react-select";
import { AlertOctagon } from "react-feather";
import { Tooltip } from "@/components/UI/Tooltip";

interface OptionType {
  value: string;
  label: string;
}

interface SelectorProps extends React.HTMLProps<HTMLSelectElement> {
  id: string;
  name: string;
  label: string;
  children?: React.ReactNode;
  tooltipContent?: string;
  options: OptionType[];
  defaultOption: OptionType;
  handleSelect: (selectedOption: any) => void;
}

const Selector = ({
  id,
  options,
  defaultOption,
  handleSelect,
  name,
  tooltipContent,
  children,
  label
}: SelectorProps) => {
  const generated = useId();
  const appliedId = id || generated;

  const customStyles: StylesConfig = {
    singleValue: (styles) => ({
      ...styles,
      color: "var(--zink)"
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "var(--gray)",
      border: "1px solid var(--zink)"
    }),
    control: (styles) => ({
      ...styles,
      height: "3.5rem",
      borderRadius: 0,
      border: "1px solid var(--gray)",
      cursor: "pointer",
      backgroundColor: "var(--gray)"
    }),
    input: (styles) => ({
      ...styles,
      color: "var(--zink)"
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "var(--zink)"
        : isFocused
        ? "var(--zink)"
        : "var(--gray)",
      color: isSelected || isFocused ? "var(--gray)" : "var(--zink)",
      cursor: "pointer"
    })
  };

  return (
    <div className="block mx-auto mt-8 ">
      <label
        htmlFor={appliedId}
        className="mb-2 text-zink flex items-center gap-2"
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
        value={defaultOption}
        styles={customStyles}
        className={clsx("mb-2 cursor-pointer")}
        aria-activedescendant={defaultOption.value}
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

export default React.memo(Selector);
