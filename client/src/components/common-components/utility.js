import { CHAIRS_UNIT, ZABIHAT_UNIT } from "../../constants";

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
    mode: item.mode,
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
