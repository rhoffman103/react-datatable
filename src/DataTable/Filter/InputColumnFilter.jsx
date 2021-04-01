import React from "react";
import {ColumnFilterProps} from "./FilterPropTypes";

const InputColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter } }) => {

  return (
    <input
      value={filterValue || ''}
      // Set undefined to remove the filter entirely
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder={`Search ${preFilteredRows.length} records...`}
    />
  );
};

InputColumnFilter.propTypes = {
  column: ColumnFilterProps.isRequired
};

InputColumnFilter.defaultProps = {
  column: {}
};

export default InputColumnFilter;