'use client'

import { ColumnDef } from "@tanstack/react-table"

export type Event = {
    id: string
    name: string
    startDate: Date
    endDate: Date
    //status: "confirmed" | "cancelled"
}

export const columns: ColumnDef<Event>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("startDate"));
            const formatted = new Intl.DateTimeFormat("en-US", {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true // Set to false if you prefer 24-hour format
            }).format(date);

            return <div>{formatted}</div>
        },
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("endDate"));
            const formatted = new Intl.DateTimeFormat("en-US", {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true // Set to false if you prefer 24-hour format
            }).format(date);

            return <div>{formatted}</div>
        },
    },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    // },
]

