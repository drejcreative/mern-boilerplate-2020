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
import AddBox from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formService } from "../../services/formService";
import { GET_FORMS } from "../../store/actionTypes";
import { Link, useNavigate } from "react-router-dom";
import { CHAIRS_UNIT, FORM_LIST_HEADER, ZABIHAT_UNIT } from "../../constants";
import Header from "../Header";
import ReactPDF from "@react-pdf/renderer";
import Passes from "../PDF";
import { getGrandTotal, useCustomHook } from "../common-components";

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

function createData(form) {
  return {
    ...form,
    grandTotal: getGrandTotal(form),
    takhmeenDetails: {
      niyaaz: form.niyaaz,
      iftaari: form.iftaari,
      zabihat: form.zabihat,
      takhmeenAmount: form.takhmeenAmount,
      chairs: form.chairs,
    },
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
          <Link to={"/editform/" + row.formNo}>{row.formNo}</Link>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.markaz}
        </TableCell>
        <TableCell>{row.HOFId}</TableCell>
        <TableCell>{row.HOFName}</TableCell>
        <TableCell align="right">{row.HOFPhone}</TableCell>
        <TableCell align="right">{row.grandTotal}</TableCell>
        <TableCell style={{ fontWeight: "bold" }} align="right">
          {row.grandTotal - row.paidAmount}
        </TableCell>
        <TableCell>
          <ReactPDF.PDFDownloadLink
            document={
              <Passes
                familyMembers={row.familyMembers}
                HOFITS={row.HOFId}
                formNo={row.formNo}
                markaz={row.markaz}
              />
            }
            fileName={`${row.formNo}`}
          >
            <IconButton size="small" color="secondary">
              <DownloadIcon />
            </IconButton>
          </ReactPDF.PDFDownloadLink>
        </TableCell>
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
                Takhmeen Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Takhmeen Amount</TableCell>
                    <TableCell align="right">Zabihat</TableCell>
                    <TableCell align="right">Iftaari</TableCell>
                    <TableCell align="right">Niyaaz</TableCell>
                    <TableCell align="right">Chairs</TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Grand Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="right">
                      {row.takhmeenDetails.takhmeenAmount}
                    </TableCell>
                    <TableCell align="right">
                      {`${row.takhmeenDetails.zabihat} x ${ZABIHAT_UNIT}`}
                    </TableCell>
                    <TableCell align="right">
                      {row.takhmeenDetails.iftaari}
                    </TableCell>
                    <TableCell align="right">
                      {row.takhmeenDetails.niyaaz}
                    </TableCell>
                    <TableCell align="right">
                      {`${row.takhmeenDetails.chairs} x ${CHAIRS_UNIT}`}
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      {row.grandTotal}
                    </TableCell>
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

export default function FormList() {
  const navigate = useNavigate();
  const { state, dispatch, startLoading, endLoading, addToastMsg } =
    useCustomHook();
  const [origRows, setOrigRows] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    getForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setOrigRows(state.forms);
  }, [state.forms]);

  React.useEffect(() => {
    setRows(state.forms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origRows]);

  const getForms = async () => {
    startLoading();
    try {
      const { data, isOK } = await formService.getForms();
      if (isOK) {
        dispatch({
          type: GET_FORMS,
          payload: data,
        });
      } else {
        throw new Error("Internal server error");
      }
    } catch (e) {
      console.log("failed to fetch form list", e);
      addToastMsg(
        "unable to fetch form list, try again after some time",
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
        row.HOFName.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.markaz.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  return (
    <>
      <Header header={FORM_LIST_HEADER} />
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
        <IconButton
          color="secondary"
          size="large"
          onClick={() => {
            navigate("/newform");
          }}
        >
          <AddBox fontSize="inherit" />
        </IconButton>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ fontWeight: "bold" }}>Form no.</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Markaz</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>HOF ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>HOF Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                HOF Contact
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Total takhmeen amount
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Pending amount
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Download</TableCell>
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
