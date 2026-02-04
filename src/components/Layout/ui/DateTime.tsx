import React from "react";

interface DateTimeInputProps {
    id: string;
    label: string;
    name: string;
    value: string; // Format: YYYY-MM-DDTHH:MM
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    className?: string;
    min?: string; // Optional minimum datetime
    max?: string; // Optional maximum datetime
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
    id,
    label,
    name,
    value,
    onChange,
    error,
    placeholder = "Select date & time",
    className = "",
    min,
    max,
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>

            <input
                type="datetime-local"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                max={max}
                className={`mt-2 w-full rounded-md border bg-white py-1.5 px-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6
                    ${error ? "border-red-500 focus:outline-red-600" : "focus:outline-indigo-600"}
                    ${className}`}
            />

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default DateTimeInput;
