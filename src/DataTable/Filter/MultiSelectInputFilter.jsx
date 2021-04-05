import React, {useMemo, useState} from "react";
import {ColumnFilterProps} from "./FilterPropTypes";
import {getMultiFilterOptions} from "./utils";
import DTDropdown from "../../DTDropdown";

const MultiSelectInputFilter = ({column: { filterValue = [], preFilteredRows, setFilter, id, filterOptions = null, ...cols }}) => {
  const [input, setInput] = useState("");
  const options = useMemo(() => getMultiFilterOptions(id, filterOptions, preFilteredRows), [id, filterOptions, preFilteredRows]);

  const handleSelect = ({ target: { value } }) => {
    if (filterValue.indexOf(value) !== -1) {
      setFilter((prev) => {
        let filters = prev.filter((option) => option !== value);
        return filters.length ? filters : undefined
      });
    } else {
      setFilter((prev = []) => [...prev, value]);
    }
  };

  const handleInputChange = ({target: {value}}) => {
    let filters = [...filterValue];
    if (filters.length) {
        const index = filters.indexOf(input);
        if (index !== -1) {
          value ? filters[index] = value : filters.splice(index, 1);
          if (!filters.length) filters = undefined;
        }
        else if (index === -1 && value.length) filters.unshift(value);
        else filters = undefined;
    } else {
      if (!value.length) {
        filters = filters.filter((option) => option !== input);
        filters = filters.length ? filters : [value];
      } else {
        filters.unshift(value);
      }
    }

    setFilter(filters);
    setInput(value);
  };

  return (
    <DTDropdown title={cols.Header}>
      <form>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder={`Search ${preFilteredRows.length} records...`}
        />
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

MultiSelectInputFilter.propTypes = {
  column: ColumnFilterProps.isRequired
};

MultiSelectInputFilter.defaultProps = {
  column: {}
};

export default MultiSelectInputFilter;