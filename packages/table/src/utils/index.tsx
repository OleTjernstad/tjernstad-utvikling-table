import React, { ReactElement } from "react";

/* eslint-disable @typescript-eslint/ban-types */
import { Table } from "@tanstack/react-table";

// import { ColumnFilter } from "../components/columFilter";

type ColumnHidePageProps<T extends Record<string, unknown>> = {
  instance: Table<T>;
};
export function ColumnSelectRT<
  T extends Record<string, unknown>,
>({} // instance,
: ColumnHidePageProps<T>): ReactElement | null {
  // const [open, setOpen] = React.useState(false);
  // // const { allColumns, toggleHideColumn } = instance;
  // const hideableColumns = instance
  //   .getAllColumns()
  //   .filter((column) => !(column.id === "actions"));
  // const checkedCount = hideableColumns.reduce(
  //   (acc, val) => acc + (val.getIsVisible() ? 0 : 1),
  //   0
  // );

  // const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length;
  return null;
  return (
    <>
      {/* <Button
        style={{ margin: "10px", marginLeft: 0 }}
        variant="contained"
        color="info"
        onClick={() => setOpen(true)}
      >
        Velg kolonner
      </Button>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Velg kolonner</DialogTitle>
        <DialogContent dividers>
          <FormControl component="fieldset">
            <FormLabel component="legend">Velg kolonner</FormLabel>
            <FormGroup>
              {instance
                .getAllLeafColumns()
                .filter((column) => !(column.id === "actions"))
                .map((c) => (
                  <FormControlLabel
                    key={c.id}
                    control={
                      <Switch
                        name={c.id}
                        color="primary"
                        size="small"
                        disabled={c.getIsVisible() && onlyOneOptionLeft}
                      />
                    }
                    onChange={c.getToggleVisibilityHandler()}
                    checked={c.getIsVisible()}
                    label={c.columnDef.header?.toString()}
                  />
                ))}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            lukk
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}
