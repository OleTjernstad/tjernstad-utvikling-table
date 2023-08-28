import { Column, Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { Clear } from "./icons/clear";
import { MoreVert } from "./icons/moreVert";
import React from "react";

interface ColumnActionProps<T extends {}> {
  column: Column<T, unknown>;
  table: Table<T>;
}
export function ColumnAction<T extends {}>({ column }: ColumnActionProps<T>) {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const close = () => {
  //   setAnchorEl(null);
  // };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            aria-label="kolonne meny"
            aria-controls="simple-menu"
            aria-haspopup="true"
            // onClick={handleClick}
          >
            <MoreVert />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {column.getCanSort() && [
            <DropdownMenuItem
              key={"removeSort"}
              onClick={() => column.clearSorting()}
              disabled={!column.getIsSorted()}
            >
              <Clear className="mr-2" /> Fjern sortering
            </DropdownMenuItem>,
          ]}

          <DropdownMenuSeparator />
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* //   <Menu
    //     id="simple-menu"
    //     anchorEl={anchorEl}
    //     keepMounted
    //     open={Boolean(anchorEl)}
    //     onClose={close}
    //   >
    //     {column.getCanSort() && [
    //       <MenuItem key="removeSort">
    //         <Button
    //           disabled={!column.getIsSorted()}
    //           variant="text"
    //           startIcon={<ClearIcon />}
    //           onClick={() => column.clearSorting()}
    //         >
    //           Fjern sortering
    //         </Button>
    //       </MenuItem>,
    //       <MenuItem key="raisingSort">
    //         <Button
    //           disabled={column.getIsSorted() === "asc"}
    //           variant="text"
    //           startIcon={<KeyboardArrowUpIcon />}
    //           onClick={() => column.toggleSorting(false)}
    //         >
    //           Sorter stigende
    //         </Button>
    //       </MenuItem>,
    //       <MenuItem key="downSort">
    //         <Button
    //           disabled={column.getIsSorted() === "desc"}
    //           variant="text"
    //           startIcon={<KeyboardArrowDownIcon />}
    //           onClick={() => column.toggleSorting(true)}
    //         >
    //           Sorter synkende
    //         </Button>
    //       </MenuItem>,
    //     ]}
    //     {column.getCanFilter() && (
    //       <MenuItem>
    //         <ColumnFilter column={column} table={table} />
    //       </MenuItem>
    //     )}
    //   </Menu>  */}
    </>
  );
}
