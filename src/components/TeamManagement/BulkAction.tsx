import { useEffect, useRef } from "react";
import { Button } from "../Layout/ui/Button";
import type { TeamStatuses } from "../../core/types/Status";


export const BulkActionMenu: React.FC<{
    selectedRows: string[]
    open: boolean
    onOpenChange: (open: boolean) => void;
    handleAction: (uuids: string[], status: TeamStatuses) => void;
}> = ({
    selectedRows,
    open,
    onOpenChange,
    handleAction
}) => {
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (ref.current && !ref.current.contains(e.target as Node)) onOpenChange(false);
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        return (
            <div ref={ref} className="relative inline-block">
                <Button onClick={() => onOpenChange(!open)} variant="secondary">
                    Actions ({selectedRows.length})
                </Button>
                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-20">
                        {["active", "inactive", "suspended"].map(status => (
                            <button
                                key={status}
                                onClick={() => handleAction(selectedRows, (status as TeamStatuses))}
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${status === "active"
                                    ? "text-green-700"
                                    : status === "inactive"
                                        ? "text-gray-700 dark:text-gray-200"
                                        : "text-yellow-800"
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };