import { Edit, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch } from "../../app/stores/hooks";
import type { Customer } from "../../core/interfaces/Customer";

export const CustomerRowAction: React.FC<{
    row: Customer;
    openRowId: string | null;
    setOpenRowId: (uuid: string | null) => void;
    handleEdit?: (uuid: string) => void;
}> = ({
    row,
    openRowId,
    setOpenRowId,
    handleEdit,
}) => {
        const dispatch = useAppDispatch();
        const ref = useRef<HTMLButtonElement>(null);
        const isOpen = openRowId === row.uuid;

        const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

        // Close menu on outside click
        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (ref.current && !ref.current.contains(e.target as Node)) {
                    setOpenRowId(null);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [setOpenRowId]);

        // Calculate position when menu opens
        useEffect(() => {
            if (isOpen && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setPosition({
                    top: rect.bottom + window.scrollY + 4, // small margin
                    left: rect.right + window.scrollX - 192, // 192px width of dropdown
                });
            }
        }, [isOpen]);

        // Render dropdown via portal
        const dropdown = isOpen ? createPortal(
            <div
                style={{ top: position.top, left: position.left }}
                className="fixed w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onMouseDown={() => {
                        handleEdit?.(row.uuid);
                        setOpenRowId(null);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600"
                >
                    <Edit className="w-4 h-4" /> Edit
                </button>

            </div>,
            document.body
        ) : null;

        return (
            <div className="relative text-right">
                <button
                    ref={ref}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenRowId(isOpen ? null : row.uuid);
                    }}
                >
                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>
                {dropdown}
            </div>
        );
    };
