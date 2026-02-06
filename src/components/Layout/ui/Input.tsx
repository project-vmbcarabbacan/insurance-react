import React, { useState } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  error?: string; // validation error
  maxLength?: number;
  prefix?: React.ReactNode; // 👈 NEW
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  className = "",
  maxLength = 150,
  error,
  prefix,
  inputMode,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Determine input type dynamically
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-left text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2 relative">
        {prefix && (
          <span className="absolute inset-y-0 left-2 flex items-center text-gray-500 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={inputType}
          name={name}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          inputMode={inputMode}
          className={`block w-full rounded-md bg-white py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
            ${prefix ? "pl-10" : "px-3"}
            ${error ? "border-red-500 focus:outline-red-600" : ""}
            ${type === "password" ? "pr-10" : ""}
            ${className}`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-left text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputField;
