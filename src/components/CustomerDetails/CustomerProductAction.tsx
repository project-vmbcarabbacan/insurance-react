import { Car, HeartPlus, Home, Plane, PawPrint } from "lucide-react";
import { useSelector } from "react-redux";
import { SelectProducts } from "../../app/stores/selectors/settingSelectors";
import ActionMenu from "../Layout/ui/ActionMenu";

interface Customer {
    uuid: string;
    email: string;
    phone_number: string;
    phone_country_code: string;
}

interface CustomerProductActionProps {
    row: Customer;
    handleAdd?: (uuid: string, product: string) => void;
}

export const CustomerProductAction: React.FC<CustomerProductActionProps> = ({
    row,
    handleAdd,
}) => {
    const products = useSelector(SelectProducts);

    const actions = [
        ...products.map(product => {
            let Icon: React.ElementType;
            switch (product.value) {
                case "health":
                    Icon = HeartPlus;
                    break;
                case "home":
                    Icon = Home;
                    break;
                case "travel":
                    Icon = Plane;
                    break;
                case "pet":
                    Icon = PawPrint;
                    break;
                case "vehicle":
                default:
                    Icon = Car;
                    break;
            }

            return {
                label: `Add ${product.label}`,
                icon: Icon,
                onClick: () => handleAdd?.(row.uuid, String(product.value)),
            };
        }),
    ].filter(Boolean) as any;

    return (
        <ActionMenu
            trigger={({ ref, onClick, ...aria }) => (
                <button
                    ref={ref}
                    onClick={onClick}
                    {...aria}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 12h.01M12 12h.01M18 12h.01"
                        />
                    </svg>
                </button>
            )}
            actions={actions}
        />
    );
};
