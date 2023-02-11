import ReactPDF from "@react-pdf/renderer";
import { CHAIRS_UNIT, PAYMENT_MODE_CONST, ZABIHAT_UNIT } from "../../constants";
import { Passes, ReceiptsPDF } from "../PDF";

export const getGrandTotal = (takhmeenDetails) => {
  return (
    Number(takhmeenDetails.takhmeenAmount) +
    Number(takhmeenDetails.zabihat * ZABIHAT_UNIT) +
    Number(takhmeenDetails.iftaari) +
    Number(takhmeenDetails.niyaaz) +
    Number(takhmeenDetails.chairs) * CHAIRS_UNIT
  );
};

export const calculateTakhmeenDetails = (td) => {
  const grandTotal = getGrandTotal(td);
  return {
    takhmeenAmount: td.takhmeenAmount,
    zabihat: td.zabihat,
    iftaari: td.iftaari,
    niyaaz: td.niyaaz,
    chairs: td.chairs,
    paidAmount: td.paidAmount,
    pendingAmount: grandTotal - td.paidAmount,
  };
};

const getReceiptDetails = (item) => {
  return {
    receiptNo: item.receiptNo,
    date: new Date(item.date).toDateString(),
    amount: item.amount,
    mode: PAYMENT_MODE_CONST[item.mode] ?? item.mode,
    details: item.details,
  };
};

export const sortReceiptsByHOF = (receipts = []) => {
  return Object.values(
    receipts.reduce((acc, item) => {
      if (acc[item.HOFId]?.HOFId) {
        acc[item.HOFId].subReceipts.push(getReceiptDetails(item));
      } else {
        acc[item.HOFId] = {
          HOFId: item.HOFId,
          HOFName: item.HOFName,
          formNo: item.formNo,
          subReceipts: [getReceiptDetails(item)],
        };
      }
      return acc;
    }, {})
  );
};

const downloadPDF = (blob, fileName) => {
  const url = window.URL.createObjectURL(blob);
  let aTag = document.createElement("a");
  aTag.href = url;
  aTag.style = "display: none";
  aTag.download = fileName;
  document.body.appendChild(aTag);
  aTag.click();
  return;
};

export const downLoadPasses = async (row) => {
  const blob = await ReactPDF.pdf(
    <Passes
      familyMembers={row.familyMembers}
      HOFITS={row.HOFId}
      formNo={row.formNo}
      markaz={row.markaz}
    />
  ).toBlob();
  downloadPDF(blob, `${row.formNo}`);
};

export const downloadReceipts = async (props) => {
  const { receipt, row } = props;
  const blob = await ReactPDF.pdf(
    <ReceiptsPDF
      receipt={receipt}
      HOFITS={row.HOFId}
      HOFName={row.HOFName}
      formNo={row.formNo}
    />
  ).toBlob();
  downloadPDF(blob, `${receipt.receiptNo}`);
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const filterRows = (rows = [], filters) => {
  let filteredRows = rows.filter((i) => filters.selectedMarkaz[i.markaz]);
  if (filters.sort.orderBy) {
    filteredRows = stableSort(
      rows,
      getComparator(filters.sort.order, filters.sort.orderBy)
    );
  }
  if (filters.searchedVal.trim()) {
    filteredRows = filteredRows.filter((row) => {
      return (
        row.formNo.toLowerCase().includes(filters.searchedVal.toLowerCase()) ||
        row.HOFId.toLowerCase().includes(filters.searchedVal.toLowerCase()) ||
        row.HOFName.toLowerCase().includes(filters.searchedVal.toLowerCase()) ||
        row.markaz.toLowerCase().includes(filters.searchedVal.toLowerCase())
      );
    });
  }
  return filteredRows;
};

export const getDashboardMetric = (forms = []) => {
  return forms.reduce(
    (acc, item) => {
      const grandTotal = getGrandTotal(item);
      acc.total.takhmeenAmount += Number(item.takhmeenAmount);
      acc.total.zabihat += Number(item.zabihat);
      acc.total.niyaaz += Number(item.niyaaz);
      acc.total.iftaari += Number(item.iftaari);
      acc.total.chairs += Number(item.chairs);
      acc.total.grandTotal += grandTotal;
      acc.total.paidAmount += Number(item.paidAmount);
      acc.total.pendingAmount += grandTotal - Number(item.paidAmount);
      if (acc[item.markaz]) {
        acc[item.markaz].takhmeenAmount += Number(item.takhmeenAmount);
        acc[item.markaz].zabihat += Number(item.zabihat);
        acc[item.markaz].niyaaz += Number(item.niyaaz);
        acc[item.markaz].iftaari += Number(item.iftaari);
        acc[item.markaz].chairs += Number(item.chairs);
        acc[item.markaz].grandTotal += grandTotal;
        acc[item.markaz].paidAmount += Number(item.paidAmount);
        acc[item.markaz].pendingAmount += grandTotal - Number(item.paidAmount);
      } else {
        acc[item.markaz] = {
          takhmeenAmount: Number(item.takhmeenAmount),
          zabihat: Number(item.zabihat),
          niyaaz: Number(item.niyaaz),
          iftaari: Number(item.iftaari),
          chairs: Number(item.chairs),
          grandTotal: grandTotal,
          paidAmount: Number(item.paidAmount),
          pendingAmount: grandTotal - Number(item.paidAmount),
        };
      }
      return acc;
    },
    {
      total: {
        takhmeenAmount: 0,
        zabihat: 0,
        niyaaz: 0,
        iftaari: 0,
        chairs: 0,
        grandTotal: 0,
        pendingAmount: 0,
        paidAmount: 0,
      },
    }
  );
};

export const radialChartConfig = (data) => {
  return {
    series: data.series,
    options: {
      chart: {
        height: data.height,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: false,
              label: "Total",
              formatter: (w) => {
                return data.total;
              },
            },
          },
        },
      },
      title: {
        text: data.titleText,
      },
      labels: data.labels,
    },
  };
};

export const barChartConfig = (data) => {
  return {
    series: data.series,
    options: {
      dataLabels: {
        enabled: false,
      },
      chart: {
        type: "bar",
        height: data.height,
        stacked: data.stacked,
        toolbar: {
          show: true,
          tools: {
            download: false,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top",
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "10px",
                fontWeight: 800,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: data.titleText,
      },
      xaxis: {
        categories: data.xaxisCategories,
        title: {
          text: data.yaxisTitle,
        },
      },
      yaxis: {},
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };
};
