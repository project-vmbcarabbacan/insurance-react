import * as Select from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import type { DocumentTypes } from "../../../../core/interfaces/Document"

type SelectProps = {
    value: number
    documentTypes: DocumentTypes[]
    usedRequiredTypes: Set<number>
    onValueChange: (value: string) => void
}

export const DocumentTypeSelect: React.FC<SelectProps> = ({
    value,
    documentTypes,
    usedRequiredTypes,
    onValueChange,
}) => {
    return (
        <Select.Root
            value={value ? String(value) : ""}
            onValueChange={onValueChange}
        >
            <Select.Trigger className="inline-flex w-56 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <Select.Value placeholder="Select type" />
                <Select.Icon>
                    <ChevronDown size={16} />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    className="z-50 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
                    position="popper"
                >
                    <Select.Viewport className="p-1">
                        {documentTypes.map((type) => {
                            const isDisabled =
                                type.required &&
                                usedRequiredTypes.has(type.value) &&
                                type.value !== value
                            return (
                                <Select.Item
                                    key={type.value}
                                    value={String(type.value)}
                                    disabled={isDisabled}
                                    className={`
                                        relative flex select-none items-center rounded px-3 py-2 text-sm outline-none
                                        ${isDisabled
                                            ? "cursor-not-allowed opacity-40"
                                            : "cursor-pointer hover:bg-indigo-50 data-[state=checked]:bg-indigo-100"
                                        }
                                    `}
                                >
                                    <Select.ItemText>
                                        {type.label}
                                        {type.required && (
                                            <span className="ml-1 text-red-500">*</span>
                                        )}
                                    </Select.ItemText>

                                    <Select.ItemIndicator className="absolute right-2">
                                        <Check size={16} />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            )
                        })}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}
