export const renderValue = (value: any) => {
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return String(value);
};

export const formatLabel = (key: string) =>
    key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());