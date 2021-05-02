import {createContext, useContext} from "react";

export const initialDataTableState = {
  filterTypes: {},
  footer: true,
};

const DataTableContext = createContext(initialDataTableState);

export const useDataTableContext = () => useContext(DataTableContext);

export default DataTableContext;