'use client';

import { CellContext, ColumnDef } from '@tanstack/react-table';
import { Button } from '../../shadcn/button';
import { User } from '@/models/core';
import { ClassNameProps } from '@/lib/shadcn';
import { EditableCell } from '../cells/editable-cell';


export const columns: ColumnDef<User, number>[] = [
  {
    accessorKey: 'age',
    header: 'Age',
    cell: (props: CellContext<User, number>) => <EditableCell {...props} />,
  },
  {
    accessorKey: 'deleteUser',
    header: '',
    cell: ({ row: { index }, table }) => {
      const onClick = () => {
        table.options.meta?.removeRow(index);
      };

      return (
        <Button variant="ghost" size="icon" onClick={onClick}>
          <Trash2Icon className="h-4 w-4" />
        </Button>
      );
    },
  },
];
  
function Trash2Icon(props: ClassNameProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
