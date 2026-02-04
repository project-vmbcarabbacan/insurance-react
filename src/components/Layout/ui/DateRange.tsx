import React from "react";

interface DateRangeInputProps {
    id: string;
    label: string;
    startName: string;
    endName: string;
    startValue: string; // YYYY-MM-DD
    endValue: string;   // YYYY-MM-DD
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholderStart?: string;
    placeholderEnd?: string;
    className?: string;
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
    id,
    label,
    startName,
    endName,
    startValue,
    endValue,
    onChange,
    error,
    placeholderStart = "Start date",
    placeholderEnd = "End date",
    className = "",
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>

            <div className={`mt-2 grid grid-cols-2 gap-2 ${className}`}>
                {/* Start Date */}
                <input
                    type="date"
                    name={startName}
                    value={startValue}
                    onChange={onChange}
                    placeholder={placeholderStart}
                    max={endValue || undefined} // Start date cannot be after end date
                    className={`rounded-md border bg-white py-1.5 px-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6
                      ${error ? "border-red-500 focus:outline-red-600" : "focus:outline-indigo-600"}`}
                />

                {/* End Date */}
                <input
                    type="date"
                    name={endName}
                    value={endValue}
                    onChange={onChange}
                    placeholder={placeholderEnd}
                    min={startValue || undefined} // End date cannot be before start date
                    className={`rounded-md border bg-white py-1.5 px-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6
                      ${error ? "border-red-500 focus:outline-red-600" : "focus:outline-indigo-600"}`}
                />
            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default DateRangeInput;
