import type { UpsertCustomer as iUpsertCustomer } from "../../core/interfaces/Customer";
import { MotionDialog } from "../Layout/ui/Dialog";
import { useSelector } from "react-redux";
import { SelectAccessed, SelectCountryCodes, SelectCustomerSources, SelectGenders, SelectTypes } from "../../app/stores/selectors/settingSelectors";
import { useAppDispatch } from "../../app/stores/hooks";
import InputField from "../Layout/ui/Input";
import SelectField from "../Layout/ui/Select";
import type { RootState } from "../../app/stores/store";
import { validateCustomerForm } from "../../core/validations/validateCustomerForm";
import { resetCustomerForm, resetCustomerFormErrors, setCustomerFormErrors, setCustomerFormField, UpsertCustomerPost } from "../../app/stores/slices/customerSlice";
import PhoneNumberInput from "../Layout/ui/PhoneNumber";
import RadioGroupInput from "../Layout/ui/RadioGroup";
import DateInput from "../Layout/ui/Date";
import SwitchField from "../Layout/ui/Switch";
import { toggleSettingInsuranceProductSwitch } from "../../app/stores/slices/settingSlice";
import { useState } from "react";

const SectionHeader = ({ title }: { title: string }) => (
    <div className="sm:col-span-8 mt-6">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
            {title}
        </h3>
    </div>
);

export const UpsertCustomer: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}> = ({
    open,
    onOpenChange,
    onSuccess
}) => {
        const types = useSelector(SelectTypes);
        const countryCodes = useSelector(SelectCountryCodes);
        const customerSources = useSelector(SelectCustomerSources);
        const genders = useSelector(SelectGenders);
        const accessed = useSelector(SelectAccessed);
        const [accecessedError, setAccecessedError] = useState<boolean>(false)

        const dispatch = useAppDispatch();
        const { data, errors, isLoading, serverError } = useSelector(
            (state: RootState) => state.customer.form
        );

        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        const maxDate = eighteenYearsAgo.toISOString().split("T")[0];

        /* ------------------------ Handlers ------------------------ */

        const handleFieldChange = (field: keyof iUpsertCustomer, value: any) => {
            dispatch(setCustomerFormField({ field, value }));
        };

        const handleSwitchChange = (value: string) => {
            dispatch(toggleSettingInsuranceProductSwitch(value));
            setAccecessedError(false)
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            const validationErrors = validateCustomerForm(data);
            const allFalse = Object.values(accessed).every(value => value === false);

            if (allFalse && !data.uuid) {
                setAccecessedError(true)
            }

            if (Object.keys(validationErrors).length > 0 || allFalse) {
                dispatch(setCustomerFormErrors(validationErrors));
                return;
            }

            const payload = {
                ...data,
                accessed
            }

            const result = await dispatch(UpsertCustomerPost(payload));

            if (UpsertCustomerPost.fulfilled.match(result)) {
                onSuccess?.();
                handleClosed()
            }
        };

        const handleClosed = () => {
            dispatch(resetCustomerForm());
            onOpenChange(false);
        }

        return (
            <MotionDialog preset="slide" open={open} onOpenChange={onOpenChange}>
                <form onSubmit={handleSubmit}>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">
                            {data.uuid ? "Update" : "Add"} Customer
                        </h2>

                        {serverError && (
                            <div className="mt-2 text-sm text-red-600">{serverError}</div>
                        )}

                        <div className="flex flex-col max-h-[65vh] overflow-hidden">
                            <div
                                className="mt-5 grid grid-cols-1 sm:grid-cols-8 gap-4 overflow-y-auto h-full pr-2"
                                onWheel={(e) => e.stopPropagation()}
                            >
                                {/* ================= BASIC INFORMATION ================= */}
                                <SectionHeader title="Basic Information" />

                                <div className="sm:col-span-8">
                                    <RadioGroupInput
                                        id="type"
                                        label="Customer Type"
                                        name="type"
                                        value={data.type}
                                        disabled={Boolean(data.uuid)}
                                        onChange={e => {
                                            dispatch(resetCustomerFormErrors())
                                            handleFieldChange("type", e.target.value)
                                        }}
                                        options={types}
                                        error={errors.type}
                                        inline
                                    />
                                </div>

                                {
                                    data.type === 'individual' && (
                                        <>
                                            <div className="sm:col-span-4">
                                                <InputField
                                                    id="first-name"
                                                    label="First Name"
                                                    type="text"
                                                    name="first_name"
                                                    value={(data.first_name as string)}
                                                    error={errors.first_name}
                                                    onChange={e => handleFieldChange("first_name", e.target.value)}
                                                    placeholder="Enter your first name"
                                                />
                                            </div>
                                            <div className="sm:col-span-4">
                                                <InputField
                                                    id="last-name"
                                                    label="Last Name"
                                                    type="text"
                                                    name="last_name"
                                                    value={(data.last_name as string)}
                                                    error={errors.last_name}
                                                    onChange={e => handleFieldChange("last_name", e.target.value)}
                                                    placeholder="Enter your last name"
                                                />
                                            </div>


                                            <div className="sm:col-span-4">
                                                <DateInput
                                                    id="dob"
                                                    label="Date of birth"
                                                    name="dob"
                                                    value={(data.dob as string)}
                                                    max={maxDate}
                                                    onChange={e => handleFieldChange("dob", e.target.value)}
                                                    error={errors.dob}
                                                />
                                            </div>

                                            <div className="sm:col-span-8">
                                                <RadioGroupInput
                                                    id="gender"
                                                    label="Gender"
                                                    name="gender"
                                                    value={data.gender}
                                                    onChange={e => handleFieldChange("gender", e.target.value)}
                                                    options={genders}
                                                    error={errors.gender}
                                                    inline
                                                />
                                            </div>
                                        </>
                                    )
                                }

                                {
                                    data.type === "corporate" && (
                                        <>
                                            <div className="sm:col-span-4">
                                                <InputField
                                                    id="company-name"
                                                    label="Company Name"
                                                    type="text"
                                                    name="company_name"
                                                    value={(data.company_name as string)}
                                                    error={errors.company_name}
                                                    onChange={e => handleFieldChange("company_name", e.target.value)}
                                                    placeholder="Enter your company"
                                                />
                                            </div>

                                            <div className="sm:col-span-4">
                                                <InputField
                                                    id="contact-person"
                                                    label="Contact Person"
                                                    type="text"
                                                    name="contact_person"
                                                    value={(data.contact_person as string)}
                                                    error={errors.contact_person}
                                                    onChange={e => handleFieldChange("contact_person", e.target.value)}
                                                    placeholder="Enter contact person"
                                                />
                                            </div>

                                            <div className="sm:col-span-4">
                                                <InputField
                                                    id="registration-no"
                                                    label="Registration Number"
                                                    type="text"
                                                    name="registration_no"
                                                    value={(data.registration_no as string)}
                                                    error={errors.registration_no}
                                                    onChange={e => handleFieldChange("registration_no", e.target.value)}
                                                    placeholder="Enter registration number"
                                                />
                                            </div>
                                        </>
                                    )
                                }

                                {/* ================= CONTACT INFORMATION ================= */}
                                <SectionHeader title="Contact Information" />

                                <div className="sm:col-span-4">
                                    <InputField
                                        id="email"
                                        label="Email address"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        error={errors.email}
                                        onChange={e => handleFieldChange("email", e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="sm:col-span-4">
                                    <PhoneNumberInput
                                        id="phone-number"
                                        label="Phone number"
                                        phoneName="phone_number"
                                        countryCode={data.phone_country_code}
                                        phoneNumber={data.phone_number}
                                        countryOptions={countryCodes}
                                        onCountryChange={e => handleFieldChange("phone_country_code", e)}
                                        onPhoneChange={e => handleFieldChange("phone_number", e.target.value)}
                                        error={errors.phone_number}
                                    />
                                </div>
                                {/* ================= BASIC INFORMATION ================= */}

                                {
                                    !data.uuid && (
                                        <>
                                            <SectionHeader title="Potential Lead" />
                                            {Object.entries(accessed).map(([key, value]) => (
                                                <div className="sm:col-span-2">
                                                    <SwitchField
                                                        key={key} // Use the key as the React key prop
                                                        id={key} // Use the key for the id as well
                                                        label={key} // Assuming key is the product name, you can also map it to labels
                                                        name={key} // Use the key for the name
                                                        checked={accessed[key]} // Access the state using the key
                                                        onChange={() => handleSwitchChange(key)} // Dispatch action to toggle state
                                                    />
                                                </div>
                                            ))}
                                            {
                                                accecessedError && (
                                                    <div className="sm:col-span-8">
                                                        <p className="mt-1 text-sm text-red-600">Select potential lead</p>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }


                                {/* ================= LEAD INFORMATION ================= */}
                                <SectionHeader title="Lead Information" />
                                <div className="sm:col-span-4">
                                    <SelectField
                                        id="customer-source"
                                        label="Customer Source"
                                        name="customer_source"
                                        value={data.customer_source}
                                        onChange={e => handleFieldChange("customer_source", e.target.value)}
                                        options={customerSources}
                                        placeholder="Select source"
                                        error={errors.customer_source}
                                    />
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClosed}
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
                            ${isLoading ? "cursor-not-allowed opacity-60" : "hover:bg-indigo-500"}`}
                        >
                            {isLoading ? "Saving..." : "Save Customer"}
                        </button>
                    </div>
                </form>
            </MotionDialog>
        );
    };