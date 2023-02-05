import {
  GET_FORMS,
  ADD_TO_FORMS,
  REMOVE_FROM_FORMS,
  UPDATE_FORMS,
  START_LOADING,
  END_LOADING,
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
    case ADD_TO_FORMS:
      const newItem = action.payload;
      return {
        ...state,
        forms: [...state.forms, newItem],
      };
    case UPDATE_FORMS:
      const editedList = action.payload;
      const updatedList = state.forms.map((item) =>
        item._id === editedList._id ? editedList : item
      );
      return {
        ...state,
        forms: updatedList,
      };
    case REMOVE_FROM_FORMS:
      const filteredList = state.forms.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        forms: filteredList,
      };
    default: {
      return state;
    }
  }
}
