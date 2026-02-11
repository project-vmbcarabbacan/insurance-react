import { useAppSelector } from "../../../app/stores/hooks"
import * as LucideIcons from "lucide-react"

export const LeadDetailActivity: React.FC = () => {

    const leadActivities = useAppSelector(state => state.lead.lead_activities)

    /* ------------------------ Local State ------------------------ */

    const getActivityColor = (type: string) => {
        const normalized = type.toLowerCase()

        if (normalized.includes("won"))
            return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"

        if (normalized.includes("lost"))
            return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"

        if (normalized.includes("follow"))
            return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"

        if (normalized.includes("quote"))
            return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"

        if (normalized.includes("contact"))
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"

        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
    }

    return <div className="space-y-8">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
                Timeline
            </h3>
            {/* <Button size="sm" variant="secondary">
                                    Log Activity
                                </Button> */}
        </div>

        <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-8 pb-4">
            {leadActivities.map((activity, index) => {
                const IconComponent =
                    LucideIcons[activity.icon as keyof typeof LucideIcons]

                return (
                    <div
                        key={index}
                        className="relative pl-8 animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 bg-primary"></div>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${getActivityColor(
                                        activity.type
                                    )}`}
                                >
                                    {IconComponent && <IconComponent className="w-4 h-4" />}
                                </span>

                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {activity.type}
                                </span>
                            </div>

                            <div className="text-left ms-12">
                                {
                                    activity.lead_activity_response &&
                                    (
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Response:</span>{" "}
                                            {activity.lead_activity_response}
                                        </p>
                                    )
                                }


                                {
                                    activity.communication_preference &&
                                    (
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Via:</span>{" "}
                                            {activity.communication_preference}
                                        </p>
                                    )
                                }


                                {activity.notes && (
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium">Notes:</span>{" "}
                                        <span className="italic">
                                            "{activity.notes}"
                                        </span>
                                    </p>
                                )}

                                <p className="text-xs text-gray-400 mt-1">
                                    Performed by {activity.performed_by} at {activity.created_at}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
}