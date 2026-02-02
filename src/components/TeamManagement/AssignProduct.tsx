import { MotionDialog } from "../Layout/ui/Dialog";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/stores/store";
import SwitchField from "../Layout/ui/Switch";
import { useAppDispatch } from "../../app/stores/hooks";
import { toggleInsuranceProductSwitch, UpsertTeamProductAccessed } from "../../app/stores/slices/teamSlice";

export const AssignProduct: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}> = ({
    open,
    onOpenChange,
    onSuccess
}) => {
        const accessed = useSelector((state: RootState) => state.team.form.insuranceProducts);
        const dispatch = useAppDispatch();

        const { isLoading, } = useSelector(
            (state: RootState) => state.team.form
        );

        const handleSwitchChange = (value: string) => {
            dispatch(toggleInsuranceProductSwitch(value));
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            dispatch(UpsertTeamProductAccessed(accessed))
            onSuccess?.();
            handleClosed()
        };

        const handleClosed = () => {
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
                            Assign Product
                        </h2>

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                {Object.entries(accessed.accessed).map(([key, value]) => (
                                    <SwitchField
                                        key={key} // Use the key as the React key prop
                                        id={key} // Use the key for the id as well
                                        label={key} // Assuming key is the product name, you can also map it to labels
                                        name={key} // Use the key for the name
                                        checked={accessed.accessed[key]} // Access the state using the key
                                        onChange={() => handleSwitchChange(key)} // Dispatch action to toggle state
                                    />
                                ))}
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
                            {isLoading ? "Saving..." : "Save Products"}
                        </button>
                    </div>
                </form>
            </MotionDialog>
        )
    }