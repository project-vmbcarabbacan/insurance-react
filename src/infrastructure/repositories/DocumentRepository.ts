import type { UpdateDocumentType, UploadProgressCallback } from "../../core/interfaces/Document";
import type { DocumentContract } from "../../domain/contracts/DocumentContract";
import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { LeadDocumentResponse } from "../dtos/DocumentResponse";
import type { LeadMessageResponse } from "../dtos/LeadResponse";

export class DocumentRepository implements DocumentContract {
    constructor(private api: ApiService) { }

    async uploadDocuments(formData: FormData, onProgress?: UploadProgressCallback): Promise<void> {
        await this.api.postForm(`/${API_URL.document.upload}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (event) => {
                const percent = Math.round(
                    (event.loaded * 100) / (event.total || 1)
                );
                onProgress?.(percent);
            }
        })
    }

    async getDocuments(lead_uuid: string): Promise<LeadDocumentResponse> {
        return await this.api.get(`/${API_URL.document.all}/${lead_uuid}`)
    }

    async updateType(data: UpdateDocumentType): Promise<LeadMessageResponse> {
        const { document_uuid, ...payload } = data
        return await this.api.patch(`/${API_URL.document.updateType}/${document_uuid}`, payload)
    }

    async deleteDocument(document_uuid: string): Promise<LeadMessageResponse> {
        return await this.api.delete(`/${API_URL.document.delete}/${document_uuid}`)
    }

}