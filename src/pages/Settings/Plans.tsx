import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { HeartPlus, Home, Plane, PawPrint, Car, Plus, Search } from 'lucide-react';
import { Card } from '../../components/Layout/ui/Card';

import { useAppDispatch, useAppSelector } from '../../app/stores/hooks';
import { ManagePlan } from '../../app/stores/slices/settingSlice';
import { selectPolicyProvider, SelectProducts, SelectStatuses } from '../../app/stores/selectors/settingSelectors';
import { Button } from '../../components/Layout/ui/Button';
import { DataTable, type Column } from '../../components/Layout/ui/Datatable';
import type { PlanPagination, PlanResponse, PlanStatus } from '../../core/interfaces/Plan';
import { AddPlan, PlanPaginate, PlanUpdateStatus, UpdatePlan } from '../../app/stores/slices/planSlice';
import { UpsertPlan } from '../../components/Settings/Plans/UpsertPlan';
import { PlanRowAction } from '../../components/Settings/Plans/PlanRowAction';
import { Pagination } from '../../components/Layout/ui/Pagination';


export const Plans: React.FC = () => {

  const [popen, setPopen] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const products = useAppSelector(SelectProducts)
  const statuses = useAppSelector(SelectStatuses)
  const policy_providers = useAppSelector(selectPolicyProvider)
  const { current_page, last_page } = useAppSelector(state => state.plan);


  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterData, setFilterData] = useState<PlanPagination>({
    page: 1,
    per_page: 10,
    status: "",
    keyword: "",
    code: "",
    provider: "",
  });

  const planData = useAppSelector(state => state.plan.plans)

  /* ------------------------ Menus ------------------------ */
  const [activeProduct, setActiveProduct] = useState<string | null>("vehicle")
  const menus = useMemo(() => {
    return products.map(product => {
      let Icon: React.ElementType

      switch (product.value) {
        case "health":
          Icon = HeartPlus
          break
        case "home":
          Icon = Home
          break
        case "travel":
          Icon = Plane
          break
        case "pet":
          Icon = PawPrint
          break
        case "vehicle":
        default:
          Icon = Car
          break
      }

      return {
        label: `${product.label}`,
        icon: Icon,
        value: String(product.value),
        active: activeProduct === String(product.value),
      }
    })
  }, [products, activeProduct])

  /* ------------------------ Table Columns ------------------------ */

  const columns: Column<PlanResponse>[] = [
    { key: "provider", header: "Provider", width: "w-64" },
    { key: "code", header: "Code", width: "w-48" },
    { key: "name", header: "Plan", width: "w-64" },
    { key: "description", header: "Description", width: "w-120" },
    { key: "currency", header: "Currency", width: "w-48" },
    { key: "base_premium", header: "Base Premium", width: "w-48" },
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
        <PlanRowAction
          row={row as PlanResponse}
          handleEdit={openCustomer}
          handleStatus={updateStatus}
        />
      ),
    },
  ]


  /* ------------------------ API Calls ------------------------ */

  useEffect(() => {

    dispatch(PlanPaginate({
      ...filterData,
      code: activeProduct || 'vehicle'
    }))

  }, [dispatch, activeProduct, filterData])

  useEffect(() => {
    if (filterData.code) {
      dispatch(PlanPaginate(filterData))
    }
  }, [dispatch, filterData])

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

  useEffect(() => {
    dispatch(ManagePlan())
  }, [dispatch])

  /* ------------------------ Handler ------------------------ */
  const handleUpdateMenu = useCallback((value: string) => {
    setActiveProduct(value)
    setFilterData(prev => ({
      ...prev,
      code: value
    }))
  }, [])

  const AddPlanHandle = () => {
    dispatch(AddPlan(String(activeProduct)))
    setPopen(true)
  }

  const openCustomer = (uuid: string) => {
    dispatch(UpdatePlan(uuid))
    setPopen(true)
  }

  const updateStatus = async (uuid: string, status: string) => {
    const payload = {
      uuid,
      status
    } as PlanStatus

    await dispatch(PlanUpdateStatus(payload))
    dispatch(PlanPaginate(filterData))
  }

  const handleStatusChange = useCallback((status: "active" | "inactive" | "") => {
    setFilterData(prev => ({
      ...prev,
      page: 1,
      status,
    }));
  }, []);

  const handleProviderChange = useCallback((provider: string) => {
    setFilterData(prev => ({
      ...prev,
      page: 1,
      provider,
    }));
  }, []);

  const handleKeywordChange = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handlePageChange = useCallback((page: number) => {
    setFilterData(prev => ({ ...prev, page }));
  }, []);


  return (
    <div className="max-w-7xl mx-auto px-2 py-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white md:text-left">
            Plans
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage insurance plans per product
          </p>
        </div>
        <div>
          <UpsertPlan
            open={popen}
            onOpenChange={setPopen}
          />
          <Button
            onClick={AddPlanHandle}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Plan
          </Button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Sidebar */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-2 shadow-sm border border-gray-100 dark:border-gray-800 space-y-1">
            {menus.map(({ label, icon: Icon, active, value }) => (
              <button
                key={value}
                onClick={() => handleUpdateMenu(value)}
                className={`
                  group relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                {/* Active indicator */}
                {active && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md" />
                )}

                {/* Icon */}
                <Icon
                  className={`
                    w-5 h-5 transition-colors
                    ${active
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                    }
                  `}
                  strokeWidth={2}
                />

                {/* Label */}
                <span className="truncate">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-10 space-y-6">
          <Card>
            <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div className="flex flex-col sm:flex-row sm:gap-3 flex-1 w-full">

                {/* Status Filter */}
                <select
                  value={filterData.provider}
                  onChange={e => handleProviderChange(e.target.value)}
                  className="
                w-full sm:w-auto h-12 rounded-lg px-4 mt-2 sm:mt-0
                border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
                >
                  <option value="">All providers</option>
                  {policy_providers
                    .map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                </select>

                {/* Status Filter */}
                <select
                  value={filterData.status}
                  onChange={e => handleStatusChange(e.target.value as "active" | "inactive" | "")}
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
                  placeholder="Search plan..."
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

            <div className="p-6 bg-gray-50 min-h-[200px] overflow-x-auto">
              <DataTable
                columns={columns.map(col => ({
                  ...col,
                  width: col.width ? col.width.replace("w-", "min-w-[") + "px]" : "min-w-[80px]",
                }))}
                data={planData}
                rowKey={row => row.uuid}
              />
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={current_page}
              totalPages={last_page}
              onPageChange={handlePageChange}
            />
          </Card>
        </div>

      </div>
    </div>
  )
}