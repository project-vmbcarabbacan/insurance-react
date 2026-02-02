import React from 'react';
interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}
export function Table<T extends {
  id: string | number;
}>({
  data,
  columns,
  onRowClick
}: TableProps<T>) {
  return <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            {columns.map((column, index) => <th key={index} scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${column.className || ''}`}>
                {column.header}
              </th>)}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map(item => <tr key={item.id} onClick={() => onRowClick?.(item)} className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50' : ''}`}>
              {columns.map((column, index) => <td key={index} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 ${column.className || ''}`}>
                  {column.cell ? column.cell(item) : column.accessorKey ? item[column.accessorKey] as React.ReactNode : null}
                </td>)}
            </tr>)}
        </tbody>
      </table>
    </div>;
}