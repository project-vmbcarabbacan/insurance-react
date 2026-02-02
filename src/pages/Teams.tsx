import React, { useState, useEffect, useCallback } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "../components/Layout/ui/Button";
import { DataTable, type Column } from "../components/Layout/ui/Datatable";
import { useAppDispatch, useAppSelector } from "../app/stores/hooks";
import { TeamPagination, UpdateTeamStatus } from "../app/stores/slices/teamSlice";
import { Pagination } from "../components/Layout/ui/Pagination";
import { useSelector } from "react-redux";
import { selectTeamsAsEntities } from "../app/stores/selectors/teamSelectors";
import type { Team } from "../domain/entities/Team";
import { SettingManageTeam } from "../app/stores/slices/settingSlice";
import { selectRoles, SelectStatuses } from "../app/stores/selectors/settingSelectors";
import type { TeamFilter, TeamStatus } from "../core/interfaces/Team";
import { UpsertMember } from "../components/TeamManagement/UpsertMember";
import { RowActionMenu } from "../components/TeamManagement/RowAction";
import { BulkActionMenu } from "../components/TeamManagement/BulkAction";
import type { TeamStatuses } from "../core/types/Status";
import { UpdatePasswordMember } from "../components/TeamManagement/UpdatePasswordMember";
import { AssignProduct } from "../components/TeamManagement/AssignProduct";

export function ManageTeam() {
  const dispatch = useAppDispatch();

  const teamData = useSelector(selectTeamsAsEntities);
  const roles = useSelector(selectRoles);
  const statuses = useSelector(SelectStatuses);

  const { current_page, last_page } = useAppSelector(state => state.team);

  /* ------------------------ Local State ------------------------ */
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const [mopen, setMopen] = useState(false);
  const [popen, setPopen] = useState(false);
  const [apopen, setApopen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [filterData, setFilterData] = useState<TeamFilter>({
    page: 1,
    status: "active",
    per_page: 10,
    keyword: "",
    role_slug: "",
  });

  /* ------------------------ Handlers ------------------------ */
  const openMember = () => setMopen(true);
  const openPassword = () => setPopen(true);
  const openAssignProduct = () => setApopen(true);

  const handlePageChange = useCallback((page: number) => {
    setFilterData(prev => ({ ...prev, page }));
  }, []);

  const handleRoleChange = useCallback((role_slug: string) => {
    setFilterData(prev => ({
      ...prev,
      page: 1,
      role_slug,
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

  const handleBulkAction = async (uuid: string | string[], status: TeamStatuses) => {
    let data = {} as TeamStatus;
    if (Array.isArray(uuid)) {
      data = { status, uuids: uuid };
    } else {
      data = { status, uuid };
    }

    await dispatch(UpdateTeamStatus(data));
    dispatch(TeamPagination(filterData));
    setSelectedRows([]);
    setBulkOpen(false);
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
    dispatch(TeamPagination(filterData));
  }, [filterData, dispatch]);

  useEffect(() => {
    dispatch(SettingManageTeam());
  }, [dispatch]);

  /* ------------------------ Table Columns ------------------------ */
  const columns: Column<Team>[] = [
    { key: "name", header: "Name", width: "w-48" },
    { key: "email", header: "Email", width: "w-64" },
    { key: "role_name", header: "Role", width: "w-32" },
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
        <RowActionMenu
          row={row as Team}
          openRowId={openRowId}
          setOpenRowId={setOpenRowId}
          handleAction={handleBulkAction}
          handleMember={openMember}
          handlePassword={openPassword}
          handleAssignProduct={openAssignProduct}
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
            Teams
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your teams</p>
        </div>
        <div className="flex gap-3">
          {/* Modal Dialogs */}
          <UpdatePasswordMember
            open={popen}
            onOpenChange={setPopen}
          />

          <AssignProduct
            open={apopen}
            onOpenChange={setApopen}
          />

          <UpsertMember
            open={mopen}
            onOpenChange={setMopen}
            onSuccess={() => dispatch(TeamPagination(filterData))}
          />
          <Button onClick={openMember} leftIcon={<Plus className="w-4 h-4" />}>
            Add Member
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex flex-col sm:flex-row sm:gap-3 flex-1 w-full">

            {/* Search */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search teams..."
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

            {/* Role Filter */}
            <select
              value={filterData.role_slug}
              onChange={e => handleRoleChange(e.target.value)}
              className="
                w-full sm:w-auto h-12 rounded-lg px-4 mt-2 sm:mt-0
                border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
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
              {statuses
                .filter(role => !["deleted", "draft"].includes(String(role.value)))
                .map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedRows.length > 0 && (
            <div className="mt-2 sm:mt-0">
              <BulkActionMenu
                selectedRows={selectedRows}
                open={bulkOpen}
                onOpenChange={setBulkOpen}
                handleAction={handleBulkAction}
              />
            </div>
          )}
        </div>

        {/* Table */}
        <div className="p-6 bg-gray-50 min-h-[200px] overflow-x-auto">
          <DataTable
            hasCheckBox
            columns={columns.map(col => ({
              ...col,
              width: col.width ? col.width.replace("w-", "min-w-[") + "px]" : "min-w-[80px]",
            }))}
            data={teamData}
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
