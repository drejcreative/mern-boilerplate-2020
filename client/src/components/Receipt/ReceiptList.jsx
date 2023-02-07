import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { GET_RECEIPTS } from "../../store/actionTypes";
import { RECEIPT_LIST_HEADER } from "../../constants";
import Header from "../Header";
import ReactPDF from "@react-pdf/renderer";
import { ReceiptsPDF } from "../PDF";
import { useCustomHook } from "../common-components";
import { receiptService } from "../../services/receiptService";
import { sortReceiptsByHOF } from "../common-components/utility";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: "white",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  marginBottom: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function createData(receipts) {
  return {
    ...receipts,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
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
          {row.formNo}
        </TableCell>
        <TableCell>{row.HOFId}</TableCell>
        <TableCell>{row.HOFName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            borderBottom: "2px solid rgba(224, 224, 224, 1)",
          }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                gutterBottom
                component="div"
                style={{ fontSize: "0.875rem", fontWeight: "bold" }}
              >
                Receipt(s) summary
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Receipt No</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Mode</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subReceipts.map((receipt) => {
                    return (
                      <TableRow key={receipt.receiptNo}>
                        <TableCell component="th" scope="row">
                          {receipt.receiptNo}
                        </TableCell>
                        <TableCell align="right">{receipt.amount}</TableCell>
                        <TableCell>{receipt.mode}</TableCell>
                        <TableCell>{receipt.date}</TableCell>
                        <TableCell>
                          <ReactPDF.PDFDownloadLink
                            document={
                              <ReceiptsPDF
                                receipt={receipt}
                                HOFITS={row.HOFId}
                                HOFName={row.HOFName}
                                formNo={row.formNo}
                              />
                            }
                            fileName={`${receipt.receiptNo}`}
                          >
                            <IconButton size="small" color="secondary">
                              <DownloadIcon />
                            </IconButton>
                          </ReactPDF.PDFDownloadLink>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function FormList() {
  const { state, dispatch, startLoading, endLoading, addToastMsg } =
    useCustomHook();
  const [origRows, setOrigRows] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    getReceipts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setOrigRows(state.receipts);
  }, [state.receipts]);

  React.useEffect(() => {
    setRows(state.receipts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origRows]);

  const getReceipts = async () => {
    startLoading();
    try {
      const { data, isOK } = await receiptService.getReceipts();
      if (isOK) {
        dispatch({
          type: GET_RECEIPTS,
          payload: sortReceiptsByHOF(data),
        });
      } else {
        throw new Error("Internal server error");
      }
    } catch (e) {
      console.log("failed to fetch receipt list", e);
      addToastMsg(
        "unable to fetch receipt list, try again after some time",
        "error"
      );
    }
    endLoading();
  };

  const requestSearch = (searchedVal) => {
    if (!searchedVal.trim()) return setRows([...origRows]);
    const filteredRows = origRows.filter((row) => {
      return (
        row.formNo.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.HOFId.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.HOFName.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  return (
    <>
      <Header header={RECEIPT_LIST_HEADER} />
      <div className="d-flex justify-content-between mt-2">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onChange={(e) => {
              requestSearch(e?.currentTarget?.value ?? "");
            }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ fontWeight: "bold" }}>Form no.</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>HOF ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>HOF Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.HOFId} row={createData(row)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
