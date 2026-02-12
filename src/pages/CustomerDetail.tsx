import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { Button } from '../components/Layout/ui/Button';
import { Card } from '../components/Layout/ui/Card';
import { Avatar } from '../components/Layout/ui/Avatar';
import { Badge } from '../components/Layout/ui/Badge';
import { useAppDispatch, useAppSelector } from '../app/stores/hooks';
import { CustomerDetail } from '../app/stores/slices/customerSlice';
import ContactInfoCard from '../components/CustomerDetails/ContactInformation';
import GoBack from '../components/Layout/ui/GoBack';
import { ManageCustomerDetail } from '../app/stores/slices/settingSlice';
import { LeadSection } from '../components/CustomerDetails/LeadSection';
import { LeadDetailSection } from '../components/CustomerDetails/LeadDetailSection';
import type { LeadDetail } from '../core/interfaces/Lead';
import { GetLeadActivity } from '../app/stores/slices/leadSlice';
import { ViewVehicleLeadProduct } from '../app/stores/slices/vehicleSlice';
import { ViewHealthLeadProduct } from '../app/stores/slices/healthSlice';
import { AllDocumentsByLead } from '../app/stores/slices/documentSlice';
import type { AuditForm } from '../core/interfaces/Audit';
import { getAudits } from '../app/stores/slices/auditSlice';

export function CustomerDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { customer_id } = useParams<{ customer_id: string }>();
  const [rowUuid, setRowUuid] = useState<string>("")
  const [product, setProduct] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>('view');

  const customer = useAppSelector(state => state.customer.customer)
  const leads = useAppSelector(state => state.lead.leads)

  /* ------------------------ Handlers ------------------------ */
  const handleRowClick = (lead: LeadDetail) => {
    setRowUuid(lead.uuid)
    setProduct(lead.product)
  }

  /* ------------------------ Check customer_id ------------------------ */
  useEffect(() => {
    if (!customer_id) {
      // Redirect and **return early**, do NOT call setState
      navigate("/customers", { replace: true });
      return;
    }

  }, [customer_id, navigate]);

  useEffect(() => {
    dispatch(CustomerDetail(String(customer_id)))
  }, [customer_id, dispatch])

  React.useEffect(() => {
    if (!rowUuid && leads.length > 0) {
      const lead = leads[0]
      setRowUuid(lead.uuid)
      setProduct(lead.product)
    }
  }, [rowUuid, leads])

  useEffect(() => {
    dispatch(ManageCustomerDetail())
  }, [dispatch])

  useEffect(() => {
    if (!rowUuid) return

    if (activeTab === 'activity') {
      dispatch(GetLeadActivity(rowUuid))
    }
    else if (activeTab === 'view') {
      if (product === 'vehicle') {
        dispatch(ViewVehicleLeadProduct(rowUuid))
      } else if (product === 'health') {
        dispatch(ViewHealthLeadProduct(rowUuid))
      }
    } else if (activeTab === 'documents') {
      dispatch(AllDocumentsByLead(rowUuid))
    } else if (activeTab === 'audits') {
      dispatch(getAudits({
        page: 1,
        morph: 'lead',
        uuid: rowUuid
      } as AuditForm))
    }

  }, [rowUuid, product, activeTab, dispatch])

  if (!customer_id) return null;


  return <div className="space-y-6">


    {/* Header */}
    <GoBack />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Profile */}
      <div className="space-y-6">
        <Card className="text-center">
          <div className="flex flex-col items-center">
            <Avatar fallback={customer.initials} size="lg" className="w-24 h-24 text-2xl mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {customer.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {customer.contact_person}
            </p>
            <div className="mt-4 flex gap-2">
              <Badge variant="success">{customer.status}</Badge>
            </div>
            <div className="mt-6 flex gap-3 w-full">
              <Button
                className="flex-1"
                leftIcon={<Mail className="w-4 h-4" />}
                onClick={() => (window.location.href = `mailto:${customer.email}`)}
              >
                Email
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                leftIcon={<Phone className="w-4 h-4" />}
                onClick={() => (window.location.href = `tel:${customer.phone_country_code}${customer.phone_number}`)}
              >
                Call
              </Button>
            </div>
          </div>
        </Card>


        <ContactInfoCard
          customer={customer}
        />

      </div>

      {/* Right Column: Content */}
      <LeadSection
        rowUuid={rowUuid}
        customer_id={customer_id}
        handleRowClick={handleRowClick}
        handleViewProudct={handleRowClick}
      />
    </div>

    <LeadDetailSection
      activeTab={activeTab}
      onActiveTab={setActiveTab}
      leadUuid={rowUuid}
    />
  </div>;
}