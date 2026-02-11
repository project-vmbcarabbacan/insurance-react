import { Card } from "../Layout/ui/Card"
import { Tabs } from "../Layout/ui/Tabs"
import { Button } from "../Layout/ui/Button"
import { LeadDetailActivity } from "./LeadDetailSection/Activity"
import { FileText } from "lucide-react";
import { LeadDetailView } from "./LeadDetailSection/View";

interface LeadSectionDetailProp {
    activeTab: string;
    onActiveTab: (activeTab: string) => void;
}

export const LeadDetailSection: React.FC<LeadSectionDetailProp> = ({
    activeTab,
    onActiveTab
}) => {


    return (
        <div className="lg:col-span-2 space-y-6">
            <Card noPadding className="overflow-hidden">
                <div className="px-6 pt-2">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <Tabs
                                tabs={[
                                    { id: 'view', label: 'View' },
                                    { id: 'activity', label: 'Activity' },
                                    { id: 'notes', label: 'Notes' },
                                    { id: 'policies', label: 'Policies' }
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
    )
}