import type { AuditForm } from "../../core/interfaces/Audit";
import type { AuditContract } from "../../domain/contracts/AuditContract";
import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { LeadActivityResponse } from "../dtos/AuditResponse";

export class AuditRepository implements AuditContract {
    constructor(private api: ApiService) { }

    async audit(data: AuditForm): Promise<LeadActivityResponse> {
        return this.api.get(`${API_URL.audit.fetch}/${data.morph}/${data.uuid}?page=${data.page}`)
    }
}