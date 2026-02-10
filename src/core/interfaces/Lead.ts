export interface LeadDetail {
    uuid: string
    product: string
    lead_details: string
    due_date: string
    status: string
}

export interface LeadActivity {
    uuid?: string
    communication_preference: string
    activity_response: string
    notes: string
}
