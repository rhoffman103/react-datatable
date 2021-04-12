import React from "react";
import {ColumnFilterProps} from "./FilterPropTypes";
import {useAsyncDebounce} from "react-table";

const InputColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter, Header } }) => {
  const [value, setValue] = React.useState(filterValue)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined);
  }, 200);

  const handleInputChange = React.useCallback((e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className="filter-input">
      <label htmlFor={"filter" + Header}>{Header}</label>
      <input
        id={"filter" + Header}
        value={value || ""}
        onChange={handleInputChange}
        placeholder={`Search ${preFilteredRows.length} records...`}
        autoComplete="off"
      />
    </div>
  );
};

InputColumnFilter.propTypes = {
  column: ColumnFilterProps.isRequired
};

InputColumnFilter.defaultProps = {
  column: {}
};

export default InputColumnFilter;