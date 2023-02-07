import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { CHAIRS_UNIT, ZABIHAT_UNIT } from "../../constants";

const TakhmeenSummary = ({ takhmeenDetails }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Takhmeen amount
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Zabihat
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Iftaari
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Niyaaz
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Chair
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Grand Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="right">
              {Number(takhmeenDetails.takhmeenAmount)}
            </TableCell>
            <TableCell align="right">{`${
              takhmeenDetails.zabihat
                ? "" + takhmeenDetails.zabihat + " x " + ZABIHAT_UNIT
                : 0
            }`}</TableCell>
            <TableCell align="right">
              {Number(takhmeenDetails.iftaari)}
            </TableCell>
            <TableCell align="right">
              {Number(takhmeenDetails.niyaaz)}
            </TableCell>
            <TableCell align="right">{`${
              takhmeenDetails.chairs
                ? "" + takhmeenDetails.chairs + " x " + CHAIRS_UNIT
                : 0
            }`}</TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              {Number(takhmeenDetails.takhmeenAmount) +
                Number(takhmeenDetails.zabihat * ZABIHAT_UNIT) +
                Number(takhmeenDetails.iftaari) +
                Number(takhmeenDetails.niyaaz) +
                Number(takhmeenDetails.chairs) * CHAIRS_UNIT}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TakhmeenSummary;
