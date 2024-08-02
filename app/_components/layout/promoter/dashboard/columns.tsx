'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ActionsMenu } from './actions';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { Button } from '@/app/_components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export type Event = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  category: string;
  //status: "confirmed" | "cancelled"
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    meta: 'select',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('startDate'));
      const formatted = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Set to false if you prefer 24-hour format
      }).format(date);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('endDate'));
      const formatted = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Set to false if you prefer 24-hour format
      }).format(date);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(row.getValue('endDate'));
      const formatted = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Set to false if you prefer 24-hour format
      }).format(date);

      return <div>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ActionsMenu com={row.original.id} />;
    },
  }, // {
  //     accessorKey: "status",
  //     header: "Status",
  // },
];
