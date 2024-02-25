import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

type ReactTableProps<D extends unknown> = {
  data: D[];
  columns: ColumnDef<D>[];
  rowClass?: string;
  headerClass?: string;
  enableSorting?: boolean;
  headerProps?: {};
  bodyProps?: {};
  rowDataProps?: {};
};

const ReactTable = <D extends unknown>({
  columns,
  data = [],
  rowClass = "",
  headerClass = "",
  enableSorting = false,
  headerProps = {},
  bodyProps = {},
  rowDataProps = {},
  ...restConfig
}: ReactTableProps<D>) => {
  const tableConfig = {
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    ...restConfig,
  };

  if (enableSorting) {
    tableConfig["getSortedRowModel"] = getSortedRowModel();
  }

  const table = useReactTable(tableConfig);

  // Render the UI for your table
  return (
    <table>
      <thead {...headerProps}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className={headerClass} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...bodyProps}>
        {table.getRowModel().rows.map((row) => (
          <tr className={rowClass} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { ReactTable };
