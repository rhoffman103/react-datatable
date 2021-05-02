import React, {useMemo} from 'react';
import DTDropdown from "../DTDropdown";
import { ColumnFilterProps } from './FilterPropTypes';
import {getMultiFilterOptions} from "./utils";

const MultiSelectColumnFilter = ({column: { filterValue = [], preFilteredRows, setFilter, id, filterOptions = null, ...cols }, ...rest}) => {
  const options = useMemo(() => getMultiFilterOptions(id, filterOptions, preFilteredRows), [id, filterOptions, preFilteredRows]);

  const handleSelect = ({ target: { value } }) => {
    if (filterValue.indexOf(value) !== -1) {
      setFilter((prev) => prev.filter((option) => option !== value));
    } else {
      setFilter((prev = []) => [...prev, value]);
    }
  };

  return (
    <DTDropdown title={cols.Header}>
      <form>
        {options.map((option, i) => (
          <div key={i}>
            <input type="checkbox" id={cols.Header + option + i} value={option} checked={filterValue.includes(option)} onChange={handleSelect} />
            <label htmlFor={cols.Header + option + i}>{option}</label>
          </div>
        ))}
      </form>
    </DTDropdown>
  );
};

MultiSelectColumnFilter.propTypes = {
  column: ColumnFilterProps.isRequired
};

export default MultiSelectColumnFilter;