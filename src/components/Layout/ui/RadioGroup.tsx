import React from "react";
import type { LabelValue } from "../../../domain/entities/LabelValue";


interface RadioGroupInputProps {
    id: string;
    label: string;
    name: string;
    value: string;
    options: LabelValue[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
    inline?: boolean; // display radios horizontally
    disabled?: boolean;
}

const RadioGroupInput: React.FC<RadioGroupInputProps> = ({
    id,
    label,
    name,
    value,
    options,
    onChange,
    error,
    className = "",
    inline = false,
    disabled = false,
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-left text-sm/6 font-medium text-gray-900">{label}</label>

            <div className={`mt-2 ${inline ? "flex gap-4" : "flex flex-col gap-2"}`}>
                {options.map((option) => (
                    <label key={option.value} className="inline-flex items-center">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                            disabled={disabled}
                            className={`h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ${error ? "border-red-500" : ""
                                }`}
                        />
                        <span className="ml-2 text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>

            {error && <p className="mt-1 text-left text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default RadioGroupInput;
