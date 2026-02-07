import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";



import {
    SelectInsuranceFors,
    SelectExistingInsurances,
    SelectSalaries,
    SelectRelationships,
    SelectYesNo,
    SelectCountries,
    SelectEmirates,
    SelectMedicalConditions,
    SelectMaritalStatuses,
    SelectGenders,
    SelectInsureTos
} from "../../app/stores/selectors/settingSelectors";

import { useAppDispatch } from "../../app/stores/hooks";
import { SettingHealthPrerequisites } from "../../app/stores/slices/settingSlice";
import { validateLeadHealthForm } from "../../core/validations/validateLeadHealthForm";
import type { LeadHealthForm, Member } from "../../core/interfaces/LeadHealth";
import RadioGroupInput from "../../components/Layout/ui/RadioGroup";
import SelectField from "../../components/Layout/ui/Select";
import DateInput from "../../components/Layout/ui/Date";
import InputField from "../../components/Layout/ui/Input";
import { TrashIcon } from "lucide-react";
import { upsertHealthLeadProduct } from "../../app/stores/slices/healthSlice";

const SectionHeader = ({ title }: { title: string }) => (
    <div className="sm:col-span-9 mt-8">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
            {title}
        </h3>
    </div>
);

const SectionMemberHeader = ({ title }: { title: string }) => (
    <div className="sm:col-span-4 mt-2">
        <h3 className="text-sm text-left font-semibold text-gray-600 underline decoration-2 decoration-gray-400">
            {title}
        </h3>
    </div>
);

export const HealthInsurancePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { customer_id } = useParams<{ customer_id: string }>();

    const insuranceFors = useSelector(SelectInsuranceFors);
    const insureTos = useSelector(SelectInsureTos);
    const existingInsurances = useSelector(SelectExistingInsurances);
    const salaries = useSelector(SelectSalaries);
    const relationships = useSelector(SelectRelationships);
    const yesNo = useSelector(SelectYesNo);
    const countries = useSelector(SelectCountries);
    const emirates = useSelector(SelectEmirates);
    const medicalConditions = useSelector(SelectMedicalConditions);
    const maritalStatuses = useSelector(SelectMaritalStatuses);
    const genders = useSelector(SelectGenders);

    const initialFormState: LeadHealthForm = {
        insurance_for: "",
        insure_to: "",
        existing_insurance: "",
        salary: "",
        nationality: "",
        emirates: "",
        members: [],
        has_medical_condition: "no",
        utm_source: "crm",
        utm_medium: "organic"
    };

    const [data, setData] = useState<LeadHealthForm>(initialFormState);

    const [errors, setErrors] = useState<
        Partial<Record<string, string>>
    >({});
    const [isLoading, setIsLoading] = useState(false);

    const relationshipGenderMap: Record<string, string> = {
        self: "",       // let user choose
        husband: "male",
        wife: "female",
        son: "male",
        daughter: "female",
        father: "male",
        mother: "female"
    };

    useEffect(() => {
        if (!customer_id) {
            navigate("/customers", { replace: true });
            return;
        }
        dispatch(SettingHealthPrerequisites());
    }, [customer_id, dispatch, navigate]);

    if (!customer_id) return null;


    const handleChange = (field: keyof LeadHealthForm, value: any) => {
        if (field === "insurance_for") {
            setData(prev => ({
                ...initialFormState,
                insurance_for: value,
                utm_source: prev.utm_source,
                utm_medium: prev.utm_medium
            }));
            setErrors({});
            return;
        }

        if (field === "insure_to") {
            setData(prev => {
                const members = prev.members.map(member => {
                    // self → only self allowed
                    if (
                        value === "self" &&
                        member.relationship &&
                        member.relationship !== "self"
                    ) {
                        return { ...member, relationship: "", gender: "" };
                    }

                    // family → self not allowed
                    if (
                        value === "family" &&
                        member.relationship === "self"
                    ) {
                        return { ...member, relationship: "", gender: "" };
                    }

                    return member;
                });

                return {
                    ...prev,
                    insure_to: value,
                    members
                };
            });

            setErrors(prev => ({ ...prev, insure_to: undefined }));
            return;
        }

        setData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const filteredRelationships = (() => {
        if (data.insure_to === "self") {
            return relationships.filter(r => r.value === "self");
        }

        if (data.insure_to === "family") {
            return relationships.filter(r => r.value !== "self");
        }

        return relationships;
    })();

    /* -------------------- MEMBERS -------------------- */
    const addMember = () => {
        setData(prev => ({
            ...prev,
            members: [
                ...prev.members,
                { first_name: "", last_name: "", dob: "", gender: "", relationship: "" }
            ]
        }));
    };

    const updateMember = (
        index: number,
        field: keyof Member,
        value: any
    ) => {
        setData(prev => {
            const members = [...prev.members];
            const updatedMember = { ...members[index], [field]: value };

            const newErrors: Partial<Record<string, string>> = { ...errors };

            // auto-set gender when relationship changes
            if (field === "relationship") {
                const autoGender = relationshipGenderMap[value];
                if (autoGender) {
                    updatedMember.gender = autoGender;

                    const genderErrorKey = `members.${index}.gender`;
                    if (newErrors[genderErrorKey]) {
                        delete newErrors[genderErrorKey];
                    }
                } else {
                    updatedMember.gender = "";
                }
            }

            members[index] = updatedMember;

            const errorKey = `members.${index}.${field}`;
            if (newErrors[errorKey]) delete newErrors[errorKey];

            setErrors(newErrors);

            return { ...prev, members };
        });

        const errorKey = `members.${index}.${field}`;
        setErrors(prev => {
            if (!prev[errorKey]) return prev; // nothing to remove
            const newErrors = { ...prev };
            delete newErrors[errorKey];
            return newErrors;
        });
    };

    const removeMember = (index: number) => {
        setData(prev => ({
            ...prev,
            members: prev.members.filter((_, i) => i !== index)
        }));
    };

    /* -------------------- SUBMIT -------------------- */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = { ...data, customer_id };
        const validationErrors = validateLeadHealthForm(payload);

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        await dispatch(upsertHealthLeadProduct(payload));
        setIsLoading(false);
        navigate("/customers");
    };

    const maxDate = new Date(
        new Date().setFullYear(new Date().getFullYear())
    )
        .toISOString()
        .split("T")[0];

    const maxDateAdult = new Date(
        new Date().setFullYear(new Date().getFullYear() - 18)
    )
        .toISOString()
        .split("T")[0];

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-9 gap-4">

                    <SectionHeader title="Health Insurance Details" />

                    <div className="sm:col-span-9">
                        <RadioGroupInput
                            label="Buying Health Insurance For"
                            value={data.insurance_for}
                            options={insuranceFors}
                            onChange={e =>
                                handleChange("insurance_for", e.target.value)
                            }
                            error={errors.insurance_for}
                            inline
                        />
                    </div>

                    {data.insurance_for === "self_family" && (
                        <div className="sm:col-span-9">
                            <RadioGroupInput
                                label="Who would you like to insure?"
                                value={String(data.insure_to)}
                                options={insureTos}
                                onChange={e =>
                                    handleChange("insure_to", e.target.value)
                                }
                                error={errors.insure_to}
                                inline
                            />
                        </div>
                    )}

                    <div className="sm:col-span-3">
                        <SelectField
                            label="Existing Health Insurance?"
                            value={data.existing_insurance}
                            options={existingInsurances}
                            onChange={e =>
                                handleChange("existing_insurance", e.target.value)
                            }
                            error={errors.existing_insurance}
                        />
                    </div>

                    {(data.insurance_for === "self_family" ||
                        data.insurance_for === "investor") && (
                            <div className="sm:col-span-3">
                                <SelectField
                                    label="Sponsor Salary (AED)"
                                    value={data.salary}
                                    options={salaries}
                                    onChange={e =>
                                        handleChange("salary", e.target.value)
                                    }
                                    error={errors.salary}
                                />
                            </div>
                        )}

                    <div className="sm:col-span-3">
                        <SelectField
                            label="Nationality"
                            value={data.nationality}
                            options={countries}
                            onChange={e =>
                                handleChange("nationality", e.target.value)
                            }
                            error={errors.nationality}
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <SelectField
                            label="Visa Issued Emirate"
                            value={data.emirates}
                            options={emirates}
                            onChange={e =>
                                handleChange("emirates", e.target.value)
                            }
                            error={errors.emirates}
                        />
                    </div>

                    {data.insurance_for === "investor" && (
                        <>
                            <div className="sm:col-span-3">
                                <RadioGroupInput
                                    label="Gender"
                                    value={data.gender}
                                    options={genders}
                                    onChange={e =>
                                        handleChange("gender", e.target.value)
                                    }
                                    inline
                                    error={errors.gender}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <SelectField
                                    label="Marital Status"
                                    value={data.marital_status}
                                    options={maritalStatuses}
                                    onChange={e =>
                                        handleChange("marital_status", e.target.value)
                                    }
                                    error={errors.marital_status}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <DateInput
                                    label="Date of Birth"
                                    value={data.dob}
                                    max={maxDateAdult}
                                    onChange={e =>
                                        handleChange("dob", e.target.value)
                                    }
                                    error={errors.dob}
                                />
                            </div>
                        </>
                    )}

                    <SectionHeader title="Medical Information" />

                    <div className="sm:col-span-3">
                        <RadioGroupInput
                            label="Any existing medical condition?"
                            value={data.has_medical_condition}
                            options={yesNo}
                            onChange={e =>
                                handleChange(
                                    "has_medical_condition",
                                    e.target.value
                                )
                            }
                            inline

                        />
                    </div>

                    {data.has_medical_condition === "yes" && (
                        <div className="sm:col-span-6">
                            <SelectField
                                label="Medical Conditions"
                                multiple
                                options={medicalConditions}
                                value={data.medical_conditions}
                                onChange={e =>
                                    handleChange(
                                        "medical_conditions",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    )}

                    <SectionHeader title="Members" />

                    {data.members.map((member, index) => (
                        <div key={index} className="sm:col-span-9 grid grid-cols-4 gap-4">
                            {/* Header row */}
                            <div className="col-span-4 flex items-center justify-between">
                                <SectionMemberHeader title={`Member ${index + 1}`} />

                                <button
                                    type="button"
                                    onClick={() => removeMember(index)}
                                    className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                    Remove
                                </button>
                            </div>

                            <InputField
                                id="first-name"
                                label="First Name"
                                type="text"
                                name="first_name"
                                value={member.first_name}
                                maxLength={100}
                                onChange={e => updateMember(index, "first_name", e.target.value)}
                                error={errors[`members.${index}.first_name`]}
                                placeholder={`Member ${index + 1} first name`}
                            />
                            <InputField
                                id="last-name"
                                label="Last Name"
                                type="text"
                                name="last_name"
                                value={member.last_name}
                                maxLength={100}
                                onChange={e => updateMember(index, "last_name", e.target.value)}
                                error={errors[`members.${index}.last_name`]}
                                placeholder={`Member ${index + 1} last name`}
                            />

                            {data.insurance_for !== 'domestic' &&
                                (
                                    <SelectField
                                        label="Relationship"
                                        value={member.relationship}
                                        options={filteredRelationships}
                                        onChange={e => updateMember(index, "relationship", e.target.value)}
                                        error={errors[`members.${index}.relationship`]}
                                    />
                                )
                            }

                            <DateInput
                                label="DOB"
                                value={member.dob}
                                max={
                                    member.relationship === "son" || member.relationship === "daughter"
                                        ? maxDate
                                        : maxDateAdult
                                }
                                onChange={e => updateMember(index, "dob", e.target.value)}
                                error={errors[`members.${index}.dob`]}
                            />

                            <RadioGroupInput
                                label="Gender"
                                value={member.gender}
                                options={genders}
                                onChange={e => updateMember(index, "gender", e.target.value)}
                                inline
                                error={errors[`members.${index}.gender`]}
                            />

                        </div>
                    ))}

                    <div className="sm:col-span-9">
                        <button
                            type="button"
                            onClick={addMember}
                            className="text-indigo-600 text-sm font-medium"
                        >
                            + Add Member
                        </button>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`rounded-md bg-indigo-600 px-4 py-2 text-white ${isLoading
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:bg-indigo-500"
                            }`}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};
