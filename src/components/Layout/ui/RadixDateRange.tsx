import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Calendar, type CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Define the type for the filter data
interface FilterData {
    startDate: string | null;
    endDate: string | null;
}

// Define props for the component
interface RadixDateRangeProps {
    filterData: FilterData;
    setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
}


const toYYYYMMDD = (date: Date | null): string | null => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const RadixDateRange: React.FC<RadixDateRangeProps> = ({ filterData, setFilterData }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [range, setRange] = useState<[Date | null, Date | null]>([
        filterData.startDate ? new Date(filterData.startDate) : null,
        filterData.endDate ? new Date(filterData.endDate) : null,
    ]);



    const handleChange: CalendarProps["onChange"] = (dates) => {
        if (!Array.isArray(dates)) return;

        const [start, end] = dates as [Date | null, Date | null];

        setRange([start, end]);

        setFilterData((prev) => ({
            ...prev,
            startDate: toYYYYMMDD(start),
            endDate: toYYYYMMDD(end),
        }));
    };


    const formatDate = (date: Date | null) => (date ? date.toLocaleDateString() : "Select date");

    const buttonText =
        range[0] && range[1]
            ? `${formatDate(range[0])} – ${formatDate(range[1])}`
            : range[0]
                ? `${formatDate(range[0])} – Select end date`
                : "Select date range";
    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button
                    className="
            w-full sm:w-auto h-12 px-4 rounded-lg border border-gray-300
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            flex justify-between items-center
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
                >
                    {buttonText}
                </button>
            </Popover.Trigger>

            <Popover.Content className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <Calendar selectRange onChange={handleChange} value={range as [Date, Date]} />
            </Popover.Content>
        </Popover.Root>
    );
};

export default RadixDateRange;
