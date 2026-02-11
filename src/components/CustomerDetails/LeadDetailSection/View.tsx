import React from "react";
import type { ViewField } from "../../../core/interfaces/LeadViewConfig";
import { formatLabel, renderValue } from "../../../core/utils/leadView";
import type { LeadResponse } from "../../../core/interfaces/LeadViewResponse";
import { useAppSelector } from "../../../app/stores/hooks";
import { statusColors } from "../../../core/utils/leadStatusColor";

const SectionHeader = ({ title }: { title: string }) => (
    <div className="sm:col-span-8 mt-6">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
            {title}
        </h3>
    </div>
);

export const LeadDetailView: React.FC = () => {

    const lead = useAppSelector(state => state.lead.lead)
    const leadSections = useAppSelector(state => state.lead.view)

    return <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
        {leadSections.map((section, index) => (
            <React.Fragment key={index}>
                <SectionHeader title={section.title} />

                {/* FLAT FIELDS */}
                {section.type === "fields" &&
                    section.fields.map((field: ViewField) => {
                        const colSpanClass = {
                            4: "sm:col-span-4",
                            8: "sm:col-span-8",
                            12: "sm:col-span-12",
                        }[field.colSpan ?? 4];

                        return (
                            <div key={field.key} className={colSpanClass}>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-gray-500">
                                        {field.label}
                                    </span>
                                    {field.type === "badge" ? (
                                        <div className="text-center">
                                            <span className={`mt-1 inline-flex w-fit rounded-full  px-2 py-1 text-xs font-semibold ${statusColors[lead.status]} text-center`}>
                                                {renderValue(lead[field.key as keyof LeadResponse])}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="mt-1 text-sm text-gray-900">
                                            {renderValue(lead[field.key as keyof LeadResponse])}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                {/* ARRAY FIELDS */}
                {section.type === "array" && (() => {
                    const arrayValue = lead[section.key as keyof LeadResponse];
                    if (!Array.isArray(arrayValue)) return null;

                    return arrayValue.map((item, i) => (
                        <div
                            key={i}
                            className="sm:col-span-8 rounded-lg border border-gray-200 p-4"
                        >
                            <p className="mb-3 text-sm font-semibold text-gray-700">
                                Member {i + 1}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                {Object.entries(item as Record<string, unknown>).map(
                                    ([key, value]) => (
                                        <div key={key}>
                                            <p className="text-xs font-medium text-gray-500">
                                                {formatLabel(key)}
                                            </p>
                                            <p className="text-sm text-gray-900">
                                                {renderValue(value)}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ));
                })()}
            </React.Fragment>
        ))}
    </div>
}