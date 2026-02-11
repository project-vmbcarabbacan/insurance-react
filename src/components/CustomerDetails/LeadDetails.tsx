import React from 'react';
import { CalendarClock, MoreVertical, Eye, Pencil, ClipboardList } from 'lucide-react';
import ActionMenu from '../Layout/ui/ActionMenu';
import type { LeadDetail } from '../../core/interfaces/Lead';
import { statusColors } from '../../core/utils/leadStatusColor';

interface LeadDetailsProps {
    leads: LeadDetail[] | null;
    onView?: (lead: LeadDetail) => void;
    onEdit?: (lead: LeadDetail) => void;
    onActivity: (lead: LeadDetail) => void;
    onRowClick: (lead: LeadDetail) => void;
}

const formatStatus = (status: string) =>
    status
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());

/* ---------------- Component ---------------- */

const LeadDetails: React.FC<LeadDetailsProps> = ({
    leads,
    onView,
    onEdit,
    onActivity,
    onRowClick,
}) => {
    if (!leads) return null;

    if (leads.length === 0) {
        return <p className="text-sm text-gray-500">No leads available</p>;
    }


    return (
        <ul className="space-y-3">
            {leads.map((lead) => (
                <li
                    key={lead.uuid}
                    className="flex items-start justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900 cursor-pointer"
                    onClick={() => onRowClick(lead)}
                >
                    {/* Left */}
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {lead.lead_details}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <CalendarClock className="w-4 h-4" />
                            <span>{lead.due_date}</span>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2">
                        {/* Status */}
                        <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[lead.status] ??
                                'bg-gray-100 text-gray-600'
                                }`}
                        >
                            {formatStatus(lead.status)}
                        </span>

                        {/* Actions */}
                        <ActionMenu
                            trigger={({ ref, onClick, ...aria }) => (
                                <button
                                    ref={ref}
                                    onClick={onClick}
                                    {...aria}
                                    className="p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            )}
                            actions={[
                                onView && {
                                    label: 'View',
                                    icon: Eye,
                                    onClick: () => onView(lead),
                                },
                                onEdit && {
                                    label: 'Edit',
                                    icon: Pencil,
                                    onClick: () => onEdit(lead),
                                },
                                onEdit && {
                                    label: 'Activity',
                                    icon: ClipboardList,
                                    onClick: () => onActivity(lead),
                                },
                            ].filter(Boolean) as any}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default LeadDetails;
