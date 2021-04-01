import React from 'react';
import {useFlexLayout, useResizeColumns, useTable} from "react-table";
import {FixedSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import scrollbarWidth from "../Util/scrollbarWidth";
import {flexHeaderProps, flexCellProps} from "../Util/getStyles";

const DataTable = ({ data, columns }) => {
  const headerRef = React.useRef();
  const toolbarRef = React.useRef();
  const defaultColumn = React.useMemo(() => ({minWidth: 30, width: 150, maxWidth: 200}), []);
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  const {getTableProps, getTableBodyProps, headerGroups, rows, totalColumnsWidth, prepareRow, ...rest} = useTable(
    {columns, data, defaultColumn},
    useResizeColumns,
    useFlexLayout,
  );

  const minTableWidth = React.useMemo(() => parseInt(getTableProps().style.minWidth.replace("px", "")), [totalColumnsWidth]);

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
    const minWidth = minTableWidth + scrollBarSize
    return containerWidth >= minWidth ? containerWidth : minWidth;
  }, [totalColumnsWidth, scrollBarSize]);

  const computeHeight = React.useCallback((containerHeight) => {
    const hHeight = headerRef.current ? headerRef.current.clientHeight : 0;
    const tHeight = toolbarRef.current ? toolbarRef.current.clientHeight : 0;
    return containerHeight - scrollBarSize - hHeight - tHeight;
  }, [scrollBarSize, headerRef]);

  return (
    <div className="table-wrapper w-100 h-100 p-1">
      <div className="table-toolbar" ref={toolbarRef}>toolbar</div>
      <AutoSizer>
        {({ width, height }) => {
          width = computeWidth(width);

          return (
          <div {...getTableProps()} className="table" style={{ width }}>
            
            <div className="thead" style={{ width: width - scrollBarSize + "px" }} ref={headerRef}>
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
                height={computeHeight(height)}
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
    </div>
  );
};

export default DataTable;