import React, {useEffect, useMemo, useState} from "react";
import DataTable from "./DataTable";
import SelectColumnFilter from "./DataTable/Filter/SelectColumnFilter";
import InputColumnFilter from "./DataTable/Filter/InputColumnFilter";

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
      filter: "contains"
    }
  ], []);

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
      <div style={{
        height: "75vh",
        width: "100%",
      }}>
        <DataTable data={data} columns={columns}/>
      </div>
    </div>
  );
}

export default App;
