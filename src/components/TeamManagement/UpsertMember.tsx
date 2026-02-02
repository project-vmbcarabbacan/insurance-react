import type { AddTeam } from "../../core/interfaces/Team";
import { MotionDialog } from "../Layout/ui/Dialog";
import { useSelector } from "react-redux";
import { selectRoles } from "../../app/stores/selectors/settingSelectors";
import { useAppDispatch } from "../../app/stores/hooks";
import { resetTeamForm, setTeamFormErrors, setTeamFormField, UpsertMemberPost } from "../../app/stores/slices/teamSlice";
import InputField from "../Layout/ui/Input";
import SelectField from "../Layout/ui/Select";
import type { RootState } from "../../app/stores/store";
import { validateTeamForm } from "../../core/validations/validateTeamForm";


export const UpsertMember: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}> = ({
    open,
    onOpenChange,
    onSuccess
}) => {
        const roles = useSelector(selectRoles);
        const dispatch = useAppDispatch();
        const { data, errors, isLoading, serverError } = useSelector(
            (state: RootState) => state.team.form
        );

        /* ------------------------ Handlers ------------------------ */

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            dispatch(
                setTeamFormField({
                    field: e.target.name as keyof AddTeam,
                    value: e.target.value,
                })
            );
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            const validationErrors = validateTeamForm(data);
            if (Object.keys(validationErrors).length > 0) {
                dispatch(setTeamFormErrors(validationErrors));
                return;
            }

            const result = await dispatch(UpsertMemberPost(data));

            if (UpsertMemberPost.fulfilled.match(result)) {
                onSuccess?.();
                handleClosed()
            }
        };

        const handleClosed = () => {
            dispatch(resetTeamForm());
            onOpenChange(false);
        }

        return (
            <MotionDialog
                preset="slide"
                open={open}
                onOpenChange={onOpenChange}
            >

                {/* Visible content */}
                <form onSubmit={handleSubmit}>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">
                            {
                                data.uuid ? 'Update ' : 'Add '
                            }
                            Member
                        </h2>

                        {serverError && (
                            <p className="mt-2 text-sm text-red-600">{serverError}</p>
                        )}

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <InputField
                                    id="name"
                                    label="Full Name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    error={errors.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="sm:col-span-6">
                                <InputField
                                    id="email"
                                    label="Email address"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    error={errors.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="sm:col-span-6">
                                <SelectField
                                    id="role"
                                    label="Role"
                                    name="role_slug"
                                    value={data.role_slug}
                                    options={roles.filter(role => !['super_admin'].includes(String(role.value)))}
                                    onChange={handleChange}
                                    error={errors.role_slug}
                                    placeholder="Select Role"
                                />
                            </div>

                            {
                                !data.uuid && (
                                    <div className="sm:col-span-6">
                                        <InputField
                                            id="Password"
                                            label="Password"
                                            type="text"
                                            name="password"
                                            value={data.password}
                                            error={errors.password}
                                            onChange={handleChange}
                                            placeholder="Enter password"
                                        />
                                    </div>
                                )
                            }
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
                            {isLoading ? "Saving..." : "Save Member"}
                        </button>
                    </div>
                </form>
            </MotionDialog>
        )
    }