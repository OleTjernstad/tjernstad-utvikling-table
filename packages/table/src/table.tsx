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
  const theme = useTheme();

  const pageCount = useMemo(() => {
    if (props.rowCount && props.manualPagination) {
      return Math.ceil(
        props.rowCount / (props.tableState.pagination?.pageSize ?? 10)
      );
    }
    return undefined;
  }, [props.rowCount, props.tableState?.pagination?.pageSize]);

  const [globalFilter, setGlobalFilter] = React.useState("");

  function updateGrouping(update: Updater<GroupingState>) {
    const grouping =
      update instanceof Function ? update(props.tableState.grouping) : update;
    props.setTableState((prev) => {
      return { ...prev, grouping };
    });
  }

  function updatePagination(update: Updater<PaginationState>) {
    const pagination =
      update instanceof Function ? update(props.tableState.pagination) : update;
    if (props.manualPagination) {
      props.setTableState((prev) => {
        return {
          ...prev,
          pagination,
        };
      });
    }
  }

  function updateColumnFilters(update: Updater<ColumnFiltersState>) {
    const columnFilters =
      update instanceof Function
        ? update(props.tableState.columnFilters)
        : update;
    props.setTableState((prev) => {
      return { ...prev, columnFilters };
    });
  }

  function updateVisibility(update: Updater<VisibilityState>) {
    const columnVisibility =
      update instanceof Function
        ? update(props.tableState.columnVisibility)
        : update;
    props.setTableState((prev) => {
      return { ...prev, columnVisibility };
    });
  }
  function updateExpanded(update: Updater<ExpandedState>) {
    const expanded =
      update instanceof Function ? update(props.tableState.expanded) : update;

    props.setTableState((prev) => {
      return { ...prev, expanded };
    });
  }

  function updateSorting(update: Updater<SortingState>) {
    const sorting =
      update instanceof Function ? update(props.tableState.sorting) : update;

    props.setTableState((prev) => {
      return { ...prev, sorting };
    });
  }

  /**Table instance */
  const table = useReactTable<T>({
    ...props,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    autoResetExpanded: false,
    state: {
      ...(props.tableState.sorting
        ? { sorting: props.tableState.sorting }
        : {}),
      expanded: props.tableState.expanded ?? {},
      columnVisibility: props.tableState.columnVisibility ?? {},
      ...(props.tableState.columnFilters
        ? { columnFilters: props.tableState.columnFilters }
        : {}),
      ...(props.tableState.grouping
        ? { grouping: props.tableState.grouping }
        : {}),
      ...(props.manualPagination
        ? { pagination: props.tableState.pagination }
        : {}),
      globalFilter,
    },
    ...(props.manualPagination && pageCount ? { pageCount } : {}),
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
    ...(props.manualPagination ? { onPaginationChange: updatePagination } : {}),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    ...(props.enablePagination
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
    if (props.getRowStyling !== undefined) {
      const className = props.getRowStyling(row);
      if (className !== undefined) {
        return `tu-table--${className}`;
      }
    }
    return "";
  }

  const [selectedRows, setSelectedRows] = useState<Row<T>[]>([]);

  useEffect(() => {
    if (props.selectedIds) {
      setSelectedRows(
        table.getPreFilteredRowModel().rows.filter((r) => {
          return props.selectedIds?.find((o) => o === r?.getValue("id"));
        })
      );
    }
  }, [props.selectedIds, table]);

  useEffect(() => {
    if (props.selectedIds && props.manualPagination && props.data)
      setSelectedRows(
        table.getPreFilteredRowModel().rows.filter((r) => {
          return props.selectedIds?.find((o) => o === r.getValue("id"));
        })
      );
  }, [props.selectedIds, table, props.manualPagination, props.data]);

  const handleRowSelection = useRowSelection({
    selectedRows,
    setSelectedRows,
    table,
    enableSelection: props.enableSelection,
    setSelected: props.setSelected,
  });

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          ...TableRootStyle({ theme, overrideColors: props.overrideColors }),
          ...(props.tableContainerStyle ?? {}),
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
          <Box sx={{ flexGrow: 1 }}>{props.children}</Box>
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
                {props.enableSelection && (
                  <CheckboxHeaderCell
                    setSelected={props.setSelected}
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
                  enableSelection={props.enableSelection}
                  handleRowSelection={handleRowSelection}
                  key={row.id}
                  row={row}
                  state={props.tableState}
                  isSelected={!!selectedRows?.find((r) => r.id === row.id)}
                  rowClassName={getRowClassName(row)}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {props.enablePagination ? <Pagination table={table} /> : null}
    </>
  );
}
