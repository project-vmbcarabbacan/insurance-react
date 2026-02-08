import React from "react";
import Select from "react-select";
import type { LabelValue } from "../../../domain/entities/LabelValue";

interface PhoneNumberInputProps {
    id: string;
    label: string;
    phoneName: string;
    countryCode: string;
    phoneNumber: string;
    countryOptions: LabelValue[];
    onCountryChange: (value: string) => void;
    onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
    showLabel?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
    id,
    label,
    phoneName,
    countryCode,
    phoneNumber,
    countryOptions,
    onCountryChange,
    onPhoneChange,
    onKeyDown,
    error,
    className = "",
    showLabel = true

}) => {
    // react-select expects { value, label } objects
    const options = countryOptions.map(opt => ({
        value: opt.value,
        label: opt.label,
    }));

    const selectedOption = options.find(opt => opt.value === countryCode) || null;

    return (
        <div className="mb-4">
            {
                showLabel &&
                (
                    <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
                        {label}
                    </label>
                )
            }

            <div className="mt-2 flex shadow-sm">
                {/* Searchable Country Code Select */}
                <div className="w-45">
                    <Select
                        value={selectedOption}
                        options={options}
                        onChange={(option) => {
                            if (option?.value !== undefined) {
                                onCountryChange(String(option.value));
                            }
                        }}
                        isSearchable
                        classNamePrefix="react-select"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                minHeight: "2.5rem",
                                borderRadius: "0.375rem 0 0 0.375rem",
                                borderColor: error ? "#dc2626" : "#6366f1",
                                boxShadow: "none",
                            }),
                            menu: (provided) => ({ ...provided, zIndex: 9999 }),
                        }}
                    />
                </div>

                {/* Phone Number Input */}
                <input
                    id={id}
                    type="tel"
                    name={phoneName}
                    value={phoneNumber}
                    onChange={(e) => {
                        // Remove all non-digit characters
                        const numericValue = e.target.value.replace(/\D/g, "");
                        // Limit to 10 digits
                        const limitedValue = numericValue.slice(0, 10);
                        onPhoneChange({
                            ...e,
                            target: { ...e.target, value: limitedValue },
                        } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    maxLength={10}
                    placeholder="Phone number"
                    pattern="\d*"
                    className={`block w-full rounded-r-md bg-white py-1.5 pl-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6
                        ${error ? "focus:outline-red-600" : "focus:outline-indigo-600"}
                        ${className}
                    `}
                    onKeyDown={onKeyDown}
                />
            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default PhoneNumberInput;
