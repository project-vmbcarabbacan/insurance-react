export interface AuditForm {
    page: number
    morph: string
    uuid: string
}

export type AuditValue =
    | string
    | number
    | boolean
    | null

export interface AuditValues {
    [key: string]: AuditValue
}

export interface AuditFieldValue {
    field: string
    value: string | number | AuditValues | null
}

export type LeadAuditAction =
    | "lead_created"
    | "lead_assigned"
    | "lead_meta_updated"
    | "lead_status_updated"
    | "document_uploaded"
    | "document_updated"

export type LeadAuditableType =
    | "lead"
    | "customer"
    | "user"

export interface AuditData {
    id: number
    user_id: number
    action: LeadAuditAction
    auditable_type: LeadAuditableType
    auditable_id: number
    old_values: AuditFieldValue[] | null
    new_values: AuditFieldValue[] | null
    created_at: string // consider Date if transformed
}
