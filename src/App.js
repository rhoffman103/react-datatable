import React, {useEffect, useMemo, useState} from "react";
import DataTable from "./DataTableV2/DataTable";

function App() {
  const [data, setData] = useState([]);

  const columns = useMemo(() => [
    {
      accessor: "type",
      Header: "Type",
      width: 150,
      minWidth: 150
    },
    {
      accessor: "number",
      Header: "Number",
      width: 150,
      minWidth: 300
    }
  ], []);

  useEffect(() => {
    fetch("https://fakerapi.it/api/v1/credit_cards?_quantity=100")
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
    <div className="App p-5">
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default App;
