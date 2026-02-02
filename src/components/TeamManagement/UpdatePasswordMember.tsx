import type { TeamPassword } from "../../core/interfaces/Team";
import { MotionDialog } from "../Layout/ui/Dialog";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/stores/hooks";
import { resetTeamForm, setTeamFormErrors, setTeamFormPasswordField, UpdateTeamPassword } from "../../app/stores/slices/teamSlice";
import InputField from "../Layout/ui/Input";
import type { RootState } from "../../app/stores/store";
import { validateTeamPasswordForm } from "../../core/validations/validateTeamPasswordForm";
import { useState } from "react";


export const UpdatePasswordMember: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}> = ({
    open,
    onOpenChange,
    onSuccess
}) => {
        const dispatch = useAppDispatch();
        const { password, errors, isLoading, serverError } = useSelector(
            (state: RootState) => state.team.form
        );

        const [copied, setCopied] = useState(false);

        /* ------------------------ Handlers ------------------------ */

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                setTeamFormPasswordField({
                    field: e.target.name as keyof TeamPassword,
                    value: e.target.value,
                })
            );
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            const validationErrors = validateTeamPasswordForm(password);
            if (Object.keys(validationErrors).length > 0) {
                console.log('error')
                console.log({ validationErrors })
                dispatch(setTeamFormErrors(validationErrors));
                return;
            }
            console.log('success')
            const result = await dispatch(UpdateTeamPassword(password));

            if (UpdateTeamPassword.fulfilled.match(result)) {
                onSuccess?.();
                handleClosed()
            }
        };

        const handleClosed = () => {
            dispatch(resetTeamForm());
            onOpenChange(false);
        }

        /* ------------------------ Password Utilities ------------------------ */

        // Generate a strong random password
        const generatePassword = () => {
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(@#$%!^&*(){}[].,).";
            let generated = "";
            for (let i = 0; i < 16; i++) {
                generated += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            dispatch(
                setTeamFormPasswordField({
                    field: "password",
                    value: generated,
                })
            );
            setCopied(false);
        };

        // Copy password to clipboard
        const copyPassword = () => {
            const passwordInput = document.getElementById("password") as HTMLInputElement | null;
            if (!passwordInput) return;

            // Temporarily change type to text
            const originalType = passwordInput.type;
            passwordInput.type = "text";
            passwordInput.select();

            try {
                const successful = document.execCommand("copy");
                if (successful) {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                } else {
                    alert("Cannot copy. Press Ctrl+C / Cmd+C to copy manually.");
                }
            } catch (err) {
                alert("Cannot copy. Press Ctrl+C / Cmd+C to copy manually.");
            }

            // Restore original type
            passwordInput.type = originalType;
        };



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
                            Update Password Member
                        </h2>

                        {serverError && (
                            <p className="mt-2 text-sm text-red-600">{serverError}</p>
                        )}

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <InputField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={password.password}
                                    error={errors.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                />
                            </div>
                            {/* Buttons for generate and copy */}
                            <div className="sm:col-span-6 flex gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={generatePassword}
                                    className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                                >
                                    Generate Password
                                </button>

                                <button
                                    type="button"
                                    onClick={copyPassword}
                                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                >
                                    {copied ? "Copied!" : "Copy"}
                                </button>
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
                            {isLoading ? "Saving..." : "Save Password"}
                        </button>
                    </div>
                </form>
            </MotionDialog>
        )
    }