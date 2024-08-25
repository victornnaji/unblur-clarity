import React, { forwardRef } from "react";
import { AlertOctagon } from "react-feather";
import { Tooltip } from "./Tooltip";
import clsx from "clsx";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id?: string;
  type: "text" | "password" | "email" | "textarea";
  label: string;
  placeholder: string;
  tooltipContent?: string;
  name: string;
  className?: string;
}

const TextInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      id,
      type,
      placeholder,
      name,
      className,
      label,
      tooltipContent,
      ...delegated
    },
    ref
  ) => {
    const generatedId = React.useId();
    const appliedId = id || generatedId;
    const style = `w-full p-3 rounded-md bg-zinc-800 text-lightblue`;
    return (
      <>
        <label
          htmlFor={appliedId}
          className="mb-2 text-md text-lightblue flex items-center gap-2"
        >
          <span>{label}</span>
          {tooltipContent && (
            <Tooltip content={tooltipContent}>
              <AlertOctagon size={16} className="cursor-pointer" />
            </Tooltip>
          )}
        </label>
        {type === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={appliedId}
            placeholder={placeholder}
            name={name}
            className={clsx(style, className)}
            {...delegated}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={appliedId}
            placeholder={placeholder}
            autoComplete={type}
            name={name}
            type={type}
            autoCapitalize="none"
            autoCorrect="off"
            className={clsx(style, className)}
            {...delegated}
          />
        )}
      </>
    );
  }
);

export default TextInput;
