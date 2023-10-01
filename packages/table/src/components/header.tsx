/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/ban-types */
import { Header, Table, flexRender } from '@tanstack/react-table';

import { ArrowDropDown } from './icons/arrowDropDown';
import { ArrowDropUp } from './icons/arrowDropUp';
import { Button } from './ui/button';
import { ColumnAction } from './columnAction';
import { FilterRemove } from './columFilter';
import { KeyboardArrowLeft } from './icons/keyboardArrowLeft';
import { KeyboardArrowRight } from './icons/keyBoardArrowRight';
import React from 'react';
import { Sort } from './icons/sort';
import { Tooltip } from './ui/tooltip';
import { TableHead as TwTableCell } from '../components/ui/table';

interface HeaderCellProps<T extends {}> {
  header: Header<T, unknown>;
  table: Table<T>;
}

export function HeaderCell<T extends {}>({ header, table }: HeaderCellProps<T>) {
  //   const { classes } = useTableStyles();
  return (
    <TwTableCell
      //   className={classes.header}
      key={header.id}
      colSpan={header.colSpan}
    >
      {header.isPlaceholder ? null : (
        <>
          <div
            // className={classes.header}
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            {header.column.getCanGroup() ? (
              <>
                <Tooltip tip={'Grupper kolonne'}>
                  <Button
                    variant={'outline'}
                    size={'icon'}
                    className="mr-2"
                    {...{
                      onClick: header.column.getToggleGroupingHandler()
                    }}
                  >
                    {header.column.getIsGrouped() ? <KeyboardArrowRight color="text-foreground" /> : <KeyboardArrowLeft color="text-foreground" />}
                  </Button>
                </Tooltip>{' '}
              </>
            ) : null}
            <Tooltip tip={'Sorter kolonne'}>
              <div
                {...{
                  className: header.column.getCanSort() ? 'cursor-pointer' : '',
                  onClick: header.column.getToggleSortingHandler()
                }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            </Tooltip>
            {header.column.getCanSort() ? (
              <Button
                variant={'outline'}
                size={'icon'}
                className="ml-2"
                {...{
                  onClick: header.column.getToggleSortingHandler()
                }}
              >
                {header.column.getIsSorted() === 'asc' ? (
                  <ArrowDropUp color="text-foreground" />
                ) : header.column.getIsSorted() === 'desc' ? (
                  <ArrowDropDown color="text-foreground" />
                ) : (
                  <Sort color="text-foreground" />
                )}
              </Button>
            ) : null}
            <FilterRemove column={header.column} table={table} />
            <div
              style={{
                flexGrow: 3
              }}
            />
            {(header.column.getCanFilter() || header.column.getCanSort()) && <ColumnAction column={header.column} table={table} />}
          </div>
        </>
      )}
    </TwTableCell>
  );
}
