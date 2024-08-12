import { ColumnDef } from "@tanstack/react-table";
import { StatusCell } from "./status";

export type Columns = {
  id: number;
  name: string;
  email: string;
  phone: string;
  isLocked: boolean;
};

export const columns: ColumnDef<Columns>[] = [
  {
    header: "#",
    accessorKey: "id",
    enableGrouping: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    enableGrouping: false,
  },
  {
    header: "Email",
    accessorKey: "email",
    enableGrouping: false,
  },
  {
    header: "Locked User",
    accessorKey: "isLocked",
    cell: ({ cell }) => <StatusCell isLocked={cell.getValue<boolean>()} />,
  },
];
