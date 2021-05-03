import React, {useMemo, useState} from "react";
import {useAsyncDebounce} from "react-table";
import {nanoid} from "nanoid";

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200);

  const handleInputChange = React.useCallback((e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }, [onChange]);

  const inputId = useMemo(() => nanoid(), []);

  return (
    <div className="dt-input-group">
      <label htmlFor={inputId}>Search:</label>
      <input
        id={inputId}
        value={value || ""}
        onChange={handleInputChange}
        placeholder={`${count} records...`}
      />
    </div>
  );
};

export default GlobalFilter;