import React, {useReducer, useMemo, useEffect} from "react";
import dataTableReducer from "./DataTable.Reducer";
import DataTableContext, {initialDataTableStore} from "./DataTable.Context";
import TableContainer from "./TableContainer";
import {dataUpdated} from "./DataTable.Actions";

const DataTable = (props) => {
  const [store, dispatch] = useReducer(dataTableReducer, initialDataTableStore, (initial) => ({
    ...initial,
    initialized: true,
    search: props.search || initial.search,
    rowsPerPage: props.rowsPerPage || initial.rowsPerPage,
    displayData: props.data,
    columns: props.columns
  }));

  const memoizedContext = useMemo(() => ({store, dispatch}), [store, dispatch]);

  useEffect(() => {
    if (store.initialized) {
      dispatch(dataUpdated(props.data));
    }
  }, [props.data, store.initialized]);

  return (
    <DataTableContext.Provider value={memoizedContext}>
      <TableContainer />
    </DataTableContext.Provider>
  );
};

DataTable.defaultProps = {
  data: [],
  columns: []
};

export default DataTable;