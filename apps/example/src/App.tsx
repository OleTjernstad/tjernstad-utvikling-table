import { ColumnDef, TableState } from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { TableRootStyle, TuTable } from "table";

import BlockIcon from "@mui/icons-material/Block";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import Container from "@mui/material/Container";
import { TableKey } from "./contracts/keys";
import { useTableState } from "./hooks/useTableState";
import usersData from "./data.json";

const currentUserId = 11;

type Columns = {
  id: number;
  name: string;
  email: string;
  phone: string;
  isLocked: boolean;
};

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<
    {
      id: number;
      name: string;
      email: string;
      phone: string;
      isLocked: boolean;
    }[]
  >([]);

  useEffect(() => {
    const load = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setUsers(usersData);
      setIsLoading(false);
    };
    load();
  }, []);

  const data = useMemo((): Columns[] => {
    return users.map((user) => {
      return {
        ...user,
      };
    });
  }, [users]);

  const columns: ColumnDef<Columns>[] = useMemo(
    () => [
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
        enableGrouping: false,
        cell: ({ cell }) => <StatusCell isLocked={cell.getValue<boolean>()} />,
      },
    ],
    []
  );

  const [tableState, setTableState] = useTableState<TableState>(
    TableKey.user,
    {
      columnVisibility: {},
      expanded: {},
      pagination: { pageIndex: 0, pageSize: 10 },
    } as TableState,
    currentUserId
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <TuTable<Columns>
          columns={columns}
          data={data}
          isLoading={isLoading}
          setTableState={setTableState}
          tableContainerStyle={(theme) => TableRootStyle({ theme })}
          tableState={tableState}
        />
      </Box>
    </Container>
  );
}

const StatusCell = ({ isLocked }: { isLocked: boolean }) => {
  if (isLocked) {
    return <BlockIcon fontSize="small" />;
  }

  return <CheckIcon fontSize="small" />;
};
