import React, {useMemo} from "react";
import {ColumnFilterProps} from "./FilterPropTypes";
import {getMultiFilterOptions} from "./utils";

const MultiChipColumnFilter = ({column: { filterValue = [], preFilteredRows, setFilter, id, filterOptions }}) => {
  const options = useMemo(() => getMultiFilterOptions(id, filterOptions, preFilteredRows), [id, filterOptions, preFilteredRows]);

  const handleSelect = ({ target: { value } }) => {
    if (filterValue.indexOf(value) !== -1) {
      setFilter((prev) => prev.filter((option) => option !== value));
    } else {
      setFilter((prev = []) => [...prev, value]);
    }
  };

  return (
    <div className="multi-chip-select">
      {options.map((option, i) => (
        <button key={i} className={filterValue.includes(option) ? "active active-chip" : ""} onClick={handleSelect} value={option}>{option}</button>
      ))}
    </div>
  );
};

MultiChipColumnFilter.propTypes = {
  column: ColumnFilterProps.isRequired
};

MultiChipColumnFilter.defaultProps = {
  column: {}
};

export default MultiChipColumnFilter;