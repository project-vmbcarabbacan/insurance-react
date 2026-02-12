import type { UpdateDocumentType, UploadProgressCallback } from "../../core/interfaces/Document";
import type { LeadDocumentResponse } from "../../infrastructure/dtos/DocumentResponse";
import type { LeadMessageResponse } from "../../infrastructure/dtos/LeadResponse";

export interface DocumentContract {
    uploadDocuments(formData: FormData, onProgress?: UploadProgressCallback): Promise<void>
    getDocuments(lead_uuid: string): Promise<LeadDocumentResponse>
    updateType(data: UpdateDocumentType): Promise<LeadMessageResponse>
    deleteDocument(document_uuid: string): Promise<LeadMessageResponse>
}