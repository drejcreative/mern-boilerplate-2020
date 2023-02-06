import { createContext } from "react";

const Store = createContext({
  forms: [],
  apiCallsInProgress: 0,
  toastMsgs: [],
});

export default Store;
