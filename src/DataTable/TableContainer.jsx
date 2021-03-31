import React, {useEffect} from 'react';
import {useDataTableContext} from "./DataTable.Context";
import ExampleTable from "./ExampleTable";

const TableContainer = () => {
  const { store } = useDataTableContext();

  useEffect(() => {
    console.log(store);
  }, [store]);

  return (
    <div style={{ width: "100%" }}>
      <ExampleTable columns={store.columns} displayData={store.displayData} />
    </div>
  );
};

export default TableContainer;