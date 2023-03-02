import { ColumnDef, TableState } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { TableRootStyle, TuTable } from "table";

import BlockIcon from "@mui/icons-material/Block";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import Container from "@mui/material/Container";
import { TableKey } from "./contracts/keys";
import { useTableState } from "./hooks/useTableState";
import users from "./data.json";

const StatusCell = ({ isLocked }: { isLocked: boolean }) => {
  if (isLocked) {
    return <BlockIcon fontSize="small" />;
  }

  return <CheckIcon fontSize="small" />;
};

type Columns = {
  id: number;
  name: string;
  email: string;
  isLocked: string;
};

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const data = useMemo((): Columns[] => {
    return users.map((user) => {
      return {
        ...user,
        isLocked: user.isLocked ? "Låst" : "",
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

  const [tableState, setTableState] = useTableState<TableState>(TableKey.user, {
    columnVisibility: {},
    expanded: {},
    pagination: { pageIndex: 0, pageSize: 10 },
  } as TableState);

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
