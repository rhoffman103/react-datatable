import {DATA_UPDATED} from "./DataTable.Actions";
import produce from "immer";
import {initialDataTableStore} from "./DataTable.Context";

const dataTableReducer = produce((draft, action) => {
  switch (action.type) {
    case DATA_UPDATED:
      draft.displayData = action.payload;
      break;
    default:
      return draft;
  }
}, initialDataTableStore);

export default dataTableReducer;