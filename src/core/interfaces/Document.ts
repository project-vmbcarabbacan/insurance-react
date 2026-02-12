export interface DocumentTypes {
    value: number
    label: string
    required: boolean
}

export interface DocumentData {
    uuid: string
    original_name: string
    url: string
    document_type_id: number
    uploaded_by: string
    uploaded_at: string
    document_types: DocumentTypes[]

}

export interface LeadDocument {
    documents: DocumentData[]
}

export interface UploadProgressCallback {
    (percent: number): void;
}

export interface UpdateDocumentType {
    document_uuid: string
    lead_uuid: string
    document_type_id: number
}