import { useEffect, useState } from "react";
import { MotionDialog } from "../Layout/ui/Dialog";
import { useAppDispatch, useAppSelector } from "../../app/stores/hooks";
import { SelectActivityResponse, SelectCommunicationPreference } from "../../app/stores/selectors/settingSelectors";
import SelectField from "../Layout/ui/Select";
import TextAreaField from "../Layout/ui/TextArea";
import { validateLeadActivity } from "../../core/validations/validateLeadActivity";
import type { LeadActivity } from "../../core/interfaces/Lead";
import { AddLeadActivity } from "../../app/stores/slices/leadSlice";

const initialState: LeadActivity = {
    activity_response: "",
    communication_preference: "",
    notes: "",
};

export const UpsertLeadActivity: React.FC<{
    uuid: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}> = ({
    uuid,
    open,
    onOpenChange,
    onSuccess,
}) => {

        const [data, setData] = useState<LeadActivity>(initialState);
        const [errors, setErrors] = useState<Partial<Record<keyof LeadActivity, string>>>({});
        const [isLoading, setIsLoading] = useState(false);
        const [serverError, setServerError] = useState<string | null>(null);

        const communication_preferences = useAppSelector(SelectCommunicationPreference)
        const activity_responses = useAppSelector(SelectActivityResponse)

        const dispatch = useAppDispatch()


        /* ------------------------ Handlers ------------------------ */

        const handleChange = (
            e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
        ) => {
            const { name, value } = e.target;

            setData(prev => ({
                ...prev,
                [name]: value,
            }));

            if (errors[name as keyof LeadActivity]) {
                setErrors(prev => ({ ...prev, [name]: undefined }));
            }
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            const validationErrors = validateLeadActivity(data);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            try {
                setIsLoading(true);
                setServerError(null);

                const payload = {
                    ...data,
                    uuid
                }
                await dispatch(AddLeadActivity(payload))

                onSuccess?.();
                handleClosed();
            } catch (err) {
                console.log({ err })
                setServerError("Something went wrong. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        const handleClosed = () => {
            setData(initialState);
            setErrors({});
            setServerError(null);
            onOpenChange(false);
        };

        return (
            <MotionDialog
                preset="slide"
                open={open}
                onOpenChange={onOpenChange}
            >
                <form onSubmit={handleSubmit}>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">
                            {data.uuid ? "Update" : "Add"} Lead Activity
                        </h2>

                        {serverError && (
                            <p className="mt-2 text-sm text-red-600">
                                {serverError}
                            </p>
                        )}

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-6 gap-y-4">
                            <div className="sm:col-span-6">
                                <SelectField
                                    id="activtiy-response"
                                    label="Customer Response"
                                    name="activity_response"
                                    value={data.activity_response}
                                    onChange={handleChange}
                                    options={activity_responses}
                                    placeholder="Select customer response"
                                    error={errors.activity_response}
                                />


                            </div>

                            <div className="sm:col-span-6">
                                <SelectField
                                    id="communication-preference"
                                    label="Communication Preference"
                                    name="communication_preference"
                                    value={data.communication_preference}
                                    onChange={handleChange}
                                    options={communication_preferences}
                                    placeholder="Select communcation preference"
                                    error={errors.communication_preference}
                                />
                            </div>

                            <div className="sm:col-span-6">
                                <TextAreaField
                                    id="notes"
                                    label="Notes"
                                    name="notes"
                                    value={data.notes}
                                    error={errors.notes}
                                    onChange={handleChange}
                                    placeholder="Additional notes"
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
                            ${isLoading
                                    ? "cursor-not-allowed opacity-60"
                                    : "hover:bg-indigo-500"
                                }
                        `}
                        >
                            {isLoading ? "Saving..." : "Save Activity"}
                        </button>
                    </div>
                </form>
            </MotionDialog>
        );
    };
