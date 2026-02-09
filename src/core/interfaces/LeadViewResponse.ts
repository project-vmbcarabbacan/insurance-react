import type { LeadHealthForm } from "./LeadHealth";
import type { LeadVehicleForm } from "./LeadVehicle";

// Common base for all leads
interface BaseLead {
    product: "vehicle" | "health";
    lead_details: string;
    due_date: string; // consider Date if you parse it
    status: "new" | string;
}

// =======================
// Vehicle Lead
// =======================
export interface VehicleLead extends BaseLead {
    product: "vehicle";
    vin: string;
    plate_number: string;
    vehicle_value: string; // numeric string (e.g. "15,805.00")
    vehicle_specification: string;
    driver_full_name: string;
    driver_dob: string;
    driver_nationality: string | null;
    driving_experience: number;
    driver_license_number: string;
    registration_emirate: string;
    last_claim_history: string | null;
    policy_type: string | null;
    policy_expired: string | null;
    agent_name: string;
}

// =======================
// Health Lead
// =======================
export interface HealthMember {
    member_first_name: string;
    member_last_name: string;
    member_gender: "male" | "female" | string;
    member_relationship: string | null;
    member_dob: string;
}

export interface HealthLead extends BaseLead {
    product: "health";
    insurance_for: string;
    emirates: string;
    nationality: string;
    existing_insurance: string;
    has_medical_condition: "Yes" | "No" | string;
    insure_to: string | null;
    salary: string | null;
    medical_conditions: string | null;
    gender: string | null;
    members: HealthMember[];
}

// =======================
// Union Type
// =======================
export type Lead = VehicleLead | HealthLead;

// Example wrapper if API returns { lead: ... }
export interface LeadResponse {
    lead: Lead;
}

export interface LeadLookUpResponse {
    lead: LeadVehicleForm | LeadHealthForm
}
