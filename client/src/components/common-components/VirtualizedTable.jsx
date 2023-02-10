import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";

const VirtualizedTable = (parentProps) => {
  const { FixedHeaderContent, Row, RowDetails, rows } = parentProps;
  const VirtuosoTableComponents = React.useMemo(() => {
    return {
      Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
      )),
      Table: (props) => (
        <Table {...props} style={{ borderCollapse: "separate" }} />
      ),
      TableHead: React.forwardRef((props, ref) => (
        <TableHead {...props} ref={ref}>
          {FixedHeaderContent({
            order: parentProps.order,
            orderBy: parentProps.orderBy,
            sortHandler: parentProps.sortHandler,
          })}
        </TableHead>
      )),
      TableRow: ({ item: _item, ...props }) => {
        return (
          <React.Fragment>
            <TableRow {...props} />
            <TableRow>
              <RowDetails {..._item} {...props} />
            </TableRow>
          </React.Fragment>
        );
      },
      TableBody: React.forwardRef((props, ref) => (
        <TableBody {...props} ref={ref} />
      )),
    };
  }, [
    FixedHeaderContent,
    parentProps.order,
    parentProps.orderBy,
    parentProps.sortHandler,
  ]);

  const rowContent = React.useMemo(() => {
    return (_index, row) => {
      return (
        <React.Fragment>
          <Row row={row} />
        </React.Fragment>
      );
    };
  }, []);
  return (
    <Paper style={{ height: 650, width: "100%" }}>
      {rows.length ? (
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={() => {}}
          itemContent={rowContent}
        />
      ) : (
        <Typography component={"div"} variant="h5" padding={2}>
          No data available
        </Typography>
      )}
    </Paper>
  );
};

const StickyHeaderTable = (parentProps) => {
  return (
    <Paper style={{ height: 650, width: "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <parentProps.FixedHeaderContent
              order={parentProps.order}
              orderBy={parentProps.orderBy}
              sortHandler={parentProps.sortHandler}
            />
          </TableHead>
          <TableBody>
            {parentProps.rows.map((row) => {
              return (
                <React.Fragment key={row.formNo}>
                  <TableRow>
                    <parentProps.Row row={row} />
                  </TableRow>
                  <TableRow>
                    <parentProps.RowDetails {...row} />
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export { VirtualizedTable, StickyHeaderTable };
