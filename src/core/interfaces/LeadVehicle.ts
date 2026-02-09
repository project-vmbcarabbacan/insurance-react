export type LeadVehicleForm = {

    vehicle_make_id: number;
    vehicle_year: number;
    vehicle_model_id: number;
    vehicle_trim_id: number;
    vin: string;
    plate_number: string;
    engine_number: string;
    vehicle_value: string;
    vehicle_specification: string;

    first_name: string;
    last_name: string;
    dob: string;
    nationality: string;
    driving_experience: string;
    driver_license_number: string;

    registration_emirate: string;
    last_claim_history: string;
    policy_type: string;
    policy_expired: string;

    utm_source: string;
    utm_medium: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;

    uuid?: string;
}