/* eslint-disable @typescript-eslint/ban-types */
import { Cell, TableState, flexRender } from '@tanstack/react-table';

import { Button } from './ui/button';
import React from 'react';
import { TableCell as TwTableCell } from './ui/table';
import { UnfoldLess } from './icons/unfoldLess';
import { UnfoldMore } from './icons/unfoldMore';

interface TableCellProps<T extends {}> {
  cell: Cell<T, unknown>;
  state: TableState;
}
export function TableCell<T extends {}>({ cell }: TableCellProps<T>) {
  if (cell.getIsGrouped() || cell.row.getIsGrouped())
    return (
      <TwTableCell data-is-action={cell.column.id === 'action' ? 1 : undefined} aria-describedby="rowActionDescription">
        {cell.getIsGrouped() ? (
          // If it's a grouped cell, add an expander and row count
          <>
            <Button
              {...{
                onClick: cell.row.getToggleExpandedHandler(),
                style: {
                  cursor: cell.row.getCanExpand() ? 'pointer' : 'normal'
                }
              }}
              variant="link"
              size="sm"
            >
              cell.row.getIsExpanded() ? (
              <UnfoldLess color="text-foreground" />
              ) : (
              <UnfoldMore color="text-foreground" />){flexRender(cell.column.columnDef.cell, cell.getContext())} ({cell.row.subRows.length})
            </Button>
          </>
        ) : cell.getIsAggregated() ? (
          // If the cell is aggregated, use the Aggregated
          // renderer for cell
          flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
        ) : cell.getIsPlaceholder() ? null : cell.row.getIsGrouped() ? (
          <span></span>
        ) : null}
      </TwTableCell>
    );

  return <TwTableCell aria-describedby="rowActionDescription">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TwTableCell>;
}
