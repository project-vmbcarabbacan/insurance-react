import { BadgeCheck, Ban, Edit } from "lucide-react";
import ActionMenu from "../../Layout/ui/ActionMenu";
import type { PlanResponse } from "../../../core/interfaces/Plan";

interface PlanRowActionProps {
    row: PlanResponse;
    handleEdit: (uuid: string) => void;
    handleStatus: (uuid: string, status: string) => void;
}

export const PlanRowAction: React.FC<PlanRowActionProps> = ({
    row,
    handleEdit,
    handleStatus
}) => {

    const actions = [
        handleEdit && {
            label: "Edit",
            icon: Edit,
            onClick: () => handleEdit(row.uuid),
        },

        row.status === 'Active' && {
            label: 'Inactivate',
            icon: Ban,
            onClick: () => handleStatus(row.uuid, 'inactive'),
        },

        row.status === 'Inactive' && {
            label: 'Activate',
            icon: BadgeCheck,
            onClick: () => handleStatus(row.uuid, 'active')
        }

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
