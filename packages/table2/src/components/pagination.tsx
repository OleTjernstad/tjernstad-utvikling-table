import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

import { Button } from './ui/button';
import { KeyboardArrowLeft } from './icons/keyboardArrowLeft';
import { KeyboardArrowRight } from './icons/keyBoardArrowRight';
import { KeyboardDoubleArrowLeft } from './icons/keyboardDoubleArrowLeft';
import { KeyboardDoubleArrowRight } from './icons/keyboardDoubleArrowRight';
import React from 'react';
import { Table } from '@tanstack/react-table';
import { TextField } from './ui/textField';

interface PaginationProps<T extends {}> {
  table: Table<T>;
}
export function Pagination<T extends {}>({ table }: PaginationProps<T>) {
  return (
    <div className="mt-2 flex flex-row justify-between">
      <div className="flex flex-row pt-3">
        <Button
          variant={'outline'}
          size={'sm'}
          aria-label="Gå til første side"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <KeyboardDoubleArrowLeft color="text-foreground" />
        </Button>
        <Button
          variant={'outline'}
          size={'sm'}
          aria-label="Gå tilbake en"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <KeyboardArrowLeft color="text-foreground" />
        </Button>
        <Button variant={'outline'} size={'sm'} aria-label="Gå fram en" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <KeyboardArrowRight color="text-foreground" />
        </Button>
        <Button
          variant={'outline'}
          size={'sm'}
          aria-label="Gå til siste side"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <KeyboardDoubleArrowRight color="text-foreground" />
        </Button>
        <span className="bg-background ml-2">
          <TextField
            className=""
            label={'Gå til side'}
            id="outlined-basic"
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
        <span className="bg-background ml-2">
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger label="Vis" className="w-[90px]" id="number-of-rows">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50, 60].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </span>
      </div>

      <div>
        <div>Side</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} av {table.getPageCount()}
        </strong>
      </div>
    </div>
  );
}
