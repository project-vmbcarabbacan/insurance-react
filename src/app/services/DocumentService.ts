import type { UpdateDocumentType, UploadProgressCallback } from "../../core/interfaces/Document";
import type { DocumentContract } from "../../domain/contracts/DocumentContract";
import type { LeadDocumentResponse } from "../../infrastructure/dtos/DocumentResponse";
import type { LeadMessageResponse } from "../../infrastructure/dtos/LeadResponse";

export class DocumentService {
    constructor(private document: DocumentContract) { }

    async uploadDocuments(formData: FormData, onProgress?: UploadProgressCallback): Promise<void> {
        // You could add additional business logic here if needed
        await this.document.uploadDocuments(formData, onProgress);
    }

    async documentsByLead(lead_uuid: string): Promise<LeadDocumentResponse> {
        return await this.document.getDocuments(lead_uuid)
    }

    async updateType(data: UpdateDocumentType): Promise<LeadMessageResponse> {
        return await this.document.updateType(data)
    }

    async deleteDocument(document_uuid: string): Promise<LeadMessageResponse> {
        return await this.document.deleteDocument(document_uuid)
    }
}