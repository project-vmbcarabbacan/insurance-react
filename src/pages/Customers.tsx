import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Button } from "../components/Layout/ui/Button";
import { DataTable, type Column } from "../components/Layout/ui/Datatable";
import { useAppDispatch, useAppSelector } from "../app/stores/hooks";
import { Pagination } from "../components/Layout/ui/Pagination";
import { useSelector } from "react-redux";
import { ManageCustomer, SettingUpsertCustomer } from "../app/stores/slices/settingSlice";
import { SelectStatuses, SelectTypes } from "../app/stores/selectors/settingSelectors";
import type { Customer, CustomerFilter } from "../core/interfaces/Customer";
import { CustomerPagination, SingleCustomer } from "../app/stores/slices/customerSlice";
import { CustomerRowAction } from "../components/CustomerManagement/CustomerRowAction";
import { UpsertCustomer } from "../components/CustomerManagement/UpsertCustomer";
import RadixDateRange, { type FilterData } from "../components/Layout/ui/RadixDateRange";
import { selectCustomerAsEntities } from "../app/stores/selectors/customerSelectors";

export function Customers() {
  const dispatch = useAppDispatch();

  const customerData = useSelector(selectCustomerAsEntities);
  const types = useSelector(SelectTypes);
  const statuses = useSelector(SelectStatuses);

  const { current_page, last_page } = useAppSelector(state => state.customer);
  const navigate = useNavigate();

  /* ------------------------ Local State ------------------------ */
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const [copen, setCopen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterDate, setFilterDate] = useState<FilterData>({ startDate: null, endDate: null });

  const [filterData, setFilterData] = useState<CustomerFilter>({
    page: 1,
    per_page: 10,
    status: "",
    keyword: "",
    type: "",
    dates: []
  });

  /* ------------------------ Handlers ------------------------ */
  const openCustomer = (uuid: string) => {
    if (typeof uuid === 'string') {
      dispatch(SingleCustomer(uuid));
    }

    dispatch(SettingUpsertCustomer());
    setCopen(true)
  };

  const openLeadCreation = (uuid: string, product: string) => {
    navigate(`/${product}/create/${uuid}`)
  }

  const handlePageChange = useCallback((page: number) => {
    setFilterData(prev => ({ ...prev, page }));
  }, []);

  const handleTypeChange = useCallback((type: string) => {
    setFilterData(prev => ({
      ...prev,
      page: 1,
      type,
    }));
  }, []);

  const handleStatusChange = useCallback((status: string) => {
    setFilterData(prev => ({
      ...prev,
      page: 1,
      status,
    }));
  }, []);

  const handleKeywordChange = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleDateRange = (date: FilterData) => {
    setFilterDate(date)
  }


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

  useEffect(() => {
    if (filterDate.startDate && filterDate.endDate) {
      const timer = setTimeout(() => {
        setFilterData(prev => ({
          ...prev,
          page: 1,
          dates: [String(filterDate.startDate), String(filterDate.endDate)],
        }));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [filterDate]);

  /* ------------------------ API Calls ------------------------ */
  useEffect(() => {
    dispatch(CustomerPagination(filterData));
  }, [filterData, dispatch]);

  useEffect(() => {
    dispatch(ManageCustomer());
  }, [dispatch]);

  /* ------------------------ Table Columns ------------------------ */
  const columns: Column<Customer>[] = [
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
    { key: "type", header: "Type", width: "w-32" },
    {
      key: "actions",
      header: "",
      width: "w-16",
      render: (_, row) => (
        <CustomerRowAction
          row={row as Customer}
          openRowId={openRowId}
          setOpenRowId={setOpenRowId}
          handleEdit={openCustomer}
          handleAdd={openLeadCreation}
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
            Customers
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your relationships and accounts</p>
        </div>
        <div className="flex gap-3">
          {/* Modal Dialogs */}
          <UpsertCustomer
            open={copen}
            onOpenChange={setCopen}
            onSuccess={() => dispatch(CustomerPagination(filterData))}
          />

          <Button
            onClick={openCustomer}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Customer
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex flex-col sm:flex-row sm:gap-3 flex-1 w-full">

            {/* Role Filter */}
            <RadixDateRange
              filterData={filterDate}
              setFilterData={handleDateRange}
            />

            <select
              value={filterData.type}
              onChange={e => handleTypeChange(e.target.value)}
              className="
                w-full sm:w-auto h-12 rounded-lg px-4 mt-2 sm:mt-0
                border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterData.status}
              onChange={e => handleStatusChange(e.target.value)}
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
              placeholder="Search customer..."
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
            data={customerData}
            rowKey={row => row.uuid}
            selectedRowKeys={selectedRows}
            onSelectionChange={rows => setSelectedRows(rows.map(r => r.uuid))}
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
