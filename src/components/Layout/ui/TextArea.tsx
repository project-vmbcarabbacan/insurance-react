import React from "react";

interface TextAreaFieldProps {
    id: string;
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
    error?: string;
    maxLength?: number;
    rows?: number;
    prefix?: React.ReactNode;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
    id,
    label,
    name,
    value,
    onChange,
    placeholder = "",
    className = "",
    maxLength = 500,
    rows = 4,
    error,
    prefix,
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-left text-sm/6 font-medium text-gray-900"
            >
                {label}
            </label>

            <div className="mt-2 relative">
                {prefix && (
                    <span className="absolute top-3 left-2 text-gray-500 text-sm pointer-events-none">
                        {prefix}
                    </span>
                )}

                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    rows={rows}
                    className={`block w-full rounded-md bg-white py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 resize-none
            ${prefix ? "pl-10 pr-3" : "px-3"}
            ${error ? "border-red-500 focus:outline-red-600" : ""}
            ${className}`}
                />
            </div>

            {error && (
                <p className="mt-1 text-left text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default TextAreaField;
