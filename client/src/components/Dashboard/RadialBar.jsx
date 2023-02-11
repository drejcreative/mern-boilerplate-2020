import React from "react";
import ReactApexChart from "react-apexcharts";
import { MARKAZ_CONST } from "../../constants";
import { radialChartConfig } from "../common-components";

const RadialBar = ({ dashboardMetric }) => {
  const { ZM, JM, BH, total } = dashboardMetric;
  const labels = MARKAZ_CONST.map((item) => item.displayVal);
  const series = [
    ZM?.paidAmount ? ((ZM.paidAmount / ZM.grandTotal) * 100).toFixed(2) : 0,
    JM?.paidAmount ? ((JM.paidAmount / JM.grandTotal) * 100).toFixed(2) : 0,
    BH?.paidAmount ? ((BH.paidAmount / BH.grandTotal) * 100).toFixed(2) : 0,
  ];
  const chartConfig = radialChartConfig({
    series,
    labels,
    titleText: "Total Paid Amount",
    height: 365,
    total: total.paidAmount ? (total.paidAmount / total.grandTotal) * 100 : 0,
  });
  return (
    <ReactApexChart
      type="radialBar"
      height={365}
      series={chartConfig.series}
      options={chartConfig.options}
    />
  );
};

export default RadialBar;
