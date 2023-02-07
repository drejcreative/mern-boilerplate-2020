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
