import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import AddBox from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link, useNavigate } from "react-router-dom";
import { formService } from "../../services/formService";
import { GET_FORMS } from "../../store/actionTypes";
import {
  CHAIRS_UNIT,
  FORM_LIST_HEADER,
  MARKAZ_CONST,
  ZABIHAT_UNIT,
} from "../../constants";
import Header from "../Header";
import {
  downLoadPasses,
  filterRows,
  getGrandTotal,
  useCustomHook,
  VirtualizedTable,
} from "../common-components";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TableSortLabel,
} from "@mui/material";

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

const createData = (form) => {
  const grandTotal = getGrandTotal(form);
  return {
    ...form,
    grandTotal,
    pendingAmount: grandTotal - form.paidAmount,
    takhmeenDetails: {
      niyaaz: form.niyaaz,
      iftaari: form.iftaari,
      zabihat: form.zabihat,
      takhmeenAmount: form.takhmeenAmount,
      chairs: form.chairs,
    },
  };
};

const Row = ({ row }) => {
  return (
    <React.Fragment>
      <TableCell
        style={{ borderBottom: 0, paddingBottom: 0 }}
        component="th"
        scope="row"
      >
        <Link to={"/editform/" + row.formNo}>{row.formNo}</Link>
      </TableCell>
      <TableCell
        style={{ borderBottom: 0, paddingBottom: 0 }}
        component="th"
        scope="row"
      >
        {row.markaz}
      </TableCell>
      <TableCell style={{ borderBottom: 0, paddingBottom: 0 }}>
        {row.HOFId}
      </TableCell>
      <TableCell style={{ borderBottom: 0, paddingBottom: 0 }}>
        {row.HOFName}
      </TableCell>
      <TableCell style={{ borderBottom: 0, paddingBottom: 0 }} align="right">
        {row.HOFPhone}
      </TableCell>
      <TableCell style={{ borderBottom: 0, paddingBottom: 0 }} align="right">
        {row.grandTotal}
      </TableCell>
      <TableCell
        style={{ borderBottom: 0, paddingBottom: 0, fontWeight: "bold" }}
        align="right"
      >
        {row.pendingAmount}
      </TableCell>
      <TableCell style={{ borderBottom: 0, paddingBottom: 0 }} align="center">
        <IconButton
          size="small"
          color="secondary"
          onClick={() => {
            downLoadPasses(row);
          }}
        >
          <DownloadIcon />
        </IconButton>
      </TableCell>
    </React.Fragment>
  );
};

const RowDetails = (row) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableCell
        style={{
          padding: 0,
          paddingBottom: "16px",
          borderBottom: "2px solid rgba(224, 224, 224, 1)",
        }}
        colSpan={12}
      >
        <div className="d-flex flex-column">
          <div
            className="d-flex align-items-center"
            onClick={() => setOpen(!open)}
            style={{ cursor: "pointer" }}
          >
            <IconButton aria-label="expand row" size="small">
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Typography
              gutterBottom
              component="div"
              style={{ fontSize: "0.875rem", marginBottom: 0 }}
            >
              Takhmeen summary
            </Typography>
          </div>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
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
        </div>
      </TableCell>
    </React.Fragment>
  );
};

const FixedHeaderContent = (props) => {
  const { orderBy, order, sortHandler } = props ?? {};
  return (
    <TableRow>
      <TableCell style={{ fontWeight: "bold" }}>Form no.</TableCell>
      <TableCell style={{ fontWeight: "bold" }}>Markaz</TableCell>
      <TableCell style={{ fontWeight: "bold" }}>HOF ID</TableCell>
      <TableCell style={{ fontWeight: "bold" }}>HOF Name</TableCell>
      <TableCell style={{ fontWeight: "bold" }} align="right">
        HOF Contact
      </TableCell>
      <TableCell
        style={{ fontWeight: "bold" }}
        align="right"
        sortDirection={orderBy === "grandTotal" ? order : false}
      >
        <TableSortLabel
          active={orderBy === "grandTotal"}
          direction={orderBy === "grandTotal" ? order : "asc"}
          onClick={(e) => {
            e.preventDefault();
            sortHandler("grandTotal");
          }}
        >
          Total takhmeen amount
        </TableSortLabel>
      </TableCell>
      <TableCell
        style={{ fontWeight: "bold" }}
        align="right"
        sortDirection={orderBy === "pendingAmount" ? order : false}
      >
        <TableSortLabel
          active={orderBy === "pendingAmount"}
          direction={orderBy === "pendingAmount" ? order : "asc"}
          onClick={(e) => {
            e.preventDefault();
            sortHandler("pendingAmount");
          }}
        >
          Pending amount
        </TableSortLabel>
      </TableCell>
      <TableCell style={{ fontWeight: "bold" }}>Download</TableCell>
    </TableRow>
  );
};

export default function FormList() {
  const navigate = useNavigate();
  const { state, dispatch, startLoading, endLoading, addToastMsg } =
    useCustomHook();
  const [origRows, setOrigRows] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [filters, setFilters] = React.useState({
    selectedMarkaz: MARKAZ_CONST.reduce((acc, i) => {
      acc[i.value] = true;
      return acc;
    }, {}),
    sort: {
      orderBy: "",
      order: "",
    },
    searchedVal: "",
  });

  React.useEffect(() => {
    getForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setRows(
      filterRows(origRows, {
        searchedVal: filters.searchedVal,
        sort: filters.sort,
        selectedMarkaz: filters.selectedMarkaz,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origRows, filters]);

  React.useEffect(() => {
    setOrigRows(state.forms.map((i) => createData(i)));
  }, [state.forms]);

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
      addToastMsg(
        "unable to fetch form list, try again after some time",
        "error"
      );
    }
    endLoading();
  };

  const sortHandler = React.useMemo(() => {
    return (property) => {
      const isAsc =
        filters.sort.orderBy === property && filters.sort.order === "asc";
      const val = {
        orderBy: property,
        order: isAsc ? "desc" : "asc",
      };
      setFilters({ ...filters, sort: val });
    };
  }, [filters, setFilters]);

  return (
    <>
      <Header header={FORM_LIST_HEADER} />
      <div className="d-flex justify-content-between mt-2">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={filters.searchedVal}
            onChange={(e) => {
              const val = e?.currentTarget?.value ?? "";
              setFilters({ ...filters, searchedVal: val });
            }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <FormGroup row>
          {MARKAZ_CONST.map((item) => {
            return (
              <FormControlLabel
                key={item.value}
                label={item.displayVal}
                value={item.displayVal}
                labelPlacement={"end"}
                control={
                  <Checkbox
                    name={item.value}
                    checked={filters.selectedMarkaz[item.value]}
                    onChange={(e) => {
                      const val = {
                        ...filters.selectedMarkaz,
                      };
                      val[e.target.name] = e.target.checked;
                      setFilters({ ...filters, selectedMarkaz: val });
                    }}
                  />
                }
              />
            );
          })}
        </FormGroup>
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
      {
        <VirtualizedTable
          rows={rows}
          Row={Row}
          RowDetails={RowDetails}
          FixedHeaderContent={FixedHeaderContent}
          order={filters.sort.order}
          orderBy={filters.sort.orderBy}
          sortHandler={sortHandler}
        />
      }
    </>
  );
}
