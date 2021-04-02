import React from "react";
import PropTypes from "prop-types";
import DataTableContext from "./DataTableContext";

const DataTableProvider = ({ children, options }) => (
  <DataTableContext.Provider value={options}>
    { children }
  </DataTableContext.Provider>
);

DataTableProvider.propTypes = {
  /** @SEE useFilters https://react-table.tanstack.com/docs/api/useFilters#table-options */
  filterTypes: PropTypes.object, //Object<filterKey: filterType>
  manualFilters: PropTypes.bool,
  disableFilters: PropTypes.bool,
  defaultCanFilter: PropTypes.bool,
  autoResetFilters: PropTypes.bool
};

DataTableProvider.defaultProps = {
  filterTypes: {}
};

export default DataTableProvider;