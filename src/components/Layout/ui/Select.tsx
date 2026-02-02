import React from "react";
import type { LabelValue } from "../../../domain/entities/LabelValue";

interface SelectFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  options: LabelValue[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  name,
  value,
  options,
  onChange,
  error,
  placeholder = "Select option",
  className = "",
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>

      <div className="mt-2 grid grid-cols-1">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6
                        ${error
              ? "border-red-500 focus:outline-red-600"
              : "focus:outline-indigo-600"
            }
                        ${className}
                    `}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Icon */}
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        >
          <path
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SelectField;
