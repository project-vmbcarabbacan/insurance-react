import { Card } from "../Layout/ui/Card"
import { Tabs } from "../Layout/ui/Tabs"
import { LeadDetailActivity } from "./LeadDetailSection/Activity"
import { LeadAudits } from "./LeadDetailSection/Audit";
import { LeadDocumentUploader } from "./LeadDetailSection/Document";
import { LeadDetailView } from "./LeadDetailSection/View";

interface LeadSectionDetailProp {
    leadUuid: string;
    activeTab: string;
    onActiveTab: (activeTab: string) => void;
}

export const LeadDetailSection: React.FC<LeadSectionDetailProp> = ({
    leadUuid,
    activeTab,
    onActiveTab
}) => {


    return (
        <div className="lg:col-span-2 space-y-6" id="lead-detail-section">
            <Card noPadding className="overflow-hidden">
                <div className="px-6 pt-2">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <Tabs
                                tabs={[
                                    { id: 'view', label: 'View' },
                                    { id: 'activity', label: 'Activity' },
                                    { id: 'documents', label: 'Documents' },
                                    { id: 'policies', label: 'Policies' },
                                    { id: 'audits', label: 'Audits' }
                                ]}
                                activeTab={activeTab}
                                onChange={onActiveTab}
                            />
                        </div>

                    </div>
                </div>

                <div className="p-6">

                    {activeTab === 'view' && <LeadDetailView />}
                    {activeTab === 'activity' && <LeadDetailActivity />}
                    {activeTab === 'documents' && <LeadDocumentUploader lead_uuid={leadUuid} />}
                    {activeTab === 'audits' && <LeadAudits lead_uuid={leadUuid} />}


                </div>
            </Card>
        </div>
    )
}