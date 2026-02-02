import React from "react";

interface SwitchProps {
    id: string;
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
}

const SwitchField: React.FC<SwitchProps> = ({
    id,
    label,
    name,
    checked,
    onChange,
    error,
    className = "",
}) => {
    const capitalizeEachWord = (value: string) => {
        // Replace underscores with spaces
        value = value.replace(/_/g, ' ');

        // Capitalize the first letter of each word
        return value.replace(/\b\w/g, char => char.toUpperCase());
    }
    return (
        <div className="mb-4">
            {/* <label htmlFor={id} className="block text-sm font-medium text-gray-900">
                {label}
            </label> */}

            <div className="mt-2 flex items-center">
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className={`h-6 w-11 rounded-full bg-gray-200 transition-colors duration-300 ease-in-out
                      ${checked ? "bg-indigo-600" : "bg-gray-200"}
                      ${error ? "border-red-500" : ""}
                      ${className}`}
                />
                <span
                    className={`ml-3 text-sm ${error ? "text-red-600" : "text-gray-900"}`}
                >
                    {capitalizeEachWord(label)}
                </span>
            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default SwitchField;
