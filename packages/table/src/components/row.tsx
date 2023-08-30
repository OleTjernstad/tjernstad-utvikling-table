/* eslint-disable @typescript-eslint/ban-types */
import { Row, TableState } from "@tanstack/react-table";

import { CheckboxCell } from "./selection";
import React from "react";
import { TableCell } from "./cell";
import { TableRow as TwTableRow } from "../components/ui/table";
import { cn } from "../lib/utils";

interface TableRowProps<T extends {}> {
  row: Row<T>;
  state: TableState;
  isSelected: boolean;
  rowClassName: string;
  selectedRowClassName?: string;
  enableSelection: boolean | undefined;
  handleRowSelection: (
    event: React.MouseEvent<HTMLButtonElement>,
    row: Row<T>
  ) => void;
}
export function TableRow<T extends {}>({
  row,
  state,
  rowClassName,
  isSelected,
  enableSelection,
  selectedRowClassName,
  handleRowSelection,
}: TableRowProps<T>) {
  return (
    <TwTableRow
      data-row-index={row.index}
      data-row-is-group-row={row.getIsGrouped() ? 1 : undefined}
      style={{
        cursor: !row.getIsGrouped() ? "pointer" : "auto",
      }}
      className={cn(
        { "tu-table-selectable": !row.getIsGrouped() },
        { "bg-sky-600/50 hover:bg-sky-00/50": isSelected },
        { selectedRowClassName: isSelected && selectedRowClassName },
        rowClassName
      )}
    >
      {enableSelection && !row.getIsGrouped() && (
        <CheckboxCell<T>
          handleRowSelection={handleRowSelection}
          row={row}
          isSelected={isSelected}
        />
      )}
      {row.getVisibleCells().map((cell) => {
        return <TableCell key={cell.id} cell={cell} state={state} />;
      })}
    </TwTableRow>
  );
}
