import type { ColumnDef, Row, TableState } from '@tanstack/react-table';

export type TableProperties<T extends Record<string, unknown>> = {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  isLoading: boolean;
  children?: React.ReactNode;

  getRowStyling?: (row: Row<T>) => string | undefined;
  selectedRowClassName?: string;

  tableState: TableState;
  setTableState: (value: TableState | ((val: TableState) => TableState)) => void;
} & (
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
