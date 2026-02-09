import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MoreHorizontal, MessageSquare, PhoneCall, Video, FileText } from 'lucide-react';
import { Button } from '../components/Layout/ui/Button';
import { Card } from '../components/Layout/ui/Card';
import { Avatar } from '../components/Layout/ui/Avatar';
import { Badge } from '../components/Layout/ui/Badge';
import { Tabs } from '../components/Layout/ui/Tabs';
import type { Activity } from '../core/types/crm';
import { useAppDispatch, useAppSelector } from '../app/stores/hooks';
import { CustomerDetail } from '../app/stores/slices/customerSlice';
import ContactInfoCard from '../components/CustomerDetails/ContactInformation';
import LeadDetails from '../components/CustomerDetails/LeadDetails';
import { ViewVehicleLeadProduct } from '../app/stores/slices/vehicleSlice';
import type { LeadDetail } from '../core/interfaces/Lead';
import { ViewHealthLeadProduct } from '../app/stores/slices/healthSlice';
import { ViewDetails } from '../components/CustomerDetails/ViewDetails';
import GoBack from '../components/Layout/ui/GoBack';

const mockActivities: Activity[] = [{
  id: '1',
  type: 'email',
  title: 'Sent proposal for Q4',
  description: 'Attached the updated pricing deck for review.',
  date: '2 hours ago',
  userId: '1'
}, {
  id: '2',
  type: 'meeting',
  title: 'Product Demo',
  description: 'Walked through the new reporting features. Client seemed impressed.',
  date: 'Yesterday',
  userId: '1'
}, {
  id: '3',
  type: 'call',
  title: 'Discovery Call',
  description: 'Discussed requirements and timeline.',
  date: '3 days ago',
  userId: '1'
}, {
  id: '4',
  type: 'note',
  title: 'Internal Note',
  description: 'Budget approval pending from their CFO.',
  date: '1 week ago',
  userId: '1'
}];
export function CustomerDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { customer_id } = useParams<{ customer_id: string }>();
  const [vopen, setVopen] = useState(false);

  const customer = useAppSelector(state => state.customer.customer)
  const leads = useAppSelector(state => state.lead.leads)
  const lead = useAppSelector(state => state.lead.lead)
  const view = useAppSelector(state => state.lead.view)


  const [activeTab, setActiveTab] = useState('leads');
  // Mock data - in real app would fetch by ID

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'call':
        return <PhoneCall className="w-4 h-4" />;
      case 'meeting':
        return <Video className="w-4 h-4" />;
      case 'note':
        return <FileText className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'bg-blue-100 text-blue-600';
      case 'call':
        return 'bg-green-100 text-green-600';
      case 'meeting':
        return 'bg-purple-100 text-purple-600';
      case 'note':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

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

  if (!customer_id) return null;

  const handleEdit = (field: string) => {
    console.log("Edit field:", field);
    // Open modal or inline edit
  };

  const handleViewProudct = (lead: LeadDetail) => {
    if (lead.product === 'vehicle') {
      dispatch(ViewVehicleLeadProduct(lead.uuid))
    } else if (lead.product === 'health') {
      dispatch(ViewHealthLeadProduct(lead.uuid))
    }

    setVopen(true)
  }

  const handleEditProduct = (lead: LeadDetail) => {
    navigate(`/leads/${lead.product}/update/${customer_id}/${lead.uuid}`)
  }

  return <div className="space-y-6">
    {/* modals */}
    <ViewDetails
      open={vopen}
      onOpenChange={setVopen}
      lead={lead}
      leadSections={view}
    />

    {/* Header */}
    <GoBack />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Profile */}
      <div className="space-y-6">
        <Card className="text-center">
          <div className="flex justify-end mb-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
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
                onClick={() => (window.location.href = `tel:${customer.phone}`)}
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
      <div className="lg:col-span-2 space-y-6">
        <Card noPadding className="overflow-hidden">
          <div className="px-6 pt-2">
            <Tabs tabs={[{
              id: 'leads',
              label: 'Leads'
            }, {
              id: 'activity',
              label: 'Activity'
            }, {
              id: 'notes',
              label: 'Notes'
            }, {
              id: 'deals',
              label: 'Deals'
            }]} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          <div className="p-6">
            {
              activeTab === 'leads' && (
                <LeadDetails
                  leads={leads}
                  onView={handleViewProudct}
                  onEdit={handleEditProduct}
                  onDelete={(lead) => console.log('Delete', lead)}
                />
              )
            }

            {activeTab === 'activity' && <div className="space-y-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Timeline
                </h3>
                <Button size="sm" variant="secondary">
                  Log Activity
                </Button>
              </div>

              <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-8 pb-4">
                {mockActivities.map(activity => <div key={activity.id} className="relative pl-8">
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${activity.type === 'call' ? 'bg-green-500' : activity.type === 'meeting' ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {activity.date}
                    </span>
                  </div>
                </div>)}
              </div>
            </div>}

            {activeTab === 'notes' && <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No notes yet. Start typing to add one.</p>
              <Button variant="secondary" className="mt-4">
                Add Note
              </Button>
            </div>}
          </div>
        </Card>
      </div>
    </div>
  </div>;
}