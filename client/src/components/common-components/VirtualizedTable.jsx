import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";

const VirtualizedTable = (parentProps) => {
  const { fixedHeaderContent, Row, RowDetails, rows } = parentProps;
  const VirtuosoTableComponents = React.useMemo(() => {
    return {
      Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
      )),
      Table: (props) => (
        <Table {...props} style={{ borderCollapse: "separate" }} />
      ),
      TableHead,
      TableRow: ({ item: _item, ...props }) => {
        console.log(_item, props);
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
  }, []);

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
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};
export default VirtualizedTable;
