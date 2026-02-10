import React, { useRef, useState } from "react";
import { formatLabel, renderValue } from "../../core/utils/leadView";
import type { ViewField, ViewSection } from "../../core/interfaces/LeadViewConfig";
import type { LeadResponse } from "../../core/interfaces/LeadViewResponse";
import { MotionDialog } from "../Layout/ui/Dialog";

const SectionHeader = ({ title }: { title: string }) => (
    <div className="sm:col-span-8 mt-6">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
            {title}
        </h3>
    </div>
);

interface LeadViewProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    lead: LeadResponse;
    leadSections: ViewSection[];
}

export const ViewDetails: React.FC<LeadViewProps> = ({
    lead,
    leadSections,
    open,
    onOpenChange,
}) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startY, setStartY] = useState<number>(0);
    const [scrollTop, setScrollTop] = useState<number>(0);

    if (!lead) return null;

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartY(e.clientY);
        if (scrollRef.current) setScrollTop(scrollRef.current.scrollTop);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        const dy = e.clientY - startY;
        scrollRef.current.scrollTop = scrollTop - dy;
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    // ✅ Allow wheel events to scroll naturally
    const handleWheel = (e: React.WheelEvent) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop += e.deltaY;
    };

    return (
        <MotionDialog preset="slide" open={open} onOpenChange={onOpenChange}>
            <div className="flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-lg">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">Lead Details</h2>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                {/* Scrollable & draggable body */}
                <div
                    ref={scrollRef}
                    className={`flex-1 overflow-auto px-6 py-4 cursor-${isDragging ? "grabbing" : "grab"}`}
                    style={{ WebkitOverflowScrolling: "touch", userSelect: isDragging ? "none" : "auto" }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onWheel={handleWheel}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
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
                                                        <span className="mt-1 inline-flex w-fit rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
                                                            {renderValue(lead[field.key as keyof LeadResponse])}
                                                        </span>
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
                </div>
            </div>
        </MotionDialog>
    );
};
