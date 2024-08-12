"use client";

import { Columns, columns } from "./columns";
import { Row, TableState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import { TableKey } from "../contracts/keys";
import { TuTable } from "../../../../../packages/table/dist";
import { useTableState } from "@/hooks/useTableState";
import usersData from "./data.json";

export default function UserTable() {
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

  const [tableState, setTableState] = useTableState<TableState>(TableKey.user, {
    columnVisibility: {},
    expanded: {},
  } as TableState);

  useEffect(() => {
    const load = async () => {
      await new Promise((r) => setTimeout(r, 2000));
      const pageNumber = tableState?.pagination?.pageIndex ?? 0;
      const pageSize = tableState?.pagination?.pageSize ?? 10;

      setUsers(
        usersData.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
      );
      // setUsers(usersData);
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <div className="w-full p-10">
      <TuTable<Columns>
        columns={columns}
        data={data}
        isLoading={isLoading}
        setTableState={setTableState}
        tableState={tableState}
        enableSelection
        selectedIds={selected}
        setSelected={updateSelected}
      />
    </div>
  );
}
