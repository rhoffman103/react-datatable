import React, {useEffect, useMemo, useRef, useState} from "react";
import FocusTrap from "focus-trap-react";
import {ColumnFilterProps} from "./FilterPropTypes";
import {getMultiFilterOptions} from "./utils";
import DTDropdown from "../DTDropdown";

const ChecklistInputFilter = ({column: { filterValue = [], preFilteredRows, setFilter, id, filterOptions = null, filterListType, ...cols }}) => {
  const inputRef = useRef();
  const [input, setInput] = useState("");
  const options = useMemo(() => getMultiFilterOptions(id, filterOptions, preFilteredRows), [id, filterOptions, preFilteredRows]);

  const handleSelect = ({ target: { value } }) => {
    if (filterValue.indexOf(value) !== -1) {
      setFilter((prev) => {
        let filters = prev.filter((option) => option !== value);
        return filters.length ? filters : undefined
      });
    } else {
      setFilter([value]);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (!filterValue.length && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [filterValue]);

  return (
    <DTDropdown title={cols.Header}>
      <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
        <form className="filter-multi-input" onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputRef}
            tabIndex={0}
            value={input}
            onChange={handleInputChange}
            placeholder="Search filters..."
          />
          {options.reduce((acc, option, i) => {
            if (option.match((new RegExp(input, "gi")))) {
              const name = cols.Header + option;
              acc.push(
                <div key={i}>
                  <input value={option} type={filterListType} id={name + i} checked={filterValue.includes(option)} onChange={handleSelect} name={name} />
                  <label htmlFor={name + i}>{option}</label>
                </div>
              );
            }
            return acc;
          }, [])}
        </form>
      </FocusTrap>
    </DTDropdown>
  );
};

ChecklistInputFilter.propTypes = {
  column: ColumnFilterProps.isRequired
};

ChecklistInputFilter.defaultProps = {
  column: {}
};

export default ChecklistInputFilter;