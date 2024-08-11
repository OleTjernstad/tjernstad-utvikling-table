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

### tailwind.config

#### Theme colors

The component uses theme config installed by [shadcn/ui](https://ui.shadcn.com/)

#### Loading indicator

Add this for animating the loading indicator

```javascript
theme : {
    extend: {
      animation: {
        "progress-linear-intermediate": 'progress-linear 1s infinite linear',
      },
      keyframes: {
        "progress-linear": {
          '0%': { transform: ' translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
      },
      transformOrigin: {
        'left-right': '0% 50%',
      }
    }
}
```

## Features

- sorting
- Column filter
- Global filter
- Hide columns
- Selection and range selection
- Preserve table state

## Locales

- Norwegian
