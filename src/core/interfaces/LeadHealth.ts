export type Member = {
    relationship?: string;
    dob: string;
    gender: string;
    nationality?: string;
    medical_conditions?: string[];
    pregnant?: boolean;
};

export type LeadHealthForm = {
    insurance_for: 'self_family' | 'domestic' | 'investor' | '';
    insure_to?: 'self' | 'family' | 'both' | '';

    sponsor_name?: string;
    sponsor_email?: string;
    sponsor_mobile?: string;

    existing_insurance: string;
    salary?: string;
    nationality: string;
    emirates: string;

    marital_status?: string;
    gender?: string;
    dob?: string;

    has_medical_condition?: string;
    medical_conditions?: string[];

    members: Member[];

    utm_source: string;
    utm_medium: string;
};
