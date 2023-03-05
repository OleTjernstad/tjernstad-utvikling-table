import { ColumnDef, Row, TableState } from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";

import BlockIcon from "@mui/icons-material/Block";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import Container from "@mui/material/Container";
import { TableKey } from "./contracts/keys";
import { TuTable } from "@tjernstad-utvikling/table";
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

  const [selected, setSelected] = useState<number[]>();

  function updateSelected(rows: Row<Columns>[]) {
    setSelected(rows.map((r) => r.getValue("id")));
  }

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
          tableState={tableState}
          selectedIds={selected}
          setSelected={updateSelected}
          preserveSelected
          enableSelection
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
