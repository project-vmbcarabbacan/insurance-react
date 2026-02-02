import { Edit, MoreHorizontal, Link, CheckCircle, PauseCircle, Ban, Trash2, SquareAsterisk } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch } from "../../app/stores/hooks";
import { setTeamFormField, setTeamFormPasswordField } from "../../app/stores/slices/teamSlice";
import type { Team, AddTeam } from "../../core/interfaces/Team";
import type { TeamStatuses } from "../../core/types/Status";

export const RowActionMenu: React.FC<{
    row: Team;
    openRowId: string | null;
    setOpenRowId: (uuid: string | null) => void;
    handleAction: (uuid: string, status: TeamStatuses) => void;
    handleMember?: () => void;
    handlePassword?: () => void;
}> = ({ row, openRowId, setOpenRowId, handleAction, handleMember, handlePassword }) => {
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
                    Object.entries(row).forEach(([key, value]) => {
                        const field =
                            key === "role_name" ? "role_slug" : (key as keyof AddTeam);
                        const val =
                            key === "role_name" && typeof value === "string"
                                ? value.toLowerCase().replace(/\s+/g, "_")
                                : String(value);
                        dispatch(setTeamFormField({ field, value: val }));
                    });
                    handleMember?.();
                    setOpenRowId(null);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600"
            >
                <Edit className="w-4 h-4" /> Edit
            </button>

            <button
                onMouseDown={() => {
                    alert(`Assign Product ${row.name}`);
                    setOpenRowId(null);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600"
            >
                <Link className="w-4 h-4 text-blue-500" /> Assign Product
            </button>

            {row.status !== "Active" && (
                <button
                    onMouseDown={() => {
                        handleAction(row.uuid, "active");
                        setOpenRowId(null);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-green-600"
                >
                    <CheckCircle className="w-4 h-4 text-green-500" /> Active
                </button>
            )}

            {row.status !== "Inactive" && (
                <button
                    onMouseDown={() => {
                        handleAction(row.uuid, "inactive");
                        setOpenRowId(null);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600"
                >
                    <PauseCircle className="w-4 h-4 text-gray-500" /> Inactive
                </button>
            )}

            {row.status !== "Suspended" && (
                <button
                    onMouseDown={() => {
                        handleAction(row.uuid, "suspended");
                        setOpenRowId(null);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-yellow-600"
                >
                    <Ban className="w-4 h-4 text-yellow-500" /> Suspend
                </button>
            )}

            {["Inactive", "Suspended"].includes(row.status) && (
                <button
                    onMouseDown={() => {
                        handleAction(row.uuid, "deleted");
                        setOpenRowId(null);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600"
                >
                    <Trash2 className="w-4 h-4 text-red-500" /> Delete
                </button>
            )}

            <button
                onMouseDown={() => {
                    dispatch(
                        setTeamFormPasswordField({
                            field: "uuid",
                            value: row.uuid,
                        })
                    );
                    handlePassword?.();
                    setOpenRowId(null);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600"
            >
                <SquareAsterisk className="w-4 h-4 text-blue-500" /> Update Password
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
