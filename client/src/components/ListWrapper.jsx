import "./ListWrapper.scss";

import * as React from "react";
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
import AddBox from "@mui/icons-material/AddBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchBar from "material-ui-search-bar";
import Store from "../store/store";
import { formService } from "../services/formService";
import { GET_FORMS } from "../store/actionTypes";

function createData(form) {
  return {
    ...form,
    grandTotal:
      Number(form.takhmeenAmount) +
      Number(form.niyaaz) +
      Number(form.iftaari) +
      Number(form.zabihat),
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
        <TableCell>{row.HOFId}</TableCell>
        <TableCell>{row.HOFName}</TableCell>
        <TableCell align="right">{row.HOFPhone}</TableCell>
        <TableCell align="right">{row.grandTotal}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                gutterBottom
                component="div"
                style={{ fontSize: "0.875rem", fontWeight: "bold" }}
              >
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
  const [origRows, setOrigRows] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    getForms();
  }, []);

  React.useEffect(() => {
    setOrigRows(state.forms);
  }, [state.forms]);

  React.useEffect(() => {
    setRows(state.forms);
  }, [origRows]);

  const getForms = async () => {
    const data = await formService.getForms();
    dispatch({
      type: GET_FORMS,
      payload: data,
    });
  };
  const [searched, setSearched] = React.useState("");

  const requestSearch = (searchedVal) => {
    if (!searchedVal.trim()) return setRows(origRows);
    const filteredRows = rows.filter((row) => {
      return (
        row.HOFId.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.HOFName.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.markaz.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <SearchBar
          className={"mb-2"}
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <IconButton color="secondary" size="large">
          <AddBox fontSize="inherit" />
        </IconButton>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ fontWeight: "bold" }}>Markaz</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>HOF ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>HOF Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                HOF Contact
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Total takhmeen amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row._id} row={createData(row)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
