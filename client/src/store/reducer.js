import { nanoid } from "nanoid";
import {
  GET_FORMS,
  START_LOADING,
  END_LOADING,
  REMOVE_TOAST_MSG,
  ADD_TOAST_MSG,
  GET_RECEIPTS,
} from "./actionTypes";

export default function reducer(state, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        apiCallsInProgress: state.apiCallsInProgress + 1,
      };
    case END_LOADING:
      return {
        ...state,
        apiCallsInProgress: state.apiCallsInProgress - 1,
      };
    case GET_FORMS:
      return {
        ...state,
        forms: action.payload,
      };
    case GET_RECEIPTS:
      return {
        ...state,
        receipts: action.payload,
      };
    case ADD_TOAST_MSG:
      return {
        ...state,
        toastMsgs: [...state.toastMsgs, { ...action.payload, id: nanoid() }],
      };
    case REMOVE_TOAST_MSG:
      const newToastMsgs = state.toastMsgs.filter(
        (msg) => msg.id !== action.payload.id
      );
      return {
        ...state,
        toastMsgs: newToastMsgs ? [...newToastMsgs] : [],
      };
    default: {
      return state;
    }
  }
}
