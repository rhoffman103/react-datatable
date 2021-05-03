# React-Table

react-datatable was built to explore the idea of windowed rows in a table. I recently had to build a datatable without any pagination and fairly large datasets. This project uses react-table for functionality and react-window to maintain performace.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents
* [Demo](#Demo)
* [Usage](#Usage)

## Usage
Be sure to follow documentation for the ```useTable``` hook from react-table. columns and data props must be memoized.

The parent container must have a width and height set.

```javascript
  import React {useMemo} from "react";
  import DataTable from "...DataTable";

  const SimpleTable = () => {
    const data = useMemo(() => ([
        {
            "latitude": 30.086828,
            "longitude": 88.278245
        },
        {
            "latitude": -51.685206,
            "longitude": -162.087013
        },
        {
            "latitude": -89.353962,
            "longitude": 37.522316
        },
        {
            "latitude": 62.013765,
            "longitude": 28.37596
        },
        {
            "latitude": 79.71452,
            "longitude": -117.509928
        }
    ]), []);

    const columns = useMemo(() => ([
      {
        accessor: "latitude",
        Header: "Latitude",
        width: 150
      },
      {
        accessor: "longitude",
        Header: "Longitude",
        width: 150
      }
    ]), []);

    return (
      <div style={{ width: "100%", height: "75%" }}>
        <DataTable data={data} columns={columns} />
      </div>
    )
  };
```

## API

### &lt;DataTable />

> This table uses a handful of hooks for the react-table library. useResizeColumns, useFlexLayout, useGlobalFilter, useFilters, useSortBy.
> See the [useTable hook](https://react-table.tanstack.com/docs/api/useTable) for more details on initializing the table.

Accepts the following props:

|Name|Type|Description
|:---:|:-----|:-----|
|**`data`**|array|Array of key/value pairs to be displayed
|**`columns`**|array|Array of objects to describe the column. See [column options](https://react-table.tanstack.com/docs/api/useTable#column-options).
|**`initialState`**|object|Another useTable option. The initial state object for the table.

### &lt;DataTableProvider />

>The DataTableProvider provides context to all DataTable descendants. Custom filterTypes, and Footer Components can be shared.

Accepts the following props:

|Name|Type|Description
|:---:|:-----|:-----|
|**`filterTypes`**|object|Passed for the [useFilters](https://react-table.tanstack.com/docs/api/useFilters) hook. Object of custom filter functions that can be used for each column
|**`footer`**|boolean|show/hide the table Footer component
|**`Footer`**|function|React Component for rendering a custom Footer. Must return valid jsx. 

```Footer``` is called with these props:

```
Props {
  visibleItems: number;
  totalItems: number;
  style: object;
}
```