import { useCallback, useEffect, useState } from "react"
import { Card } from "../Layout/ui/Card"
import { Tabs } from "../Layout/ui/Tabs"
import { CustomerProductAction } from "./CustomerProductAction"
import { useAppDispatch, useAppSelector } from "../../app/stores/hooks"
import { useNavigate } from "react-router-dom"
import LeadDetails from "./LeadDetails"
import { ManageLeadActivity } from "../../app/stores/slices/settingSlice"
import type { LeadDetail, LeadFilter } from "../../core/interfaces/Lead"
import { GetLeads } from "../../app/stores/slices/leadSlice"
import { ViewDetails } from "./ViewDetails"
import { UpsertLeadActivity } from "./UpsertLeadActivity"
import { Pagination } from "../Layout/ui/Pagination"
import { Search } from "lucide-react"

interface LeadActionProp {
    customer_id: string
    rowUuid: string
    handleRowClick: (lead: LeadDetail) => void;
    handleViewProudct: (lead: LeadDetail) => void
}

export const LeadSection: React.FC<LeadActionProp> = ({
    customer_id,
    rowUuid,
    handleRowClick,
    handleViewProudct
}) => {

    const customer = useAppSelector(state => state.customer.customer)
    const leads = useAppSelector(state => state.lead.leads)
    const lead = useAppSelector(state => state.lead.lead)
    const view = useAppSelector(state => state.lead.view)
    const { current_page, last_page } = useAppSelector(state => state.lead);
    const [filter, setFilter] = useState<LeadFilter>({
        customer_uuid: customer_id,
        page: 1,
        per_page: 4,
        keyword: "",
    })

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    /* ------------------------ Local State ------------------------ */
    const [activeTab, setActiveTab] = useState<string>('leads');
    const [vopen, setVopen] = useState<boolean>(false);
    const [laOpen, setlaOpen] = useState<boolean>(false);
    const [leadUuid, setLeadUuid] = useState<string>('')
    const [searchKeyword, setSearchKeyword] = useState("");


    /* ------------------------ Handlers ------------------------ */
    const handlePageChange = useCallback((page: number) => {
        setFilter(prev => ({ ...prev, page }));
    }, []);

    const handleKeywordChange = (keyword: string) => {
        setSearchKeyword(keyword);
    };

    const HandleAddLead = (uuid: string, product: string) => {
        navigate(`/leads/${product}/create/${uuid}`)
    }

    const handleEditProduct = (lead: LeadDetail) => {
        navigate(`/leads/${lead.product}/update/${customer_id}/${lead.uuid}`)
    }

    const handleAddLeadActivity = (lead: LeadDetail) => {
        dispatch(ManageLeadActivity(lead.uuid))
        setLeadUuid(lead.uuid)
        setlaOpen(true)
    }

    /* ------------------------ Debounce Keyword ------------------------ */
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilter(prev => ({
                ...prev,
                page: 1,
                keyword: searchKeyword,
            }));
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchKeyword]);

    /* ------------------------ Use effect ------------------------ */
    useEffect(() => {
        dispatch(GetLeads(filter));
    }, [filter, dispatch]);


    const handleView = (lead: LeadDetail) => {
        handleViewProudct(lead)
        setVopen(true)
    }

    return (
        <div className="lg:col-span-2 space-y-6">
            {/* modals */}
            <ViewDetails
                open={vopen}
                onOpenChange={setVopen}
                lead={lead}
                leadSections={view}
            />

            <UpsertLeadActivity
                uuid={leadUuid}
                open={laOpen}
                onOpenChange={setlaOpen}
            />

            <Card noPadding className="flex flex-col h-[650px] sm:h-[462px] overflow-hidden">
                <div className="px-6 pt-2">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        {/* Left Section (Tabs + Search) */}
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6 flex-1">

                            {/* Tabs */}
                            <Tabs
                                tabs={[{ id: 'leads', label: 'Leads' }]}
                                activeTab={activeTab}
                                onChange={setActiveTab}
                            />

                            {/* Search Input */}
                            <div className="relative w-full lg:max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search leads..."
                                    value={searchKeyword}
                                    onChange={e => handleKeywordChange(e.target.value)}
                                    className="
                        w-full pl-12 pr-4 h-12 rounded-lg
                        border border-gray-300 dark:border-gray-700
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                        placeholder-gray-400 dark:placeholder-gray-500
                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                    "
                                />
                            </div>

                        </div>

                        {/* Right Section (Action Button) */}
                        <div className="w-full lg:w-auto">
                            <CustomerProductAction
                                row={customer}
                                handleAdd={HandleAddLead}
                            />
                        </div>

                    </div>
                </div>

                <div className="p-6 flex-1 overflow-y-hidden">
                    {
                        activeTab === 'leads' && (
                            <LeadDetails
                                leads={leads}
                                rowUuid={rowUuid}
                                onView={handleView}
                                onEdit={handleEditProduct}
                                onActivity={handleAddLeadActivity}
                                onRowClick={handleRowClick}
                            />
                        )
                    }

                </div>

                <Pagination
                    currentPage={current_page}
                    totalPages={last_page}
                    onPageChange={handlePageChange}
                />
            </Card>
        </div>
    )
}