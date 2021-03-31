import { createContext, useContext } from "react";

export const initialDataTableStore = {
  initialized: false,
  search: "",
  rowsPerPage: 10,
  displayData: [],
  columns: []
};

const DataTableContext = createContext(initialDataTableStore);

export const useDataTableContext = () => useContext(DataTableContext);

export default DataTableContext;