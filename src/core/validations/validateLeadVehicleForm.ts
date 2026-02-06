import type { VehicleInsuranceForm } from "../interfaces/LeadVehicle";

export const validateLeadVehicleForm = (data: VehicleInsuranceForm) => {
    const errors: Partial<Record<keyof VehicleInsuranceForm, string>> = {};

    if (!data.vehicle_make_id) errors.vehicle_make_id = 'Vehicle make is required';
    if (!data.vehicle_year) errors.vehicle_year = 'Vehicle year is required';
    if (!data.vehicle_model_id) errors.vehicle_model_id = 'Vehicle model is required';
    if (!data.vehicle_trim_id) errors.vehicle_trim_id = 'Vehicle trim is required';
    if (!data.vehicle_specification) errors.vehicle_specification = 'Vehicle specification is required';
    if (!data.first_name) errors.first_name = 'First name is required';
    if (!data.last_name) errors.last_name = 'Last name is required';
    if (!data.dob) errors.dob = 'Date of birth is required';
    if (!data.nationality) errors.nationality = 'Nationality is required';
    if (!data.driver_license_number) errors.driver_license_number = 'Driver license number is required';
    if (!data.registration_emirate) errors.registration_emirate = 'Emirates is required';
    if (!data.last_claim_history) errors.last_claim_history = 'Last claim history is required';
    if (!data.policy_type) errors.policy_type = 'Policy type is required';
    if (!data.policy_expired) errors.policy_expired = 'Policy expired is required';
    if (!data.vin) errors.vin = 'VIN is required';
    if (!data.plate_number) errors.plate_number = 'Plate number is required';
    if (!data.engine_number) errors.engine_number = 'Engine number is required';
    if (!data.vehicle_value) errors.vehicle_value = 'Vehicle value is required';

    return errors;
};
