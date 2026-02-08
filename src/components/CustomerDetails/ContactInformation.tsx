import { Mail, Phone, Pencil } from 'lucide-react';
import React, { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { Card } from '../Layout/ui/Card';
import { useAppDispatch } from '../../app/stores/hooks';
import { PatchCustomer } from '../../app/stores/slices/customerSlice';
import PhoneNumberInput from '../Layout/ui/PhoneNumber';
import { useSelector } from 'react-redux';
import { SelectCountryCodes } from '../../app/stores/selectors/settingSelectors';

interface Customer {
    uuid: string;
    email: string;
    phone_number: string;
    phone_country_code: string;
}

interface ContactInfoCardProps {
    customer: Customer | null; // handle async data
}

type Field = 'uuid' | 'email' | 'phone_number' | 'phone_country_code' | null;

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ customer }) => {
    const [editingField, setEditingField] = useState<Field>(null);
    const [values, setValues] = useState<Customer>({
        uuid: customer?.uuid || '',
        email: customer?.email || '',
        phone_number: customer?.phone_number || '',
        phone_country_code: customer?.phone_country_code || '',
    });
    const countryCodes = useSelector(SelectCountryCodes);


    const dispatch = useAppDispatch()

    // Update values if customer changes asynchronously
    React.useEffect(() => {
        if (customer) {
            setValues({
                uuid: customer.uuid,
                email: customer.email,
                phone_number: customer.phone_number,
                phone_country_code: customer.phone_country_code,
            });
        }
    }, [customer]);

    const handleEditClick = (field: Field) => setEditingField(field);

    const handleChange = (field: Field, value: string) => {
        if (!field) return;
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = (field: Field) => {
        if (!field) return;
        setEditingField(null);
        // TODO: call API to save value
        dispatch(PatchCustomer(values))
    };

    const handleCancel = () => {
        if (!customer) return;
        setValues({ ...customer });
        setEditingField(null);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement> | ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: Field) => {
        if ('key' in e) {
            if (e.key === 'Enter') handleSave(field);
            if (e.key === 'Escape') handleCancel();
        }
    };


    if (!customer) return null; // or a loader

    return (
        <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
            </h3>

            <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-3 text-sm relative group">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {editingField === 'email' ? (
                        <input
                            type="email"
                            className="border rounded px-2 py-1 text-sm flex-1"
                            value={values.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleChange('email', e.target.value)
                            }
                            onBlur={() => handleSave('email')}
                            onKeyDown={(e) => handleKeyDown(e, 'email')}
                            autoFocus
                        />
                    ) : (
                        <a
                            href={`mailto:${values.email}`}
                            className="text-blue-600 hover:underline flex-1"
                        >
                            {values.email || '—'}
                        </a>
                    )}

                    {editingField !== 'email' && (
                        <button
                            onClick={() => handleEditClick('email')}
                            className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-gray-700"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 text-sm relative group">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {editingField === 'phone_number' ? (
                        // <input
                        //     type="tel"
                        //     className="border rounded px-2 py-1 text-sm flex-1"
                        //     value={values.phone}
                        //     onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        //         handleChange('phone', e.target.value)
                        //     }
                        //     onBlur={() => handleSave('phone')}
                        //     onKeyDown={(e) => handleKeyDown(e, 'phone')}
                        //     autoFocus
                        // />

                        <PhoneNumberInput
                            id="phone-number"
                            label="Phone number"
                            phoneName="phone_number"
                            countryCode={values.phone_country_code}
                            phoneNumber={values.phone_number}
                            countryOptions={countryCodes}
                            onCountryChange={e => handleChange("phone_country_code", e)}
                            onPhoneChange={e => handleChange("phone_number", e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, 'phone_number')}
                        />
                    ) : (
                        <span className="text-gray-700 dark:text-gray-300 flex-1">
                            {`${values.phone_country_code} ${values.phone_number}`}
                        </span>
                    )}

                    {editingField !== 'phone_number' && (
                        <button
                            onClick={() => handleEditClick('phone_number')}
                            className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-gray-700"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ContactInfoCard;
