import {
  ColumnFiltersState,
  ExpandedState,
  FilterFn,
  GroupingState,
  PaginationState,
  Row,
  SortingState,
  Updater,
  VisibilityState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import Box from "@mui/material/Box/Box.js";
import { CheckboxHeaderCell } from "./components/selection";
import { ColumnSelectRT } from "./utils";
import { DebouncedInput } from "./components/input";
import { HeaderCell } from "./components/header";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress.js";
import { Pagination } from "./components/pagination";
import Paper from "@mui/material/Paper/Paper.js";
import React from "react";
import Table from "@mui/material/Table/Table.js";
import TableBody from "@mui/material/TableBody/TableBody.js";
import TableContainer from "@mui/material/TableContainer/TableContainer.js";
import TableHead from "@mui/material/TableHead/TableHead.js";
import { TableProperties } from "./types";
import { TableRootStyle } from "./style";
import { TableRow } from "./components/group";
import TableRowMui from "@mui/material/TableRow/TableRow.js";
import { rankItem } from "@tanstack/match-sorter-utils";
import { useRowSelection } from "./hooks/useRowSelection";
import { useTheme } from "@mui/material";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function TuTable<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  const {
    columns,
    children,
    getRowStyling,
    setSelected,
    selectedIds,
    enableSelection,
    setTableState,
    tableState,
    tableContainerStyle,
    overrideColors,
    enablePagination,
    manualPagination,
    rowCount,
  } = props;

  const theme = useTheme();

  const pageCount = useMemo(() => {
    if (rowCount && manualPagination) {
      return Math.ceil(rowCount / (tableState.pagination?.pageSize ?? 10));
    }
    return undefined;
  }, [rowCount, tableState?.pagination?.pageSize]);

  const [globalFilter, setGlobalFilter] = React.useState("");

  function updateGrouping(update: Updater<GroupingState>) {
    const grouping =
      update instanceof Function ? update(tableState.grouping) : update;
    setTableState((prev) => {
      return { ...prev, grouping };
    });
  }

  function updatePagination(update: Updater<PaginationState>) {
    const pagination =
      update instanceof Function ? update(tableState.pagination) : update;
    if (manualPagination) {
      setTableState((prev) => {
        return {
          ...prev,
          pagination,
        };
      });
    }
  }

  function updateColumnFilters(update: Updater<ColumnFiltersState>) {
    const columnFilters =
      update instanceof Function ? update(tableState.columnFilters) : update;
    setTableState((prev) => {
      return { ...prev, columnFilters };
    });
  }

  function updateVisibility(update: Updater<VisibilityState>) {
    const columnVisibility =
      update instanceof Function ? update(tableState.columnVisibility) : update;
    setTableState((prev) => {
      return { ...prev, columnVisibility };
    });
  }
  function updateExpanded(update: Updater<ExpandedState>) {
    const expanded =
      update instanceof Function ? update(tableState.expanded) : update;

    setTableState((prev) => {
      return { ...prev, expanded };
    });
  }

  function updateSorting(update: Updater<SortingState>) {
    const sorting =
      update instanceof Function ? update(tableState.sorting) : update;

    setTableState((prev) => {
      return { ...prev, sorting };
    });
  }

  /**Table instance */
  const table = useReactTable<T>({
    ...props,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    autoResetExpanded: false,
    state: {
      ...(tableState.sorting ? { sorting: tableState.sorting } : {}),
      expanded: tableState.expanded ?? {},
      columnVisibility: tableState.columnVisibility ?? {},
      ...(tableState.columnFilters
        ? { columnFilters: tableState.columnFilters }
        : {}),
      ...(tableState.grouping ? { grouping: tableState.grouping } : {}),
      ...(manualPagination ? { pagination: tableState.pagination } : {}),
      globalFilter,
    },
    ...(manualPagination && pageCount ? { pageCount } : {}),
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableSubRowSelection: true,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: updateColumnFilters,
    onGroupingChange: updateGrouping,
    onColumnVisibilityChange: updateVisibility,
    onExpandedChange: updateExpanded,
    onSortingChange: updateSorting,
    ...(manualPagination ? { onPaginationChange: updatePagination } : {}),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    ...(enablePagination
      ? { getPaginationRowModel: getPaginationRowModel() }
      : {}),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: false,
  });

  function getRowClassName(row: Row<T>) {
    if (getRowStyling !== undefined) {
      const className = getRowStyling(row);
      if (className !== undefined) {
        return `tu-table--${className}`;
      }
    }
    return "";
  }

  const [selectedRows, setSelectedRows] = useState<Row<T>[]>([]);

  useEffect(() => {
    if (selectedIds) {
      setSelectedRows(
        table.getPreFilteredRowModel().rows.filter((r) => {
          return selectedIds.find((o) => o === r?.getValue("id"));
        })
      );
    }
  }, [selectedIds, table]);

  useEffect(() => {
    if (selectedIds && manualPagination && props.data)
      setSelectedRows(
        table.getPreFilteredRowModel().rows.filter((r) => {
          return selectedIds.find((o) => o === r.getValue("id"));
        })
      );
  }, [selectedIds, table, manualPagination, props.data]);

  const handleRowSelection = useRowSelection({
    selectedRows,
    setSelectedRows,
    table,
    enableSelection,
    setSelected,
  });

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          ...TableRootStyle({ theme, overrideColors }),
          ...(tableContainerStyle ?? {}),
        }}
      >
        <Box sx={{ display: "flex", height: "4em" }}>
          <Box sx={{ padding: 2 }}>
            <DebouncedInput
              label="Søk i alle kolonner"
              name="search"
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>{children}</Box>
          <ColumnSelectRT instance={table} />
        </Box>
        <Table
          style={{ overflowX: "auto" }}
          role="grid"
          size="small"
          aria-label="Table"
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRowMui key={headerGroup.id}>
                {enableSelection && (
                  <CheckboxHeaderCell
                    setSelected={setSelected}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    table={table}
                  />
                )}
                {headerGroup.headers.map((header) => {
                  return (
                    <HeaderCell key={header.id} header={header} table={table} />
                  );
                })}
              </TableRowMui>
            ))}
          </TableHead>
          <TableBody>
            {props.isLoading && (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length}>
                  <LinearProgress sx={{ width: "100%" }} />
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow<T>
                  enableSelection={enableSelection}
                  handleRowSelection={handleRowSelection}
                  key={row.id}
                  row={row}
                  state={tableState}
                  isSelected={!!selectedRows?.find((r) => r.id === row.id)}
                  rowClassName={getRowClassName(row)}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {enablePagination ? <Pagination table={table} /> : null}
    </>
  );
}
