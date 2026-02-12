import type { AuditForm } from "../../core/interfaces/Audit";
import type { LeadActivityResponse } from "../../infrastructure/dtos/AuditResponse";

export interface AuditContract {
    audit(data: AuditForm): Promise<LeadActivityResponse>
}