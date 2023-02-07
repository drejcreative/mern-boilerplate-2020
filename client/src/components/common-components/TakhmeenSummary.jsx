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
            <TableCell style={{ fontWeight: "bold" }}>
              Takhmeen amount
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Zabihat</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Iftaari</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Niyaaz</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Chair</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Grand Total</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>{takhmeenDetails.takhmeenAmount}</TableCell>
            {takhmeenDetails.zabihat ? (
              <TableCell>{`${takhmeenDetails.zabihat} x ${ZABIHAT_UNIT}`}</TableCell>
            ) : null}
            <TableCell>{takhmeenDetails.iftaari}</TableCell>
            <TableCell>{takhmeenDetails.niyaaz}</TableCell>
            {takhmeenDetails.chairs ? (
              <TableCell>{`${takhmeenDetails.chairs} x ${CHAIRS_UNIT}`}</TableCell>
            ) : null}
            <TableCell style={{ fontWeight: "bold" }}>
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
