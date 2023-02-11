import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { MARKAZ_CONST } from "../../constants";
import { formService } from "../../services/formService";
import { GET_FORMS } from "../../store/actionTypes";
import { getDashboardMetric, useCustomHook } from "../common-components";
import Header from "../Header";
import BarChart from "./BarChart";
import RadialBar from "./RadialBar";

const Dashboard = () => {
  const { state, dispatch, startLoading, endLoading, addToastMsg } =
    useCustomHook();
  const [dashboardMetric, setDashboardMetric] = React.useState({});
  React.useEffect(() => {
    const t = async () => {
      try {
        startLoading();
        const res = await formService.getForms();
        if (res.isOK) {
          dispatch({
            type: GET_FORMS,
            payload: res.data,
          });
        }
      } catch (e) {
        console.log("Unable to fetch details", e);
        addToastMsg("Unable to fetch details", "error");
      }
      endLoading();
    };
    t();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setDashboardMetric(getDashboardMetric(state.forms));
  }, [state.forms, setDashboardMetric]);

  // No Data Scenario
  return (
    <>
      <Header header={"Dashboard"} />
      {dashboardMetric.total ? (
        <Grid container spacing={2} direction="row" alignContent={"center"}>
          <Grid item xs={6}>
            <Paper>
              <RadialBar dashboardMetric={dashboardMetric} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <BarChart dashboardMetric={dashboardMetric} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Takhmeen
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Zabihat
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Niyaaz
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Iftaari
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Chairs
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Total
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        Pending amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {MARKAZ_CONST.map((item) => {
                      return (
                        <TableRow key={item.value}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {item.displayVal}
                          </TableCell>
                          <TableCell align="right">
                            {dashboardMetric[item.value]?.takhmeenAmount ?? 0}
                          </TableCell>
                          <TableCell align="right">
                            {dashboardMetric[item.value]?.zabihat ?? 0}
                          </TableCell>
                          <TableCell align="right">
                            {dashboardMetric[item.value]?.niyaaz ?? 0}
                          </TableCell>
                          <TableCell align="right">
                            {dashboardMetric[item.value]?.iftaari ?? 0}
                          </TableCell>
                          <TableCell align="right">
                            {dashboardMetric[item.value]?.chairs ?? 0}
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }} align="right">
                            {dashboardMetric[item.value]?.grandTotal ?? 0}
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }} align="right">
                            {dashboardMetric[item.value]?.pendingAmount ?? 0}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Grand Total
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        {dashboardMetric["total"].takhmeenAmount}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        {dashboardMetric["total"].zabihat}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        {dashboardMetric["total"].niyaaz}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        {dashboardMetric["total"].iftaari}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        {dashboardMetric["total"].chairs}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        {dashboardMetric["total"].grandTotal}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="right">
                        {dashboardMetric["total"].pendingAmount}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default Dashboard;
