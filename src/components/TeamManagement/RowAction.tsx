import { Edit, Link, CheckCircle, PauseCircle, Ban, Trash2, SquareAsterisk } from "lucide-react";
import { useAppDispatch } from "../../app/stores/hooks";
import { setTeamFormField, setTeamFormPasswordField, TeamAccessed, toggInsuranceProductUuid } from "../../app/stores/slices/teamSlice";
import type { Team } from "../../core/interfaces/Team";
import type { TeamStatuses } from "../../core/types/Status";
import ActionMenu from "../Layout/ui/ActionMenu";

interface RowActionMenuProps {
    row: Team;
    handleAction: (uuid: string, status: TeamStatuses) => void;
    handleMember?: () => void;
    handlePassword?: () => void;
    handleAssignProduct?: () => void;
}

export const RowActionMenu: React.FC<RowActionMenuProps> = ({
    row,
    handleAction,
    handleMember,
    handlePassword,
    handleAssignProduct
}) => {
    const dispatch = useAppDispatch();

    const actions = [
        // Edit Member
        {
            label: "Edit",
            icon: Edit,
            onClick: () => {
                Object.entries(row).forEach(([key, value]) => {
                    const field = key === "role_name" ? "role_slug" : (key as keyof Team);
                    const val =
                        key === "role_name" && typeof value === "string"
                            ? value.toLowerCase().replace(/\s+/g, "_")
                            : String(value);
                    dispatch(setTeamFormField({ field, value: val }));
                });
                handleMember?.();
            },
        },

        // Assign Product (only for Active Agents / Team Leads)
        row.status === "Active" && ["Agent", "Team Lead"].includes(row.role_name) && {
            label: "Assign Product",
            icon: Link,
            onClick: () => {
                dispatch(TeamAccessed(row.uuid));
                dispatch(toggInsuranceProductUuid(row.uuid));
                handleAssignProduct?.();
            },
        },

        // Status actions
        row.status !== "Active" && {
            label: "Active",
            icon: CheckCircle,
            onClick: () => handleAction(row.uuid, "active"),
            color: "green",
        },
        row.status !== "Inactive" && {
            label: "Inactive",
            icon: PauseCircle,
            onClick: () => handleAction(row.uuid, "inactive"),
            color: "gray",
        },
        row.status !== "Suspended" && {
            label: "Suspend",
            icon: Ban,
            onClick: () => handleAction(row.uuid, "suspended"),
            color: "yellow",
        },
        ["Inactive", "Suspended"].includes(row.status) && {
            label: "Delete",
            icon: Trash2,
            onClick: () => handleAction(row.uuid, "deleted"),
            color: "red",
        },

        // Update Password
        {
            label: "Update Password",
            icon: SquareAsterisk,
            onClick: () => {
                dispatch(setTeamFormPasswordField({ field: "uuid", value: row.uuid }));
                handlePassword?.();
            },
        },
    ].filter(Boolean) as any;

    return (
        <ActionMenu
            trigger={({ ref, onClick, ...aria }) => (
                <button
                    ref={ref}
                    onClick={onClick}
                    {...aria}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 12h.01M12 12h.01M18 12h.01"
                        />
                    </svg>
                </button>
            )}
            actions={actions}
        />
    );
};
