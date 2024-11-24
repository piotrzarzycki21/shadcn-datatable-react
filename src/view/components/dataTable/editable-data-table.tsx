import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';

import { useState } from 'react';
import { DataTablePagination } from '../dataTable/pagination/data-table-pagination';
import { getPaginationRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../shadcn/table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    removeRow: (rowIndex: number) => void;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  showPaginationWhen: number;
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  onRowSelect?: (item: TData | null) => void;
}

export function EditableDataTable<TData, TValue>({
  columns,
  data,
  className,
  showPaginationWhen,
  setData,
  onRowSelect,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        // Skip page index reset until after next rerender
        setData((old) => {
          const mappedData: TData[] = old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          });
          return mappedData;
        });
      },
      removeRow: (rowIndex: number) => {
        setData((prevData) => prevData.filter((_, i) => i !== rowIndex));
      },
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>();

  const handleRowClick = (row: TData, index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      if (onRowSelect) {
        onRowSelect(null);
      }
    } else {
      setSelectedIndex(index);
      if (onRowSelect) {
        onRowSelect(row);
      }
    }
  };

  return (
    <div
      className={'flex flex-col overflow-hidden rounded-md border ' + className}
    >
      <div className="sticky top-0 z-10">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
      </div>
      <Table className="flex-1">
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.index === selectedIndex && 'selected'}
                className={`cursor-pointer transition-colors ${
                  row.index === selectedIndex && 'selected'
                    ? 'bg-primary/20 hover:bg-primary/30'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => handleRowClick(row.original as TData, row.index)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div
        className="pb-1 pt-1"
        style={{
          display:
            table.getPaginationRowModel().flatRows.length > showPaginationWhen
              ? 'block'
              : 'none',
        }}
      >
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
