import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./Button";

export type Column<T> = {
    key: keyof T | string;
    header: string;
    width?: string;
    render?: (value: any, row?: T) => React.ReactNode;
};

export type RowAction<T> = {
    label: string;
    onClick: (row: T) => void;
    variant?: "danger" | "default";
};

type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    rowKey: (row: T) => string | number;
    actions?: RowAction<T>[] | ((row: T) => RowAction<T>[]);
    onSelectionChange?: (selected: T[]) => void;
    selectedRowKeys?: string[] | number[];
    hasCheckBox?: boolean;
};

function ActionMenu<T>({ row, actions }: { row: T; actions: RowAction<T>[] }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-block text-left">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen((prev) => !prev)}
            >
                <MoreHorizontal className="w-4 h-4" />
            </Button>

            {open && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-20">
                    {actions.map((action, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                action.onClick(row);
                                setOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${action.variant === "danger"
                                ? "text-red-600"
                                : "text-gray-700 dark:text-gray-200"
                                }`}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export function DataTable<T extends Record<string, any>>({
    columns,
    data,
    rowKey,
    actions,
    onSelectionChange,
    selectedRowKeys,
    hasCheckBox = false
}: DataTableProps<T>) {
    const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set());

    const selectedSet = selectedRowKeys ? new Set(selectedRowKeys) : internalSelected;

    const toggleRow = (id: string) => {
        const next = new Set(selectedSet);
        next.has(id) ? next.delete(id) : next.add(id);

        if (!selectedRowKeys) setInternalSelected(next);
        onSelectionChange?.(data.filter((row) => next.has(rowKey(row))));
    };

    const toggleAll = () => {
        const all = new Set(data.map(rowKey));
        const next = selectedSet.size === data.length ? new Set() : all;

        if (!selectedRowKeys) setInternalSelected(next);
        onSelectionChange?.(data.filter((row) => next.has(rowKey(row))));
    };

    return (
        // overflow-x-auto
        <div className="">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        {
                            hasCheckBox && (
                                <th className="p-3 w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedSet.size === data.length && data.length > 0}
                                        onChange={toggleAll}
                                        className="form-checkbox h-4 w-4 text-indigo-600"
                                    />
                                </th>
                            )
                        }
                        {columns.map((col) => (
                            <th
                                key={col.key as string}
                                className={`p-3 text-gray-700 dark:text-gray-200 ${col.width || ""}`}
                            >
                                {col.header}
                            </th>
                        ))}
                        {actions && <th className="p-3 w-20 text-gray-700 dark:text-gray-200">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 2} className="text-center p-4 text-gray-500">
                                No data found
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => {
                            const id = rowKey(row);
                            const rowActions = typeof actions === "function" ? actions(row) : actions || [];
                            return (
                                <tr
                                    key={id}
                                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                >
                                    {
                                        hasCheckBox && (
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSet.has(id)}
                                                    onChange={() => toggleRow(id)}
                                                    className="form-checkbox h-4 w-4 text-indigo-600"
                                                />
                                            </td>
                                        )
                                    }
                                    {columns.map((col) => (
                                        <td key={col.key as string} className="p-3 text-gray-800 dark:text-gray-100">
                                            {col.render ? col.render(row[col.key as keyof T], row) : row[col.key as keyof T]}
                                        </td>
                                    ))}
                                    {rowActions.length > 0 && (
                                        <td className="p-3 text-right">
                                            <ActionMenu row={row} actions={rowActions} />
                                        </td>
                                    )}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
