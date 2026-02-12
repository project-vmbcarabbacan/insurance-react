"use client"

import * as React from "react"
import { AnimatePresence } from "framer-motion"

import { DocumentRow } from "./DocumentRow"
import type { DocumentData } from "../../../../core/interfaces/Document"

type Props = {
    documents: DocumentData[]
    onChange?: (uuid: string, documentTypeId: number) => void
    onDelete: (uuid: string) => void
}

export const DocumentsTable: React.FC<Props> = ({
    documents,
    onChange,
    onDelete
}) => {
    const [rows, setRows] = React.useState<DocumentData[]>(documents)

    const handleChange = React.useCallback(
        (uuid: string, value: string) => {
            const numericValue = Number(value)

            setRows((prev) =>
                prev.map((doc) =>
                    doc.uuid === uuid
                        ? { ...doc, document_type_id: numericValue }
                        : doc
                )
            )

            onChange?.(uuid, numericValue)
        },
        [onChange]
    )

    const usedRequiredTypes = React.useMemo(() => {
        const set = new Set<number>()

        rows.forEach((doc) => {
            const type = doc.document_types.find(
                (t) => t.value === doc.document_type_id
            )

            if (type?.required) {
                set.add(type.value)
            }
        })

        return set
    }, [rows])

    React.useEffect(() => {
        setRows(documents)
    }, [documents])

    return (
        <div className="w-full overflow-x-auto overflow-y-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                        <th className="px-6 py-3">Document</th>
                        <th className="px-6 py-3 text-center">Uploaded By</th>
                        <th className="px-6 py-3 text-center">Uploaded At</th>
                        <th className="px-6 py-3 text-center">Type</th>
                        <th className="px-6 py-3 text-right">File</th>
                    </tr>
                </thead>

                <tbody>
                    <AnimatePresence>
                        {rows.map((doc) => (
                            <DocumentRow
                                key={doc.uuid}
                                doc={doc}
                                usedRequiredTypes={usedRequiredTypes}
                                onChange={handleChange}
                                onDelete={onDelete}
                            />
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
    )
}
