/* eslint-disable @typescript-eslint/ban-types */
import { Cell, Row, TableState, flexRender } from "@tanstack/react-table";
import {
  TableCell as TwTableCell,
  TableRow as TwTableRow,
} from "../components/ui/table";

import { Button } from "./ui/button";
import { CheckboxCell } from "./selection";
import React from "react";
import { UnfoldLess } from "./icons/unfoldLess";
import { UnfoldMore } from "./icons/unfoldMore";

interface TableRowProps<T extends {}> {
  row: Row<T>;
  state: TableState;
  isSelected: boolean;
  rowClassName: string;
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
  handleRowSelection,
}: TableRowProps<T>) {
  return (
    <TwTableRow
      data-row-index={row.index}
      data-row-is-group-row={row.getIsGrouped() ? 1 : undefined}
      style={{
        cursor: !row.getIsGrouped() ? "pointer" : "auto",
      }}
      className={`${rowClassName} ${
        !row.getIsGrouped() && "tu-table-selectable"
      } ${isSelected && "Mui-selected"}`}
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

interface TableCellProps<T extends {}> {
  cell: Cell<T, unknown>;
  state: TableState;
}
export function TableCell<T extends {}>({ cell }: TableCellProps<T>) {
  if (cell.getIsGrouped() || cell.row.getIsGrouped())
    return (
      <TwTableCell
        data-is-action={cell.column.id === "action" ? 1 : undefined}
        aria-describedby="rowActionDescription"
      >
        {cell.getIsGrouped() ? (
          // If it's a grouped cell, add an expander and row count
          <>
            <Button
              {...{
                onClick: cell.row.getToggleExpandedHandler(),
                style: {
                  cursor: cell.row.getCanExpand() ? "pointer" : "normal",
                },
              }}
              variant="link"
              size="sm"
            >
              cell.row.getIsExpanded() ? (
              <UnfoldLess />
              ) : (
              <UnfoldMore />)
              {flexRender(cell.column.columnDef.cell, cell.getContext())} (
              {cell.row.subRows.length})
            </Button>
          </>
        ) : cell.getIsAggregated() ? (
          // If the cell is aggregated, use the Aggregated
          // renderer for cell
          flexRender(
            cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
            cell.getContext()
          )
        ) : cell.getIsPlaceholder() ? null : cell.row.getIsGrouped() ? (
          <span></span>
        ) : null}
      </TwTableCell>
    );

  return (
    <TwTableCell aria-describedby="rowActionDescription">
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TwTableCell>
  );
}
