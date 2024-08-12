import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import React, { type ReactElement } from 'react';

import { Button } from './ui/button';
import { Switch } from './ui/switch';
import type { Table } from '@tanstack/react-table';

type ColumnHidePageProps<T extends Record<string, unknown>> = {
  instance: Table<T>;
};
export function ColumnSelect<T extends Record<string, unknown>>({ instance }: ColumnHidePageProps<T>): ReactElement | null {
  // const { allColumns, toggleHideColumn } = instance;
  const hideableColumns = instance.getAllColumns().filter((column) => !(column.id === 'actions'));
  const checkedCount = hideableColumns.reduce((acc, val) => acc + (val.getIsVisible() ? 0 : 1), 0);

  const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="m-3 ml-0" variant="default" color="info" aria-haspopup="true">
            Velg kolonner
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {instance
            .getAllLeafColumns()
            .filter((column) => !(column.id === 'actions'))
            .map((c) => (
              <DropdownMenuItem
                key={c.id}
                disabled={c.getIsVisible() && onlyOneOptionLeft}
                onClick={(e) => {
                  e.preventDefault();
                  const func = c.getToggleVisibilityHandler();
                  func(e);
                }}
              >
                <Switch className="mr-2" disabled={c.getIsVisible() && onlyOneOptionLeft} checked={c.getIsVisible()} />
                {c.columnDef.header?.toString()}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
