import type { ColumnDef, Row, TableState } from '@tanstack/react-table';

export type TableProperties<T extends Record<string, unknown>> = {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  isLoading?: boolean;
  children?: React.ReactNode;

  getRowStyling?: (row: Row<T>) => string | undefined;
  selectedRowClassName?: string;

  tableState: TableState;
  setTableState: (value: TableState | ((val: TableState) => TableState)) => void;
  debugTable?: boolean;
} & (
  | {
      enableSelection: true;
      setSelected: (rows: Row<T>[]) => void;
      selectedIds: number[] | undefined;
    }
  | {
      enableSelection?: false;
      setSelected?: never;
      selectedIds?: never;
    }
) &
  (
    | {
        enableExpanding: true;
        getSubRows: (originalRow: T, index: number) => T[] | undefined;
      }
    | {
        enableExpanding?: false;
        getSubRows?: never;
      }
  );
