import React from "react";
import PropTypes from "prop-types";
import DataTableContext, {initialDataTableState} from "./DataTableContext";

const DataTableProvider = ({ children, options }) => {
  const memoOptions = React.useMemo(() => ({...initialDataTableState, ...options}), [options]);

  return (
    <DataTableContext.Provider value={memoOptions}>
      {typeof children === "function" ? children(options) : children}
    </DataTableContext.Provider>
  );
};

DataTableProvider.propTypes = {
  /** @SEE useFilters https://react-table.tanstack.com/docs/api/useFilters#table-options */
  filterTypes: PropTypes.object, //Object<filterKey: filterType>
  manualFilters: PropTypes.bool,
  disableFilters: PropTypes.bool,
  defaultCanFilter: PropTypes.bool,
  autoResetFilters: PropTypes.bool,

  /** Non React-Table props */
  footer: PropTypes.bool, // show/hide footer
  Footer: PropTypes.func, // (footerProps) => <JSX />
};

DataTableProvider.defaultProps = {
  filterTypes: {}
};

export default DataTableProvider;