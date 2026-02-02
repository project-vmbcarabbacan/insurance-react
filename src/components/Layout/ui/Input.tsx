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
  error,
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
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          id={id}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${error ? "border-red-500 focus:outline-red-600" : ""
            } ${type === "password" ? "pr-10" : ""} ${className}`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              // Eye-off icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 3.172a.75.75 0 011.06 0L17 15l-1.06 1.06-1.507-1.507A8.963 8.963 0 0110 18c-4.97 0-9-4-9-9a8.963 8.963 0 013.172-6.828zM10 16a6 6 0 005.657-4H4.343A6 6 0 0010 16zm0-10a6 6 0 00-5.657 4h11.314A6 6 0 0010 6z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // Eye icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 3C5 3 1.73 7.11 1.73 10c0 2.89 3.27 7 8.27 7s8.27-4.11 8.27-7c0-2.89-3.27-7-8.27-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
