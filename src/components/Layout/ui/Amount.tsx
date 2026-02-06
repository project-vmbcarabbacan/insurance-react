import React from "react";
import InputField from "./Input";

const MAX_AMOUNT = 999_999_999.99;

interface AmountInputProps {
    id: string;
    label: string;
    name: string;
    value: string;              // 👈 raw value (NO commas)
    onChange: (value: string) => void; // 👈 raw value
    error?: string;
    currency?: string;
}

const formatWithCommas = (value: string) => {
    if (!value) return "";

    const [integer, decimal] = value.split(".");

    const formattedInteger = integer.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
    );

    return decimal !== undefined
        ? `${formattedInteger}.${decimal}`
        : formattedInteger;
};

const sanitizeInput = (value: string) => {
    // Remove everything except digits and dot
    let cleaned = value.replace(/[^0-9.]/g, "");

    // Allow only ONE dot
    const dotIndex = cleaned.indexOf(".");
    if (dotIndex !== -1) {
        cleaned =
            cleaned.slice(0, dotIndex + 1) +
            cleaned.slice(dotIndex + 1).replace(/\./g, "");
    }

    let [integer, decimal] = cleaned.split(".");

    // Limit decimals to 2
    if (decimal !== undefined) {
        decimal = decimal.slice(0, 2);
    }

    // Remove leading zeros (keep single zero)
    integer = integer.replace(/^0+(?=\d)/, "");

    return decimal !== undefined ? `${integer}.${decimal}` : integer;
};

const AmountInput: React.FC<AmountInputProps> = ({
    id,
    label,
    name,
    value,
    onChange,
    error,
    currency = "$",
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = sanitizeInput(e.target.value);
        const numeric = Number(raw || 0);

        if (numeric > MAX_AMOUNT) return;

        // 🔥 IMPORTANT: send RAW value (NO commas)
        onChange(raw);
    };

    return (
        <InputField
            id={id}
            label={label}
            name={name}
            value={formatWithCommas(value)} // 👈 formatted ONLY for display
            onChange={handleChange}
            placeholder="0.00"
            error={error}
            maxLength={15}
            inputMode="decimal"
            prefix={currency}
            className="text-left"
        />
    );
};

export default AmountInput;
