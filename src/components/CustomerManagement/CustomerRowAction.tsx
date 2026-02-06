import { Edit, Car, HeartPlus, Home, Plane, PawPrint, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch } from "../../app/stores/hooks";
import type { Customer } from "../../core/interfaces/Customer";
import { SelectProducts } from "../../app/stores/selectors/settingSelectors";
import { useSelector } from "react-redux";

export const CustomerRowAction: React.FC<{
    row: Customer;
    openRowId: string | null;
    setOpenRowId: (uuid: string | null) => void;
    handleEdit?: (uuid: string) => void;
    handleAdd?: (uuid: string, product: string) => void;
}> = ({
    row,
    openRowId,
    setOpenRowId,
    handleEdit,
    handleAdd,
}) => {
        const dispatch = useAppDispatch();
        const products = useSelector(SelectProducts);

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
                    top: rect.bottom - 100, // small margin
                    left: rect.right + window.scrollX - 220, // 192px width of dropdown
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
                    <Edit className="w-4 h-4" /> Edit Customer
                </button>

                {/* Products */}
                {
                    products.map(product => {
                        let Icon: React.ElementType;

                        switch (product.value) {
                            case "health":
                                Icon = HeartPlus;
                                break;
                            case "home":
                                Icon = Home;
                                break;
                            case "travel":
                                Icon = Plane;
                                break;
                            case "pet":
                                Icon = PawPrint;
                                break;
                            case "vehicle":
                            default:
                                Icon = Car;
                                break;
                        }

                        return (

                            <button
                                onMouseDown={() => {
                                    handleAdd?.(row.uuid, String(product.value));
                                    setOpenRowId(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600"
                            >
                                {/* HeartPlus, Home, Plane, PawPrint */}
                                <Icon className="w-4 h-4" /> Add {product.label}
                            </button>
                        )
                    })
                }

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
