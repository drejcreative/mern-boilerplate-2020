import React from "react";
import ReactApexChart from "react-apexcharts";
import { CHAIRS_UNIT, MARKAZ_CONST, ZABIHAT_UNIT } from "../../constants";
import { barChartConfig } from "../common-components";

const BarChart = ({ dashboardMetric }) => {
  const { ZM = {}, JM = {}, BH = {} } = dashboardMetric;
  const xaxisCategories = MARKAZ_CONST.map((item) => item.displayVal);
  const series = [
    {
      name: "Takhmeen amount",
      //   color: "#FFD700",
      data: [
        ZM.takhmeenAmount ?? 0,
        BH.takhmeenAmount ?? 0,
        JM.takhmeenAmount ?? 0,
      ],
    },
    {
      name: "Zabihat",
      //   color: "#B8860B",
      data: [
        Number(ZM.zabihat ?? 0) * ZABIHAT_UNIT,
        Number(BH.zabihat ?? 0) * ZABIHAT_UNIT,
        Number(JM.zabihat ?? 0) * ZABIHAT_UNIT,
      ],
    },
    {
      name: "Niyaaz",
      //   color: "#8B5E3C",
      data: [ZM.niyaaz ?? 0, BH.niyaaz ?? 0, JM.niyaaz ?? 0],
    },
    {
      name: "Iftaari",
      //   color: "#9B870C",
      data: [ZM.iftaari ?? 0, BH.iftaari ?? 0, JM.iftaari ?? 0],
    },
    {
      name: "Chairs",
      //   color: "#966919",
      data: [
        Number(ZM.chairs ?? 0) * CHAIRS_UNIT,
        Number(BH.chairs ?? 0) * CHAIRS_UNIT,
        Number(JM.chairs ?? 0) * CHAIRS_UNIT,
      ],
    },
  ];
  const chartConfig = barChartConfig({
    xaxisCategories,
    series,
    titleText: "Total takhmeen by category",
    height: 350,
    yaxisTitle: "Markaz",
    stacked: false,
  });
  return (
    <ReactApexChart
      type="bar"
      height={350}
      series={chartConfig.series}
      options={chartConfig.options}
    />
  );
};

export default BarChart;
