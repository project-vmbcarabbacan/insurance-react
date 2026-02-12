import { useAppDispatch, useAppSelector } from "../../../app/stores/hooks"
import * as LucideIcons from "lucide-react"
import type { AuditFieldValue, AuditForm } from "../../../core/interfaces/Audit"
import { Pagination } from "../../Layout/ui/Pagination"
import { useCallback } from "react"
import { getAudits } from "../../../app/stores/slices/auditSlice"

interface LeadAuditsProp {
    lead_uuid: string;
}

export const LeadAudits: React.FC<LeadAuditsProp> = ({
    lead_uuid
}) => {
    const audits = useAppSelector(
        (state) => state.audit.audits
    )
    const { current_page, last_page } = useAppSelector(state => state.audit);
    const dispatch = useAppDispatch();


    /* ------------------------ Helpers ------------------------ */

    const formatActionLabel = (action: string) => {
        return action
            .replaceAll("_", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())
    }

    const handlePageChange = useCallback((page: number) => {
        dispatch(getAudits({
            page: page,
            morph: 'lead',
            uuid: lead_uuid
        } as AuditForm))

        const element = document.getElementById("lead-detail-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }


    }, [dispatch, lead_uuid]);

    const getActionIcon = (action: string) => {
        if (action.includes("created")) return LucideIcons.PlusCircle
        if (action.includes("assigned")) return LucideIcons.UserPlus
        if (action.includes("status")) return LucideIcons.RefreshCcw
        if (action.includes("document")) return LucideIcons.FileText
        if (action.includes("updated")) return LucideIcons.Edit
        return LucideIcons.Activity
    }

    const getActivityColor = (action: string) => {
        if (action.includes("created"))
            return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"

        if (action.includes("status"))
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"

        if (action.includes("document"))
            return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"

        if (action.includes("assigned"))
            return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"

        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
    }

    const renderValueChanges = (
        oldValues: AuditFieldValue[] | null,
        newValues: AuditFieldValue[] | null
    ) => {
        if (!newValues || newValues.length === 0) return null

        const oldValueMap = oldValues?.reduce<Record<string, any>>((acc, item) => {
            acc[item.field] = item.value
            return acc
        }, {}) ?? {}

        const capitalizeWords = (str: string) =>
            str
                .replaceAll("_", " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")

        // Helper to format values
        const formatValue = (val: any): string => {
            if (val === null || val === undefined) return "-"
            if (Array.isArray(val)) return val.join(", ")
            if (typeof val === "object") return JSON.stringify(val)
            return String(val)
        }

        // Render health_members nicely
        const renderHealthMembers = (members: any[]) => {
            return members.map((member, index) => (
                <div
                    key={index}
                    className="ml-4 mb-4 p-2 border-l-2 border-gray-300"
                >
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                        Member {index + 1}
                    </p>
                    {Object.entries(member).map(([k, v]) => (
                        <p key={k} className="text-sm text-gray-500">
                            <span className="font-medium">{capitalizeWords(k)}:</span>{" "}
                            {v ?? "-"}
                        </p>
                    ))}
                </div>
            ));
        };

        return newValues
            .filter((item) => item.field !== "uuid" && item.field !== "lead_id")
            .map((item) => {
                const oldVal = oldValueMap[item.field]
                const newVal = item.value

                if (item.field === "members" && Array.isArray(newVal)) {
                    return (
                        <div key={item.field}>
                            <p className="font-medium">Members:</p>
                            {renderHealthMembers(newVal)}
                        </div>
                    )
                }

                return (
                    <p key={item.field} className="text-sm text-gray-500">
                        <span className="font-medium">{capitalizeWords(item.field)}:</span>{" "}
                        {oldVal !== undefined && oldVal !== null && formatValue(oldVal) !== formatValue(newVal) && (
                            <>
                                <span className="line-through text-gray-400 mr-1">{formatValue(oldVal)}</span>{" "}
                                →{" "}
                            </>
                        )}
                        <span>{formatValue(newVal)}</span>
                    </p>
                )
            })
    }

    /* ------------------------ Render ------------------------ */

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    Timeline
                </h3>
            </div>

            <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-8 pb-4">
                {audits.map((activity: any) => {
                    const IconComponent = getActionIcon(activity.action)

                    return (
                        <div
                            key={activity.id}
                            className="relative pl-8 animate-in fade-in slide-in-from-bottom-2 duration-300"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 bg-primary"></div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${getActivityColor(
                                            activity.action
                                        )}`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                    </span>

                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {formatActionLabel(activity.action)}
                                    </span>
                                </div>

                                <div className="text-left ms-12">
                                    {renderValueChanges(
                                        activity.old_values,
                                        activity.new_values
                                    )}

                                    <p className="text-xs text-gray-400 mt-1">
                                        Actioned By {activity.actioned_by} •{" "}
                                        {activity.created_at}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Pagination
                currentPage={current_page}
                totalPages={last_page}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
