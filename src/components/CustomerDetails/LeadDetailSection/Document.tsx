import React, { useCallback, useEffect, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { useAppDispatch, useAppSelector } from "../../../app/stores/hooks"
import { v4 as uuidv4 } from "uuid"
import * as LucideIcons from "lucide-react"
import { addFile, AllDocumentsByLead, DeleteDocument, removeFile, UpdateType, uploadMultipleDocuments } from "../../../app/stores/slices/documentSlice"
import { DocumentsTable } from "./Document/DocumentTable"
import type { DocumentData, UpdateDocumentType } from "../../../core/interfaces/Document"

const MAX_SIZE = 5 * 1024 * 1024 // 5MB

interface LeadDocumentUploadProp {
    lead_uuid: string
}

export const LeadDocumentUploader: React.FC<LeadDocumentUploadProp> = ({
    lead_uuid
}) => {
    const dispatch = useAppDispatch()
    const files = useAppSelector(state => state.document.files)
    const documents = useAppSelector(state => state.document.documents)
    const removalTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

    const [rows, setRows] = React.useState<DocumentData[]>(documents)

    React.useEffect(() => {
        setRows(documents)
    }, [documents])

    useEffect(() => {
        files.forEach((file) => {
            // If file is successfully uploaded and no timer exists
            if (file.progress === 100 && file.status === "success" && !removalTimers.current[file.uuid]) {
                // Start a timer to remove the file after 2.5s
                removalTimers.current[file.uuid] = setTimeout(() => {
                    dispatch(removeFile(file.uuid))
                    // Clean up the timer
                    delete removalTimers.current[file.uuid]
                }, 2500)
            }
        })

        // Cleanup function on unmount: clear all active timers
        return () => {
            Object.values(removalTimers.current).forEach(clearTimeout)
            removalTimers.current = {}
        }
    }, [files, dispatch])

    const onDrop = async (acceptedFiles: File[]) => {
        const formData = new FormData()

        acceptedFiles.forEach((file) => {
            const uuid = uuidv4()

            const preview = file.type.startsWith("image/")
                ? URL.createObjectURL(file)
                : undefined

            const fileObj = {
                uuid,
                lead_uuid,
                file,
                progress: 0,
                status: "uploading" as const,
                preview
            }

            dispatch(addFile(fileObj))

            // Append each file to FormData with documents[]
            formData.append("documents[]", file)
        })

        // Append lead_uuid
        formData.append("lead_uuid", lead_uuid)

        // Dispatch a new thunk to upload multiple files at once
        await dispatch(uploadMultipleDocuments(formData))
        dispatch(AllDocumentsByLead(lead_uuid))
    }

    const HandleType = useCallback(
        (uuid: string, documentTypeId: number) => {
            const payload = {
                lead_uuid,
                document_uuid: uuid,
                document_type_id: documentTypeId
            } as UpdateDocumentType

            dispatch(UpdateType(payload))
        },
        [dispatch, lead_uuid]
    )

    const handleDelete = React.useCallback((uuid: string) => {
        setRows((prev) => prev.filter((doc) => doc.uuid !== uuid))

        dispatch(DeleteDocument(uuid))
    }, [dispatch])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize: MAX_SIZE,
        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "image/*": [".png", ".jpg", ".jpeg"]
        }
    })

    return (
        <div className="space-y-6">

            {/* Dropzone */}
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
                ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-600"}`}
            >
                <input {...getInputProps()} />
                <LucideIcons.Upload className="mx-auto mb-3 w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Drag & drop files here or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    PDF, DOC, DOCX, Images (Max 5MB)
                </p>
            </div>

            {/* File List */}
            <div className="space-y-4">
                {files.map(file => (
                    <div
                        key={file.uuid}
                        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                    >
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-4">

                                {/* Image Preview */}
                                {file.preview ? (
                                    <img
                                        src={file.preview}
                                        alt="preview"
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                ) : (
                                    <LucideIcons.FileText className="w-10 h-10 text-gray-500" />
                                )}

                                <div>
                                    <p className="text-sm font-medium truncate max-w-xs">
                                        {file.file.name}
                                    </p>

                                    <div className="w-64 bg-gray-300 dark:bg-gray-700 rounded-full h-2 mt-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300
                                                ${file.status === "success"
                                                    ? "bg-green-500"
                                                    : file.status === "error"
                                                        ? "bg-red-500"
                                                        : "bg-primary"
                                                }`}
                                            style={{ width: `${file.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => dispatch(removeFile(file.uuid))}
                                className="text-red-500 hover:text-red-600"
                            >
                                <LucideIcons.X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <DocumentsTable
                documents={rows}
                onChange={HandleType}
                onDelete={handleDelete}
            />
        </div>
    )
}
