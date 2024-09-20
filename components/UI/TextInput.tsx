import React from "react";
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
  classNames?: {
    label?: string;
    input?: string;
  };
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const TextInput: React.FC<InputProps> = ({
  id,
  type,
  placeholder,
  name,
  className,
  classNames,
  label,
  value,
  defaultValue,
  onChange,
  tooltipContent,
  ...delegated
}) => {
  const generatedId = React.useId();
  const appliedId = id || generatedId;
  const style = `w-full p-3 rounded-md bg-gray`;
  const isControlled = value !== undefined;
  const textareaProps = isControlled ? { value, onChange } : { defaultValue };
  return (
    <>
      <label
        htmlFor={appliedId}
        className={clsx("mb-2 text-md text-zink flex items-center gap-2", classNames?.label)}
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
          id={appliedId}
          placeholder={placeholder}
          name={name}
          className={clsx(style, className, classNames?.input)}
          {...textareaProps}
          {...delegated}
        />
      ) : (
        <input
          id={appliedId}
          placeholder={placeholder}
          autoComplete={type}
          name={name}
          type={type}
          autoCapitalize="none"
          autoCorrect="off"
          className={clsx(style, className, classNames?.input)}
          {...(isControlled ? { value, onChange } : {})}
          {...delegated}
        />
      )}
    </>
  );
};

export default React.memo(TextInput);
