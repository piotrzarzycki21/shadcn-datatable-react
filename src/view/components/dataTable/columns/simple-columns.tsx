'use client';

import { User } from '@/models/core';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('email')}</div>
    ),
  },
];
