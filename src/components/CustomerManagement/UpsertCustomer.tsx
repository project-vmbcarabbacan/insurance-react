import type { UpsertCustomer as iUpsertCustomer } from "../../core/interfaces/Customer";
import { MotionDialog } from "../Layout/ui/Dialog";
import { useSelector } from "react-redux";
import { SelectCountryCodes, SelectTypes } from "../../app/stores/selectors/settingSelectors";
import { useAppDispatch } from "../../app/stores/hooks";
import InputField from "../Layout/ui/Input";
import SelectField from "../Layout/ui/Select";
import type { RootState } from "../../app/stores/store";
import { validateCustomerForm } from "../../core/validations/validateCustomerForm";
import { resetCustomerForm, setCustomerFormErrors, setCustomerFormField, UpsertCustomerPost } from "../../app/stores/slices/customerSlice";
import PhoneNumberInput from "../Layout/ui/PhoneNumber";
import RadioGroupInput from "../Layout/ui/RadioGroup";
import DateInput from "../Layout/ui/Date";


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
        const dispatch = useAppDispatch();
        const { data, errors, isLoading, serverError } = useSelector(
            (state: RootState) => state.customer.form
        );

        /* ------------------------ Handlers ------------------------ */

        const handleFieldChange = (field: keyof iUpsertCustomer, value: any) => {
            dispatch(setCustomerFormField({ field, value }));
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            const validationErrors = validateCustomerForm(data);
            if (Object.keys(validationErrors).length > 0) {
                dispatch(setCustomerFormErrors(validationErrors));
                return;
            }

            const result = await dispatch(UpsertCustomerPost(data));

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

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-8 gap-4">
                            <div className="sm:col-span-4">
                                <InputField
                                    id="first-name"
                                    label="First Name"
                                    type="text"
                                    name="first_name"
                                    value={data.first_name}
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
                                    value={data.last_name}
                                    error={errors.last_name}
                                    onChange={e => handleFieldChange("last_name", e.target.value)}
                                    placeholder="Enter your last name"
                                />
                            </div>

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

                            <div className="sm:col-span-4">
                                <SelectField
                                    id="type"
                                    label="Select type"
                                    name="type"
                                    value={data.type}
                                    options={types}
                                    onChange={e => handleFieldChange("type", e.target.value)}
                                    error={errors.type}
                                    placeholder="Select type"
                                />
                            </div>

                            <div className="sm:col-span-4">
                                <DateInput
                                    id="dob"
                                    label="Date of birth"
                                    name="dob"
                                    value={data.dob}
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
                                    options={[
                                        { label: "Male", value: "male" },
                                        { label: "Female", value: "female" },
                                        { label: "Other", value: "other" },
                                    ]}
                                    error={errors.gender}
                                    inline
                                />
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