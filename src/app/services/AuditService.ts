import type { AuditForm } from "../../core/interfaces/Audit";
import type { AuditContract } from "../../domain/contracts/AuditContract";
import type { LeadActivityResponse } from "../../infrastructure/dtos/AuditResponse";

export class AuditService {
    constructor(private audit: AuditContract) { }

    async getAudits(data: AuditForm): Promise<LeadActivityResponse> {
        return await this.audit.audit(data)
    }
}