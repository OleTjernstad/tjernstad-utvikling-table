import { ColumnDef } from "@tanstack/react-table";

type DataItem = {
  GPSnr: string;
  nick: string;
  payedDate: string;
  sum: string;
  subRows?: DataItem[];
};

export type Columns = DataItem;

export const columns: ColumnDef<DataItem>[] = [
  {
    accessorKey: "GPSnr",
    header: "GPS Nr.",
  },
  {
    accessorKey: "nick",
    header: "Geocaching Nick",
    cell: ({ row, getValue }) => (
      <div
        className="flex items-center"
        style={{
          // Since rows are flattened by default,
          // we can use the row.depth property
          // and paddingLeft to visually indicate the depth
          // of the row
          paddingLeft: `${row.depth * 2}rem`,
        }}
      >
        {row.getCanExpand() ? (
          <button
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer" },
            }}
          >
            {row.getIsExpanded() ? "👇" : "👉"}
          </button>
        ) : (
          "🔵"
        )}{" "}
        {getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "payedDate",
    header: "Betalt Dato",
  },
  {
    accessorKey: "sum",
    header: "Betalt Kontingent",
  },
];
