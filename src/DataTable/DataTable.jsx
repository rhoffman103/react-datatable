import React from 'react';
import {useFlexLayout, useResizeColumns, useTable} from "react-table";
import {FixedSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import scrollbarWidth from "../Util/scrollbarWidth";
import {flexHeaderProps, flexCellProps} from "../Util/getStyles";

const DataTable = ({ data, columns }) => {
  const defaultColumn = React.useMemo(() => ({minWidth: 30, width: 150, maxWidth: 200}), []);
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  const {getTableProps, getTableBodyProps, headerGroups, rows, totalColumnsWidth, prepareRow} = useTable(
    {columns, data, defaultColumn},
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
              <div {...cell.getCellProps(flexCellProps)} className="td">
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

  return (
    <AutoSizer className="table-wrapper">
      {({ width, height }) => {
        width = computeWidth(width);

        return (
        <div {...getTableProps()} className="table" style={{ width }}>
          <div style={{ width: width - scrollBarSize + "px" }}>
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr" >
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps(flexHeaderProps)} className="th">
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