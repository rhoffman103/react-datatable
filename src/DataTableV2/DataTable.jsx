import React from 'react';
import {useBlockLayout, useFlexLayout, useResizeColumns, useTable} from "react-table";
import {FixedSizeList} from "react-window";
import scrollbarWidth from "../DataTable/scrollbarWidth";
import AutoSizer from "react-virtualized-auto-sizer";

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
];

const headerProps = (props, { column }) => getStyles(props, column.align);

const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

const DataTable = ({ data, columns }) => {
  // Use the state and functions returned from useTable to build your UI

  const defaultColumn = React.useMemo(() => ({minWidth: 30, width: 150, maxWidth: 200}), []);

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  const {getTableProps, getTableBodyProps, headerGroups, rows, totalColumnsWidth, prepareRow} = useTable(
    {columns, data, defaultColumn},
    // useBlockLayout,
    useResizeColumns,
    useFlexLayout,
  );

  const RenderRow = React.useCallback(
    ({index, style}) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div {...row.getRowProps({style})} className="tr">
          {row.cells.map(cell => {
            return (
              <div {...cell.getCellProps(cellProps)} className="td">
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  const computeWidth = React.useCallback((containerWidth) => {
    const minWidth = totalColumnsWidth + scrollBarSize;
    return containerWidth >= minWidth ? containerWidth : minWidth;
  }, [totalColumnsWidth, scrollBarSize]);

  // Render the UI for your table
  return (
    <AutoSizer className="table-wrapper">
      {({ width, height }) => {
        width = computeWidth(width);

        return (
        <div {...getTableProps()} className="table" style={{ width }}>
          {console.log({width, height})}
          <div style={{ width: width - scrollBarSize + "px" }}>
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr" >
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps(headerProps)} className="th">
                    {column.render('Header')}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            <FixedSizeList
              height={400}
              itemCount={rows.length}
              itemSize={35}
              width={width}
              // width={totalColumnsWidth + scrollBarSize}
            >
              {RenderRow}
            </FixedSizeList>
          </div>
        </div>
      )}}
    </AutoSizer>
  );
}

export default DataTable;