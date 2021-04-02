import React from "react";
import {useAsyncDebounce} from "react-table";

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200);

  const handleInputChange = React.useCallback((e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div>
      <span>Search:</span>
      <input
        value={value || ""}
        onChange={handleInputChange}
        placeholder={`${count} records...`}
        style={{ fontSize: '1.1rem', border: '0' }}
      />
    </div>
  );
};

export default GlobalFilter;