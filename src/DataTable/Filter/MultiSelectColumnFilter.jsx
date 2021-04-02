import React, {useMemo, useState} from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import FormCheck from "react-bootstrap/FormCheck";
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

  console.log({cols, rest})

  return (
    <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-basic">
        {cols.Header}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <form>
          {options.map((option, i) => (
            <Dropdown.Item key={i}>
              <FormCheck
                inline
                label={option}
                type="checkbox"
                checked={filterValue.includes(option)}
                onChange={console.log}
              />
            </Dropdown.Item>
          ))}
        </form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MultiSelectColumnFilter;