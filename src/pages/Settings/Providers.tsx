import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Button } from "../../components/Layout/ui/Button";
import { DataTable, type Column } from "../../components/Layout/ui/Datatable";
import { useAppDispatch, useAppSelector } from "../../app/stores/hooks";
import { Pagination } from "../../components/Layout/ui/Pagination";
import { useSelector } from "react-redux";
import { SelectStatuses } from "../../app/stores/selectors/settingSelectors";
import { selectPolicyProviders } from "../../app/stores/selectors/policyProviderSelectors";
import type { PolicyForm, PolicyPagination, PolicyResponse, PolicyStatus } from "../../core/interfaces/Policy";
import { PolicyPaginate, PolicySearch, PolicyUpdateStatus, setPolicyProviderFormField } from "../../app/stores/slices/policyProviderSlice";
import { UpsertPolicyProvider } from "../../components/Settings/Providers/UpsertPolicyProvider";
import { PolicyProviderRowAction } from "../../components/Settings/Providers/PolicyProviderRowAction";

export function Providers() {
    const dispatch = useAppDispatch();

    const policyData = useSelector(selectPolicyProviders);
    const statuses = useSelector(SelectStatuses);

    const { current_page, last_page } = useAppSelector(state => state.policy_provider);

    /* ------------------------ Local State ------------------------ */
    const [copen, setCopen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    const [filterData, setFilterData] = useState<PolicyPagination>({
        page: 1,
        per_page: 10,
        status: "",
        keyword: "",
    });

    /* ------------------------ Handlers ------------------------ */
    const openPolicyProvider = async (uuid: string) => {
        if (typeof uuid === 'string') {
            const response = await dispatch(PolicySearch(uuid))
            if (PolicySearch.fulfilled.match(response)) {
                const provider = response.payload.data.policy_provider;

                for (const [key, value] of Object.entries(provider)) {
                    dispatch(
                        setPolicyProviderFormField({
                            field: key as keyof PolicyForm,
                            value: String(value ?? ""),
                        })
                    );
                }

            }
        }

        setCopen(true)
    };

    const handleUpdateStatus = async (uuid: string, status: string) => {
        const payload = {
            uuid,
            status
        } as PolicyStatus

        await dispatch(PolicyUpdateStatus(payload))
        dispatch(PolicyPaginate(filterData))
    }


    const handlePageChange = useCallback((page: number) => {
        setFilterData(prev => ({ ...prev, page }));
    }, []);

    const handleStatusChange = useCallback((status: "" | "active" | "inactive") => {
        setFilterData(prev => ({
            ...prev,
            page: 1,
            status,
        }));
    }, []);

    const handleKeywordChange = (keyword: string) => {
        setSearchKeyword(keyword);
    };



    /* ------------------------ Debounce Keyword ------------------------ */
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilterData(prev => ({
                ...prev,
                page: 1,
                keyword: searchKeyword,
            }));
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchKeyword]);


    /* ------------------------ API Calls ------------------------ */
    useEffect(() => {
        dispatch(PolicyPaginate(filterData));
    }, [filterData, dispatch]);

    /* ------------------------ Table Columns ------------------------ */
    const columns: Column<PolicyResponse>[] = [
        { key: "code", header: "Code", width: "w-48" },
        { key: "name", header: "Name", width: "w-48" },
        { key: "email", header: "Email", width: "w-64" },
        { key: "phone", header: "Phone", width: "w-32" },
        {
            key: "status",
            header: "Status",
            width: "w-32",
            render: value => (
                <span
                    className={`px-2 py-1 text-xs rounded font-medium ${value === "Active"
                        ? "bg-green-100 text-green-700"
                        : value === "Inactive"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                >
                    {value}
                </span>
            ),
        },
        {
            key: "actions",
            header: "",
            width: "w-16",
            render: (_, row) => (
                <PolicyProviderRowAction
                    row={row as PolicyResponse}
                    handleEdit={openPolicyProvider}
                    handleStatus={handleUpdateStatus}
                />
            ),
        },
    ];

    /* ------------------------ JSX ------------------------ */
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Policy Providers
                    </h1>
                </div>
                <div className="flex gap-3">
                    {/* Modal Dialogs */}
                    <UpsertPolicyProvider
                        open={copen}
                        onOpenChange={setCopen}
                        onSuccess={() => dispatch(PolicyPaginate(filterData))}
                    />

                    <Button
                        onClick={openPolicyProvider}
                        leftIcon={<Plus className="w-4 h-4" />}
                    >
                        Add Provider
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <div className="flex flex-col sm:flex-row sm:gap-3 flex-1 w-full">

                        {/* Status Filter */}
                        <select
                            value={filterData.status}
                            onChange={e => handleStatusChange((e.target.value) as "" | "active" | "inactive")}
                            className="
                w-full sm:w-auto h-12 rounded-lg px-4 mt-2 sm:mt-0
                border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
                        >
                            <option value="">All Status</option>
                            {statuses
                                .map(status => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search policy provider..."
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

                {/* Table */}
                <div className="p-6 bg-gray-50 min-h-[200px] overflow-x-auto">
                    <DataTable
                        columns={columns.map(col => ({
                            ...col,
                            width: col.width ? col.width.replace("w-", "min-w-[") + "px]" : "min-w-[80px]",
                        }))}
                        data={policyData}
                        rowKey={row => row.uuid}
                    />
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={current_page}
                    totalPages={last_page}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
