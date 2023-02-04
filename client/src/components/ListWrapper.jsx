import "./ListWrapper.scss";

// <span className={"button"} onClick={setView}>
//     <FontAwesomeIcon icon={faPlus} className={formView ? "rotate" : ""} />
// </span>

import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Store from "../store/store";
import { formService } from "../services/formService";
import { GET_FORMS } from "../store/actionTypes";

function createData(form) {
  return {
    ...form,
    grandTotal: form.takhmeenAmount + form.niyaaz + form.iftaari + form.zabihat,
    takhmeenDetails: {
      niyaaz: form.niyaaz,
      iftaari: form.iftaari,
      zabihat: form.zabihat,
      takhmeenAmount: form.takhmeenAmount,
    },
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.markaz}
        </TableCell>
        <TableCell>{row.HOFID}</TableCell>
        <TableCell>{row.HOFName}</TableCell>
        <TableCell align="right">{row.HOFPhone}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Takhmeen Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Takhmeen Amount</TableCell>
                    <TableCell align="right">Niyaaz</TableCell>
                    <TableCell align="right">Zabihat</TableCell>
                    <TableCell align="right">Iftaari</TableCell>
                    <TableCell align="right">Grand Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="right">
                      {row.takhmeenDetails.takhmeenAmount}
                    </TableCell>
                    <TableCell align="right">
                      {row.takhmeenDetails.niyaaz}
                    </TableCell>
                    <TableCell align="right">
                      {row.takhmeenDetails.zabihat}
                    </TableCell>
                    <TableCell align="right">
                      {row.takhmeenDetails.iftaari}
                    </TableCell>
                    <TableCell align="right">{row.grandTotal}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const { state, dispatch } = React.useContext(Store);
  React.useEffect(() => {
    getForms();
  }, []);
  const getForms = async () => {
    const data = await formService.getForms();
    dispatch({
      type: GET_FORMS,
      payload: data,
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Markaz</TableCell>
            <TableCell>HOF ID</TableCell>
            <TableCell>HOF Name</TableCell>
            <TableCell align="right">HOF Contact</TableCell>
            <TableCell align="right">Total takhmeen amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.forms.map((row) => (
            <Row key={row._id} row={createData(row)} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
