import React, { useState, useEffect, useMemo } from "react";
import DataTableProvider from "../DataTable/Component/DataTable/DataTableProvider";
import DataTable from "../DataTable/Component/DataTable";
import InputColumnFilter from "../DataTable/Component/Filter/InputColumnFilter";

const options = {
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
};

const ContextDemo = () => {
  const [data, setData] = useState([]);

  const columnsOne = useMemo(() => ([
    {
      accessor: "firstname",
      Header: "First Name",
      width: 150,
      minWidth: 150,
      Filter: InputColumnFilter,
      filter: "text"
    },
    {
      accessor: "lastname",
      Header: "Last Name",
      width: 150,
      minWidth: 200,
      disableFilters: true
    },
    {
      accessor: "username",
      Header: "User Name",
      width: 150,
      minWidth: 200,
      disableFilters: true
    }
  ]), []);

  const columnsTwo = useMemo(() => ([
    {
      accessor: "email",
      Header: "Email",
      width: 200,
      minWidth: 200,
      disableFilters: true
    },
    {
      accessor: "website",
      Header: "Website",
      width: 200,
      minWidth: 200,
      Filter: InputColumnFilter,
      filter: "text"
    },
  ]), []);

  useEffect(() => {
    fetch("https://fakerapi.it/api/v1/users?_quantity=1000")
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((json) => {
        setData(json.data)
      });
  }, []);

  return (
    <DataTableProvider options={options}>
      <p>The Options Context is provided to all descendant tables.</p>
      <div className="row">
        <div className="col-12 col-md-6" style={{ height: "40vh" }}>
          <DataTable data={data} columns={columnsOne} />
        </div>
        <div className="col-12 col-md-6" style={{ height: "40vh" }}>
          <DataTable data={data} columns={columnsTwo} />
        </div>
      </div>
    </DataTableProvider>
  )
}

export default ContextDemo;