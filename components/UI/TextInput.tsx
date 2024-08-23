import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type: "text" | "password" | "email";
  label: string;
  placeholder: string;
  name?: string;
  className?: string;
}

const TextInput = ({
  id,
  type,
  placeholder,
  name,
  className,
  label,
  ...delegated
}: InputProps) => {
  const generatedId = React.useId();
  const appliedId = id || generatedId;
  return (
    <>
      <label htmlFor={appliedId} className="mb-2 block text-md text-zinc-500">
        {label}
      </label>
      <input
        id={appliedId}
        placeholder={placeholder}
        autoComplete={type}
        type={type}
        autoCapitalize="none"
        autoCorrect="off"
        className="w-full p-3 rounded-md bg-zinc-800"
        {...delegated}
      />
    </>
  );
};

export default TextInput;
