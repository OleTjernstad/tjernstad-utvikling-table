/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/ban-types */
import { Header, Table, flexRender } from "@tanstack/react-table";

import { ArrowDropDown } from "./icons/arrowDropDown";
import { ArrowDropUp } from "./icons/arrowDropUp";
import { ColumnAction } from "../utils";
import { FilterRemove } from "./columFilter";
import { KeyboardArrowRight } from "./icons/keyBoardArrowRight";
import React from "react";
import { TableCell as TwTableCell } from "../components/ui/table";

interface HeaderCellProps<T extends {}> {
  header: Header<T, unknown>;
  table: Table<T>;
}

export function HeaderCell<T extends {}>({
  header,
  table,
}: HeaderCellProps<T>) {
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
              display: "flex",
              flexDirection: "row",
            }}
          >
            {header.column.getCanGroup() ? (
              <Tooltip title={"Grupper kolonne"}>
                <TableSortLabel
                  active
                  {...{
                    onClick: header.column.getToggleGroupingHandler(),
                    style: {
                      cursor: "pointer",
                    },
                  }}
                  direction={header.column.getIsGrouped() ? "desc" : "asc"}
                  IconComponent={KeyboardArrowRight}
                />
              </Tooltip>
            ) : null}{" "}
            <Tooltip title={"Sorter kolonne"}>
              <div
                {...{
                  className: header.column.getCanSort()
                    ? "classes.canSortClass"
                    : "",
                  onClick: header.column.getToggleSortingHandler(),
                  onKeyDown: header.column.getToggleSortingHandler(),
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </div>
            </Tooltip>{" "}
            {{
              asc: <ArrowDropUp />,
              desc: <ArrowDropDown />,
            }[header.column.getIsSorted() as string] ?? null}
            <FilterRemove column={header.column} table={table} />
            <div
              style={{
                flexGrow: 3,
              }}
            />
            {(header.column.getCanFilter() || header.column.getCanSort()) && (
              <ColumnAction column={header.column} table={table} />
            )}
          </div>
        </>
      )}
    </TwTableCell>
  );
}
