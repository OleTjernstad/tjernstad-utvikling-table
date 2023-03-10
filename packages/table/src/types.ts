import { ColorStyleOptions, OverrideColors } from "./style";
import { ColumnDef, Row, TableState } from "@tanstack/react-table";
import { SxProps, Theme } from "@mui/material";

export type TableProperties<T extends Record<string, unknown>> = {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  isLoading: boolean;
  children?: React.ReactNode;

  getRowStyling?: (row: Row<T>) => ColorStyleOptions | undefined;
  tableContainerStyle?: SxProps<Theme>;
  overrideColors?: OverrideColors | undefined;

  tableState: TableState;
  setTableState: (
    value: TableState | ((val: TableState) => TableState)
  ) => void;
} & (
  | {
      manualPagination?: boolean;
      enablePagination: boolean;
      rowCount: number;
    }
  | { enablePagination: boolean; manualPagination?: never; rowCount?: never }
  | { enablePagination?: never; manualPagination?: never; rowCount?: never }
) &
  (
    | {
        enableSelection: boolean;
        setSelected?: never;
        selectedIds?: never;
      }
    | {
        enableSelection: boolean;
        setSelected: (rows: Row<T>[]) => void;
        selectedIds: number[] | undefined;
      }
    | {
        enableSelection?: never;
        selectedIds?: never;
        setSelected?: never;
      }
  );
