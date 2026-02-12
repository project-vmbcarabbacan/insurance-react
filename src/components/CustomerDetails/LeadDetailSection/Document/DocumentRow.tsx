import React from "react"
import { motion } from "framer-motion"
import { DocumentTypeSelect } from "./DocumentSelectType"
import type { DocumentData } from "../../../../core/interfaces/Document"
import { FileText, X } from "lucide-react"


type RowProps = {
    doc: DocumentData
    usedRequiredTypes: Set<number>
    onChange: (uuid: string, value: string) => void
    onDelete: (uuid: string) => void
}

export const DocumentRow = React.memo(({ doc, usedRequiredTypes, onChange, onDelete }: RowProps) => {
    return (
        <motion.tr
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-100 hover:bg-gray-50"
        >
            <td className="px-6 py-4 font-medium text-gray-900 text-left">
                {doc.original_name}
            </td>

            <td className="px-6 py-4 text-gray-600">{doc.uploaded_by}</td>

            <td className="px-6 py-4 text-gray-500">{doc.uploaded_at}</td>

            <td className="px-6 py-4">
                <DocumentTypeSelect
                    value={doc.document_type_id}
                    documentTypes={doc.document_types}
                    usedRequiredTypes={usedRequiredTypes}
                    onValueChange={(val) => onChange(doc.uuid, val)}
                />
            </td>

            <td className="px-6 py-4 text-right flex justify-end items-center gap-3">
                {/* View Document */}
                <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                    <FileText className="w-5 h-5" />
                </a>

                {/* Delete Document */}
                <button
                    onClick={() => onDelete(doc.uuid)}
                    className="text-red-500 hover:text-red-600"
                >
                    <X className="w-5 h-5" />
                </button>
            </td>
        </motion.tr>
    )
})

DocumentRow.displayName = "DocumentRow"
