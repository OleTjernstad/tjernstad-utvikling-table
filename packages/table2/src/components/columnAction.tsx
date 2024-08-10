import { Column, Table } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

import { Button } from './ui/button';
import { Clear } from './icons/clear';
import { ColumnFilter } from './columFilter';
import { KeyboardArrowDown } from './icons/keyboardArrowDown';
import { KeyboardArrowUp } from './icons/keyboardArrowUp';
import { MoreVert } from './icons/moreVert';
import React from 'react';

interface ColumnActionProps<T extends {}> {
  column: Column<T, unknown>;
  table: Table<T>;
}
export function ColumnAction<T extends {}>({ column, table }: ColumnActionProps<T>) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            size={'icon'}
            aria-label="kolonne meny"
            aria-controls="simple-menu"
            aria-haspopup="true"
            // onClick={handleClick}
          >
            <MoreVert color="text-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {column.getCanSort() && [
            <DropdownMenuItem key={'removeSort'} onClick={() => column.clearSorting()} disabled={!column.getIsSorted()}>
              <Clear color="text-destructive" className="mr-2" /> Fjern sortering
            </DropdownMenuItem>,
            <DropdownMenuItem key={'raisingSort'} disabled={column.getIsSorted() === 'asc'} onClick={() => column.toggleSorting(false)}>
              <KeyboardArrowUp color="text-foreground" className="mr-2" /> Sorter stigende
            </DropdownMenuItem>,
            <DropdownMenuItem key={'downSort'} disabled={column.getIsSorted() === 'desc'} onClick={() => column.toggleSorting(false)}>
              <KeyboardArrowDown color="text-foreground" className="mr-2" /> Sorter synkende
            </DropdownMenuItem>
          ]}

          <DropdownMenuSeparator />
          {column.getCanFilter() && <ColumnFilter column={column} table={table} />}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
