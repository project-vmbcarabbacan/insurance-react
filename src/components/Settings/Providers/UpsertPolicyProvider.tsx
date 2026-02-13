import React, { useState, useRef } from "react";
import { useAppDispatch } from "../../../app/stores/hooks";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/stores/store";
import { validatePolicyProviderForm } from "../../../core/validations/validatePolicyProviderForm";
import { Policyadd, PolicyUpdate, resetPolicyProviderForm, setPolicyProviderFormErrors, setPolicyProviderFormField, setPolicyProviderFormLoading } from "../../../app/stores/slices/policyProviderSlice";
import type { PolicyForm } from "../../../core/interfaces/Policy";
import InputField from "../../Layout/ui/Input";
import { MotionDialog } from "../../Layout/ui/Dialog";

const SectionHeader = ({ title }: { title: string }) => (
    <div className="sm:col-span-8 mt-6">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">{title}</h3>
    </div>
);

export const UpsertPolicyProvider: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}> = ({ open, onOpenChange, onSuccess }) => {

    const dispatch = useAppDispatch();
    const { data, errors, is_loading } = useSelector(
        (state: RootState) => state.policy_provider.form
    );

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);


    /* ------------------------ Handlers ------------------------ */

    const handleFieldChange = (field: keyof PolicyForm, value: any) => {
        dispatch(setPolicyProviderFormField({ field, value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validatePolicyProviderForm(data);


        if (Object.keys(validationErrors).length > 0) {
            dispatch(setPolicyProviderFormErrors(validationErrors));
            return;
        }

        dispatch(setPolicyProviderFormLoading(true))

        if (data.uuid) {
            const result = await dispatch(PolicyUpdate(data))

            if (PolicyUpdate.fulfilled.match(result)) {
                onSuccess?.();
                handleClosed();
            }
        } else {
            const result = await dispatch(Policyadd(data));

            if (Policyadd.fulfilled.match(result)) {
                onSuccess?.();
                handleClosed();
            }
        }

    };

    const handleClosed = () => {
        dispatch(resetPolicyProviderForm());
        onOpenChange(false);
    };

    /* ------------------------ Drag to Scroll ------------------------ */
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartY(e.clientY);
        if (scrollRef.current) setScrollTop(scrollRef.current.scrollTop);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        const dy = e.clientY - startY;
        scrollRef.current.scrollTop = scrollTop - dy;
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    const handleWheel = (e: React.WheelEvent) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop += e.deltaY;
    };

    return (
        <MotionDialog preset="slide" open={open} onOpenChange={onOpenChange}>
            <form onSubmit={handleSubmit}>
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">
                        {data.uuid ? "Update" : "Add"} Policy Provider
                    </h2>


                    <div
                        ref={scrollRef}
                        className={`flex flex-col max-h-[60vh] overflow-auto px-0 py-4 cursor-${isDragging ? "grabbing" : "grab"}`}
                        style={{ WebkitOverflowScrolling: "touch", userSelect: isDragging ? "none" : "auto" }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onWheel={handleWheel} // ✅ natural wheel scroll
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-8 gap-4 px-6">
                            {/* ================= CONTACT INFORMATION ================= */}
                            <SectionHeader title="Policy Provider Information" />

                            <div className="sm:col-span-4">
                                <InputField
                                    id="code"
                                    label="Policy Code"
                                    type="code"
                                    name="code"
                                    value={data.code}
                                    error={errors.code}
                                    maxLength={20}
                                    onChange={e => handleFieldChange("code", e.target.value)}
                                    placeholder="Enter code"
                                />
                            </div>

                            <div className="sm:col-span-4">
                                <InputField
                                    id="name"
                                    label="Policy Name"
                                    type="name"
                                    name="name"
                                    value={data.name}
                                    error={errors.name}
                                    maxLength={50}
                                    onChange={e => handleFieldChange("name", e.target.value)}
                                    placeholder="Enter name"
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
                                    maxLength={100}
                                    onChange={e => handleFieldChange("email", e.target.value)}
                                    placeholder="Enter email address"
                                />
                            </div>


                            <div className="sm:col-span-4">
                                <InputField
                                    id="phone"
                                    label="Contact Number"
                                    type="phone"
                                    name="phone"
                                    maxLength={10}
                                    value={data.phone}
                                    error={errors.phone}
                                    onChange={e => handleFieldChange("phone", e.target.value)}
                                    placeholder="Enter contact number"
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3 px-6">
                    <button
                        type="button"
                        onClick={handleClosed}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={is_loading}
                        className={`inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
                        ${is_loading ? "cursor-not-allowed opacity-60" : "hover:bg-indigo-500"}`}
                    >
                        {is_loading ? "Saving..." : "Save Customer"}
                    </button>
                </div>
            </form>
        </MotionDialog>
    );
};
