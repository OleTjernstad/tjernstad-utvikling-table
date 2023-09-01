# Table

This is a opinionated implementation of Tanstack table with Tailwind CSS style.

**Built with [Tailwind CSS](https://tailwindcss.com/) and [TanStack Table V8](https://tanstack.com/table/v8)**

## Get Started

```javascript

type Columns = {
  id: number;
  name: string;
  email: string;
  phone: string;
  isLocked: boolean;
};

const columns: ColumnDef<Columns>[] = useMemo(
() => [
    {
    header: "#",
    accessorKey: "id",
    enableGrouping: false,
    },
    {
    header: "Name",
    accessorKey: "name",
    enableGrouping: false,
    },
    {
    header: "Email",
    accessorKey: "email",
    enableGrouping: false,
    },
    {
    header: "Locked User",
    accessorKey: "isLocked",
    cell: ({ cell }) => <StatusCell isLocked={cell.getValue<boolean>()} />,
    },
],
[]
);

const [tableState, setTableState] = useState<TableState>({
columnVisibility: {},
expanded: {},
pagination: { pageIndex: 0, pageSize: 20 },
} as TableState);


<TuTable<Columns>
    columns={columns}
    data={data}
    isLoading={isLoading}
    setTableState={setTableState}
    tableState={tableState}
    enableSelection
    selectedIds={selected}
    setSelected={updateSelected}
    enablePagination
/>
```

## Features

- sorting
- Column filter
- Global filter
- Pagination
- Hide columns
- Selection and range selection
- Preserve table state

## Locales

- Norwegian
