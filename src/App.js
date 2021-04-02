import React, {useEffect, useMemo, useState} from "react";
import DataTable from "./DataTable";
import SelectColumnFilter from "./DataTable/Filter/SelectColumnFilter";
import InputColumnFilter from "./DataTable/Filter/InputColumnFilter";
import DataTableProvider from "./DataTable/DataTableProvider";

function App() {
  const [data, setData] = useState([]);

  const columns = useMemo(() => [
    {
      accessor: "type",
      Header: "Type",
      width: 150,
      minWidth: 150,
      Filter: SelectColumnFilter,
      filter: "includes"
    },
    {
      accessor: "number",
      Header: "Number",
      width: 150,
      minWidth: 200,
      disableFilters: true
    },
    {
      accessor: "expiration",
      Header: "Exp.",
      width: 75,
      minWidth: 75,
      Filter: InputColumnFilter,
      filter: "fuzzyText"
    }
  ], []);

  const options = React.useMemo(() => ({
    filterTypes: {
      // override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      }
    }
  }), []);

  useEffect(() => {
    fetch("https://fakerapi.it/api/v1/credit_cards?_quantity=1000")
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((json) => {
        setData(json.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <div style={{ height: "75vh", width: "100%",}}>
        <DataTableProvider options={options}>
          <DataTable data={data} columns={columns}/>
        </DataTableProvider>
      </div>
    </div>
  );
}

export default App;
