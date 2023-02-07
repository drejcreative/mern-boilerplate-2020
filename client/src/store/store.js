import { createContext } from "react";

const Store = createContext({
  forms: [],
  receipts: [],
  apiCallsInProgress: 0,
  toastMsgs: [],
});

export default Store;
