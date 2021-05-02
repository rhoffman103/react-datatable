import React, {useEffect, useMemo, useState} from "react";
import DataTable from "../DataTable/Component/DataTable";
import MultiChipColumnFilter from "../DataTable/Component/Filter/MultiChipColumnFilter";
import MultiSelectColumnFilter from "../DataTable/Component/Filter/MultiSelectColumnFilter";
import ChecklistInputFilter from "../DataTable/Component/Filter/ChecklistInputFilter";

function DemoTable() {
  const [data, setData] = useState([]);

  const columns = useMemo(() => [
    {
      accessor: "type",
      Header: "Type",
      width: 150,
      minWidth: 150,
      Filter: ChecklistInputFilter,
      filter: "includesSome",
      filterListType: "radio"
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
      disableFilters: true
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

  useEffect(() => {
    fetch("https://fakerapi.it/api/v1/credit_cards?_quantity=1000")
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((json) => {
        const dataSet = [];
        for (let i = 0; i < json.data.length; i++) {
          let tags = i % 2 === 0 ? ["even"] : ["odd"];
          let others = i % 5 === 0 ? ["fifth"] : ["not fifth"];
          dataSet.push({...json.data[i], tags, others});
        }
        setData(dataSet);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="w-100 p-3" style={{ height: "75vh" }}>
      <p>Demo table with default filters</p>
        <DataTable data={data} columns={columns} initialState={initialState} />
    </div>
  );
}

export default DemoTable;
