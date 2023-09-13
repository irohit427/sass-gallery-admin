"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cellAction"

export type TagColumn = {
  id: string
  name: string;
  createdAt: string;
}

export const columns: ColumnDef<TagColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];