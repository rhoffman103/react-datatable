import React, {useEffect, useMemo, useState} from "react";
import DataTable from "./DataTable";

function App() {
  const [data, setData] = useState([]);

  const columns = useMemo(() => [
    {
      accessor: "type",
      Header: "Type",
      width: 150,
      minWidth: 150,
    },
    {
      accessor: "number",
      Header: "Number",
      width: 150,
      minWidth: 200
    },
    {
      accessor: "expiration",
      Header: "Exp.",
      width: 75,
      minWidth: 75
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
