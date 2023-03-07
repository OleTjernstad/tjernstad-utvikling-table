import { ColorStyleOptions, OverrideColors, TableRootStyle } from "./style";
import {
  ColumnFiltersState,
  ExpandedState,
  FilterFn,
  GroupingState,
  PaginationState,
  Row,
  SortingState,
  TableOptions,
  TableState,
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
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SxProps, Theme, useTheme } from "@mui/material";

import Box from "@mui/material/Box";
import { CheckboxHeaderCell } from "./components/selection";
import { ColumnSelectRT } from "./utils";
import { DebouncedInput } from "./components/input";
import { HeaderCell } from "./components/header";
import LinearProgress from "@mui/material/LinearProgress";
import { Pagination } from "./components/pagination";
import Paper from "@mui/material/Paper";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TableRow } from "./components/group";
import TableRowMui from "@mui/material/TableRow";
import { rankItem } from "@tanstack/match-sorter-utils";

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

interface TableProperties<T extends Record<string, unknown>>
  extends Omit<TableOptions<T>, "getCoreRowModel"> {
  children?: React.ReactNode;
  getRowStyling?: (row: Row<T>) => ColorStyleOptions | undefined;
  setSelected?: (rows: Row<T>[]) => void;
  selectedIds?: number[];
  isLoading: boolean;
  enableSelection?: boolean;
  tableState: TableState;
  setTableState: (
    value: TableState | ((val: TableState) => TableState)
  ) => void;
  tableContainerStyle?: SxProps<Theme>;
  overrideColors?: OverrideColors | undefined;

  rowCount?: number;
}

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

    rowCount,
  } = props;

  const theme = useTheme();
  const manualPagination = false;
  const pageCount = useMemo(() => {
    if (rowCount && manualPagination) {
      return Math.ceil(rowCount / tableState.pagination?.pageSize);
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
    getPaginationRowModel: getPaginationRowModel(),
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
    if (selectedIds)
      setSelectedRows(
        table.getPreFilteredRowModel().rows.filter((r) => {
          return selectedIds.find((o) => o === r.getValue("id"));
        })
      );
  }, [selectedIds, table]);

  useEffect(() => {
    if (selectedIds && manualPagination && props.data)
      setSelectedRows(
        table.getPreFilteredRowModel().rows.filter((r) => {
          return selectedIds.find((o) => o === r.getValue("id"));
        })
      );
  }, [selectedIds, table, manualPagination, props.data]);

  /**
   * Handle Row Selection:
   *
   * 1. Click + CMD/CTRL - Select multiple rows
   * 2. Click + SHIFT - Range Select multiple rows
   * 3. Single Click - Select only one row
   */
  const handleRowSelection = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, row: Row<T>) => {
      // See if row is already selected
      const selectedRowIds = selectedRows?.map((r) => r.id) ?? [];
      const selectIndex = selectedRowIds.indexOf(row.id);
      const isSelected = selectIndex > -1;

      let updatedSelectedRows = [...(selectedRows ? selectedRows : [])];
      if (event.ctrlKey || event.metaKey || !event.shiftKey) {
        // 1. Click + CMD/CTRL - select multiple rows

        // Remove clicked element from list
        if (isSelected) {
          updatedSelectedRows.splice(selectIndex, 1);
        } else {
          updatedSelectedRows.push(row);
        }
      } else if (event.shiftKey) {
        // 2. Click + SHIFT - Range Select multiple rows

        if (selectedRows?.length) {
          const lastSelectedRow = selectedRows[0];
          // Calculate array indexes and reset selected rows
          const lastIndex = table.getRowModel().rows.indexOf(lastSelectedRow);
          const currentIndex = table.getRowModel().rows.indexOf(row);

          updatedSelectedRows = [];
          if (lastIndex < currentIndex) {
            for (let i = lastIndex; i <= currentIndex; i++) {
              const selectedRow = table.getRowModel().rows[i];
              if (!selectedRow.getIsGrouped()) {
                updatedSelectedRows.push(selectedRow);
              }
            }
          } else {
            for (let i = currentIndex; i <= lastIndex; i++) {
              const selectedRow = table.getRowModel().rows[i];
              if (!selectedRow.getIsGrouped()) {
                updatedSelectedRows.push(selectedRow);
              }
            }
          }
        } else {
          // No rows previously selected, select only current row
          updatedSelectedRows = [row];
        }
      } else {
        // 3. Single Click - Select only one row

        if (isSelected && updatedSelectedRows.length === 1) {
          updatedSelectedRows = [];
        } else {
          updatedSelectedRows = [row];
        }
      }

      if (setSelected && enableSelection) {
        setSelectedRows(updatedSelectedRows);
        setSelected(updatedSelectedRows);
      }
    },
    [selectedRows, setSelected, enableSelection, table]
  );

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
      <Pagination table={table} />
    </>
  );
}
