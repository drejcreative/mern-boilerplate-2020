import {
  GET_LIST,
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  UPDATE_LIST
} from './actionTypes';

export default function reducer(state, action) {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        list: action.payload
      }
    case ADD_TO_LIST:
      const newItem = action.payload;
      return {
        ...state,
        list: [...state.list, newItem]
      }
    case UPDATE_LIST:
      const editedList = action.payload;
      const updatedList = state.list.map(item => item._id === editedList._id ? editedList : item)
      return {
        ...state,
        list: updatedList
      }
    case REMOVE_FROM_LIST:
      const filteredList = state.list.filter(item => item._id !== action.payload)
      return {
        ...state,
        list: filteredList
      }
    default:
      {
        return state;
      }
  }
}