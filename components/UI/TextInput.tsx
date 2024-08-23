import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type: "text" | "password" | "email";
  label: string;
  placeholder: string;
  name: string;
  className?: string;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, placeholder, name, className, label, ...delegated }, ref) => {
    const generatedId = React.useId();
    const appliedId = id || generatedId;
    return (
      <>
        <label htmlFor={appliedId} className="mb-2 block text-md text-zinc-500">
          {label}
        </label>
        <input
          ref={ref}
          id={appliedId}
          placeholder={placeholder}
          autoComplete={type}
          name={name}
          type={type}
          autoCapitalize="none"
          autoCorrect="off"
          className="w-full p-3 rounded-md bg-zinc-800"
          {...delegated}
        />
      </>
    );
  }
);

export default TextInput;
