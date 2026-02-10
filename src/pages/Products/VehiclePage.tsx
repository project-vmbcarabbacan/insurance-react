import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../../components/Layout/ui/Input";
import SelectField from "../../components/Layout/ui/Select";
import DateInput from "../../components/Layout/ui/Date";
import RadioGroupInput from "../../components/Layout/ui/RadioGroup";
import { SelectClaimHistories, SelectCountries, SelectEmirates, SelectMakes, SelectModels, SelectPolicyTypes, SelectSpecificationTypes, SelectTrims, SelectYears, SelectYesNo } from "../../app/stores/selectors/settingSelectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/stores/hooks";
import { SettingVehicleMakes, SettingVehicleModels, SettingVehiclePrerequisites, SettingVehicleTrims } from "../../app/stores/slices/settingSlice";
import type { LeadVehicleForm } from "../../core/interfaces/LeadVehicle";
import { validateLeadVehicleForm } from "../../core/validations/validateLeadVehicleForm";
import AmountInput from "../../components/Layout/ui/Amount";
import { FindVehicleLeadProduct, upsertVehicleLeadProduct } from "../../app/stores/slices/vehicleSlice";

import GoBack from "../../components/Layout/ui/GoBack";

const SectionHeader = ({ title }: { title: string }) => (
    <div className="sm:col-span-9 mt-8">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
            {title}
        </h3>
    </div>
);

export const VehicleInsurancePage = () => {

    const years = useSelector(SelectYears);
    const claimHistories = useSelector(SelectClaimHistories);
    const policyTypes = useSelector(SelectPolicyTypes);
    const specificationTypes = useSelector(SelectSpecificationTypes);
    const yesNo = useSelector(SelectYesNo);
    const makes = useSelector(SelectMakes);
    const models = useSelector(SelectModels);
    const trims = useSelector(SelectTrims);
    const countries = useSelector(SelectCountries);
    const emirates = useSelector(SelectEmirates);

    const dispatch = useAppDispatch();

    const { customer_id, lead_id } = useParams<{ customer_id: string, lead_id: string }>();
    const navigate = useNavigate();

    /* ------------------------ Local State ------------------------ */
    const [data, setData] = useState<LeadVehicleForm>({
        vehicle_make_id: 0,
        vehicle_year: 0,
        vehicle_model_id: 0,
        vehicle_trim_id: 0,
        vin: "",
        plate_number: "",
        engine_number: "",
        vehicle_value: "",
        vehicle_specification: "",

        first_name: "",
        last_name: "",
        dob: "",
        nationality: "",
        driving_experience: "0",
        driver_license_number: "",

        registration_emirate: "",
        last_claim_history: "",
        policy_type: "",
        policy_expired: "no",

        utm_source: 'crm',
        utm_medium: 'organic'
    });

    const [errors, setErrors] = useState<Partial<Record<keyof LeadVehicleForm, string>>>({});
    const [isLoading, setIsLoading] = useState(false);

    /* ------------------------ useEffect ------------------------ */
    useEffect(() => {
        if (!customer_id) {
            // Redirect and **return early**, do NOT call setState
            navigate("/customers", { replace: true });
            return;
        }

    }, [customer_id, navigate]);


    useEffect(() => {
        dispatch(SettingVehiclePrerequisites())
    }, [dispatch])

    useEffect(() => {

        if (!lead_id) return

        const fetchData = async () => {
            try {
                const payload = await dispatch(
                    FindVehicleLeadProduct({ lead_uuid: String(lead_id) })
                ).unwrap();

                setData(prev => ({
                    ...prev,
                    ...(payload.data.lead as Partial<LeadVehicleForm>),
                }));
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [lead_id, dispatch]);

    useEffect(() => {
        if (!data.vehicle_year) return;

        dispatch(
            SettingVehicleMakes({
                year: data.vehicle_year
            })
        );
    }, [data.vehicle_year, dispatch]);


    useEffect(() => {
        if ((!data.vehicle_year && !data.vehicle_make_id) || data.vehicle_make_id == 0) return;

        dispatch(
            SettingVehicleModels({
                year: data.vehicle_year,
                make_id: data.vehicle_make_id
            })
        )

    }, [data.vehicle_year, data.vehicle_make_id, dispatch]);

    useEffect(() => {
        if ((!data.vehicle_year && !data.vehicle_make_id && !data.vehicle_model_id) || data.vehicle_model_id == 0) return;


        dispatch(
            SettingVehicleTrims({
                year: data.vehicle_year,
                make_id: data.vehicle_make_id,
                model_id: data.vehicle_model_id
            }))


    }, [data.vehicle_year, data.vehicle_make_id, data.vehicle_model_id, dispatch]);


    if (!customer_id) return null;

    /* ------------------------ Handlers ------------------------ */
    const handleChange = (field: keyof LeadVehicleForm, value: string | number) => {
        setData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!customer_id) return;

        const payload = {
            ...data,
            customer_id,
        };

        const validationErrors = validateLeadVehicleForm(payload)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true)

        await dispatch(upsertVehicleLeadProduct(payload))
        setIsLoading(false)
        navigate(`/customer/${customer_id}`)
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange('vehicle_year', Number(e.target.value))
    };

    const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange('vehicle_make_id', Number(e.target.value))
    };

    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange('vehicle_model_id', Number(e.target.value))
    };

    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const maxDate = eighteenYearsAgo.toISOString().split("T")[0];

    return (
        <div className="space-y-6">
            {/* Header */}
            <GoBack />

            <div className="max-w-6xl mx-auto px-4 py-6">
                <form onSubmit={handleSubmit}>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold text-gray-900">
                            Vehicle Insurance
                        </h2>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-9 gap-4">
                            {/* ================= VEHICLE DETAILS ================= */}
                            <SectionHeader title="Vehicle Details" />


                            <div className="sm:col-span-3">
                                <SelectField
                                    id="vehicle-year"
                                    label="Select Year"
                                    name="vehicle_year"
                                    value={data.vehicle_year}
                                    defaultPlaceHolderValue={0}
                                    onChange={handleYearChange}
                                    options={years}
                                    placeholder="Select year"
                                    error={errors.vehicle_year}
                                />
                            </div>

                            <div className="sm:col-span-3">

                                <SelectField
                                    id="vehicle-make-id"
                                    label="Select Make"
                                    name="vehicle_make_id"
                                    value={data.vehicle_make_id}
                                    defaultPlaceHolderValue={0}
                                    onChange={handleMakeChange}
                                    options={makes}
                                    placeholder="Select Make"
                                    error={errors.vehicle_make_id}
                                />
                            </div>


                            <div className="sm:col-span-3">
                                <SelectField
                                    id="vehicle-model-id"
                                    label="Select model"
                                    name="vehicle_model_id"
                                    value={data.vehicle_model_id}
                                    defaultPlaceHolderValue={0}
                                    onChange={handleModelChange}
                                    options={models}
                                    placeholder="Select model"
                                    error={errors.vehicle_model_id}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <SelectField
                                    id="vehicle-trim-id"
                                    label="Select trim"
                                    name="vehicle_trim_id"
                                    value={data.vehicle_trim_id}
                                    defaultPlaceHolderValue={0}
                                    onChange={e => handleChange("vehicle_trim_id", e.target.value)}
                                    options={trims}
                                    placeholder="Select trim"
                                    error={errors.vehicle_trim_id}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <InputField
                                    id="vin"
                                    label="VIN"
                                    type="text"
                                    name="vin"
                                    value={data.vin}
                                    maxLength={20}
                                    onChange={e => handleChange("vin", e.target.value)}
                                    error={errors.vin}
                                    placeholder="17-character VIN"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <InputField
                                    id="plate-number"
                                    label="Plate Number"
                                    type="text"
                                    name="plate_number"
                                    value={data.plate_number}
                                    maxLength={10}
                                    onChange={e => handleChange("plate_number", e.target.value)}
                                    error={errors.plate_number}
                                    placeholder="ABC-1234"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <InputField
                                    id="engine-number"
                                    label="Engine Number"
                                    type="text"
                                    name="engine_number"
                                    value={data.engine_number}
                                    maxLength={20}
                                    onChange={e => handleChange("engine_number", e.target.value)}
                                    error={errors.engine_number}
                                    placeholder="Enter Engine number"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <SelectField
                                    id="vehicle-specification"
                                    label="Vehicle Specification"
                                    name="vehicle_specification"
                                    value={data.vehicle_specification}
                                    onChange={e => handleChange("vehicle_specification", e.target.value)}
                                    options={specificationTypes}
                                    placeholder="Select specification"
                                    error={errors.vehicle_specification}
                                />
                            </div>

                            <div className="sm:col-span-3">

                                <AmountInput
                                    id="vehicle-value"
                                    label="Vehicle Value"
                                    name="vehicle_value"
                                    currency="AED"
                                    value={data.vehicle_value}
                                    onChange={e => handleChange("vehicle_value", e)}
                                    error={errors.vehicle_value}
                                />
                            </div>

                            {/* ================= DRIVER DETAILS ================= */}
                            <SectionHeader title="Driver Details" />

                            <div className="sm:col-span-3">
                                <InputField
                                    id="first_name"
                                    label="First Name"
                                    name="first_name"
                                    maxLength={100}
                                    value={data.first_name}
                                    onChange={e => handleChange("first_name", e.target.value)}
                                    error={errors.first_name}
                                    placeholder="Enter First Name"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <InputField
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    maxLength={100}
                                    value={data.last_name}
                                    onChange={e => handleChange("last_name", e.target.value)}
                                    error={errors.last_name}
                                    placeholder="Enter Last Name"
                                />
                            </div>
                            <div className="sm:col-span-3"></div>

                            <div className="sm:col-span-3">
                                <DateInput
                                    id="dob"
                                    label="Date of Birth"
                                    name="dob"
                                    value={data.dob}
                                    max={maxDate}
                                    onChange={e => handleChange("dob", e.target.value)}
                                    error={errors.dob}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <InputField
                                    id="driver_license_number"
                                    label="Driver License Number"
                                    name="driver_license_number"
                                    value={data.driver_license_number}
                                    maxLength={20}
                                    onChange={e => handleChange("driver_license_number", e.target.value)}
                                    error={errors.driver_license_number}
                                    placeholder="Enter Driver License Number"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <SelectField
                                    id="nationality"
                                    label="Last Nationality"
                                    name="nationality"
                                    value={data.nationality}
                                    onChange={e => handleChange("nationality", e.target.value)}
                                    options={countries}
                                    placeholder="Select nationality"
                                    error={errors.nationality}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <InputField
                                    id="driving_experience"
                                    label="Driving Experience (Years)"
                                    type="number"
                                    name="driving_experience"
                                    value={data.driving_experience}
                                    onChange={e => {
                                        let value = e.target.value
                                        if (Number(value) < 0) value = "0"
                                        else if (Number(value) > 50) value = "50"

                                        handleChange("driving_experience", value)
                                    }}
                                    error={errors.driving_experience}
                                />
                            </div>

                            {/* ================= POLICY DETAILS ================= */}
                            <SectionHeader title="Policy Details" />

                            <div className="sm:col-span-3">
                                <SelectField
                                    id="registration-emirate"
                                    label="Registration Emirate"
                                    name="registration_emirate"
                                    value={data.registration_emirate}
                                    onChange={e => handleChange("registration_emirate", e.target.value)}
                                    options={emirates}
                                    placeholder="Select registration emirate"
                                    error={errors.registration_emirate}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <SelectField
                                    id="last_claim_history"
                                    label="Last Claim History"
                                    name="last_claim_history"
                                    value={data.last_claim_history}
                                    onChange={e => handleChange("last_claim_history", e.target.value)}
                                    options={claimHistories}
                                    placeholder="Select claim history"
                                    error={errors.last_claim_history}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <SelectField
                                    id="policy_type"
                                    label="Policy Type"
                                    name="policy_type"
                                    value={data.policy_type}
                                    onChange={e => handleChange("policy_type", e.target.value)}
                                    options={policyTypes}
                                    placeholder="Select policy type"
                                    error={errors.policy_type}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <RadioGroupInput
                                    id="policy_expired"
                                    label="Has your existing policy expired?"
                                    name="policy_expired"
                                    value={data.policy_expired}
                                    onChange={e => handleChange("policy_expired", e.target.value)}
                                    options={yesNo}
                                    inline
                                    error={errors.policy_expired}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white
                        ${isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-500"}`}
                        >
                            {isLoading ? "Submitting..." : "Submit Insurance"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
