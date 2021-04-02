import React from "react";
import PropTypes from "prop-types";
import DataTableContext from "./DataTableContext";

const DataTableProvider = ({ children, options }) => (
  <DataTableContext.Provider value={options}>
    { children }
  </DataTableContext.Provider>
);

DataTableProvider.propTypes = {
  filterTypes: PropTypes.object, //Object<filterKey: filterType>
};

DataTableProvider.defaultProps = {
  filterTypes: {}
};

export default DataTableProvider;