import React, {useEffect, useMemo, useState} from "react";
import DataTable from "./DataTable";
import SelectColumnFilter from "./DataTable/Filter/SelectColumnFilter";
import InputColumnFilter from "./DataTable/Filter/InputColumnFilter";
import DataTableProvider from "./DataTable/DataTableProvider";
import MultiChipColumnFilter from "./DataTable/Filter/MultiChipColumnFilter";
import MultiSelectColumnFilter from "./DataTable/Filter/MultiSelectColumnFilter";

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
    },
    {
      accessor: "tags",
      Header: "Tags",
      width: 75,
      minWidth: 75,
      Filter: MultiChipColumnFilter,
      filter: "includesSome",
      filterOptions: ["even", "odd"]
    },
    {
      accessor: "others",
      Header: "Others",
      width: 75,
      minWidth: 75,
      Filter: MultiSelectColumnFilter,
      filter: "includesSome",
      filterOptions: ["fifth", "not fifth"]
    }
  ], []);

  const initialState = {
    hiddenColumns: ["tags", "others"]
  };

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
        const dataSet = []
        for (let i = 0; i < json.data.length; i++) {
          let tags = i % 2 === 0 ? ["even"] : ["odd"];
          let others = i % 5 === 0 ? ["fifth"] : ["not fifth"]
          dataSet.push({...json.data[i], tags, others});
        }
        setData(dataSet);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <div style={{ height: "75vh", width: "100%" }}>
        <DataTableProvider options={options}>
          <DataTable data={data} columns={columns} initialState={initialState} />
        </DataTableProvider>
      </div>
    </div>
  );
}

export default App;
