import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    CalendarClock,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
} from 'lucide-react';

export interface Lead {
    uuid: string;
    lead_details: string;
    due_date: string;
    status: 'new' | 'in_progress' | 'closed' | string;
}

interface LeadsCardProps {
    leads: Lead[] | null;
    onView?: (lead: Lead) => void;
    onEdit?: (lead: Lead) => void;
    onDelete?: (lead: Lead) => void;
}

const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-yellow-100 text-yellow-700',
    closed: 'bg-green-100 text-green-700',
};

const LeadDetails: React.FC<LeadsCardProps> = ({
    leads,
    onView,
    onEdit,
    onDelete,
}) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    if (!leads) return null;

    const toggleMenu = (id: string) => {
        if (openMenuId === id) {
            setOpenMenuId(null);
        } else {
            const btn = buttonRefs.current[id];
            if (btn) {
                const rect = btn.getBoundingClientRect();
                setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
            }
            setOpenMenuId(id);
        }
    };

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('[data-portal-menu]')) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            {leads.length === 0 ? (
                <p className="text-sm text-gray-500">No leads available</p>
            ) : (
                <ul className="space-y-3">
                    {leads.map((lead) => (
                        <li
                            key={lead.uuid}
                            className="relative flex items-start justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900"
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
                            <div className="flex items-start gap-2">
                                {/* Status */}
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[lead.status] ??
                                        'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {lead.status}
                                </span>

                                {/* Kebab menu */}
                                <div className="relative">
                                    <button
                                        ref={(el) => (buttonRefs.current[lead.uuid] = el)}
                                        onClick={() => toggleMenu(lead.uuid)}
                                        className="p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        aria-label="Actions"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>

                                    {openMenuId === lead.uuid &&
                                        ReactDOM.createPortal(
                                            <div
                                                data-portal-menu
                                                style={{
                                                    position: 'absolute',
                                                    top: menuPosition.top - 50,
                                                    left: menuPosition.left - 150,
                                                    zIndex: 9999,
                                                }}
                                                className="w-36 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg"
                                            >
                                                {onView && (
                                                    <button
                                                        onClick={() => {
                                                            onView(lead);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        View
                                                    </button>
                                                )}

                                                {onEdit && (
                                                    <button
                                                        onClick={() => {
                                                            onEdit(lead);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                )}

                                                {onDelete && (
                                                    <button
                                                        onClick={() => {
                                                            onDelete(lead);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </button>
                                                )}
                                            </div>,
                                            document.body
                                        )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default LeadDetails;
