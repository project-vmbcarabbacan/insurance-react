import React from 'react';
import { CalendarClock, MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react';
import ActionMenu from '../Layout/ui/ActionMenu';
import type { LeadDetail } from '../../core/interfaces/Lead';

interface LeadDetailsProps {
    leads: LeadDetail[] | null;
    onView?: (lead: LeadDetail) => void;
    onEdit?: (lead: LeadDetail) => void;
    onDelete?: (lead: LeadDetail) => void;
}

/* ---------------- Status helpers ---------------- */

const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-indigo-100 text-indigo-700',
    unresponsive: 'bg-gray-100 text-gray-600',
    qualified: 'bg-purple-100 text-purple-700',
    quoted: 'bg-cyan-100 text-cyan-700',
    negotiating: 'bg-amber-100 text-amber-700',
    pending_payment: 'bg-yellow-100 text-yellow-700',
    converted: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
    invalid: 'bg-zinc-100 text-zinc-600',
};

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
    onDelete,
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
                    className="flex items-start justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900"
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
                                onDelete && {
                                    label: 'Delete',
                                    icon: Trash2,
                                    danger: true,
                                    onClick: () => onDelete(lead),
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
