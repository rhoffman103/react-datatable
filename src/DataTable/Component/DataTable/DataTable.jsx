import React from 'react';
import PropTypes from "prop-types";
import {useFlexLayout, useResizeColumns, useTable, useSortBy, useFilters, useGlobalFilter} from "react-table";
import {FixedSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import scrollbarWidth from "../../Util/scrollbarWidth";
import {flexHeaderProps, flexCellProps} from "../../Util/getStyles";
import InputColumnFilter from "../Filter/InputColumnFilter";
import {useDataTableContext} from "./DataTableContext";
import {fuzzyTextFilterFn} from "../Filter/utils";
import GlobalFilter from "../Filter/GlobalFilter";
import {ColumnsPropTypes, InitialStateProps} from "./DataTablePropTypes";
import DefaultFooter from "./DefaultFooter";

const DataTable = ({ data, columns, initialState }) => {
  const listRef = React.useRef();
  const innerListRef = React.useRef();
  const headerRef = React.useRef();
  const toolbarRef = React.useRef();
  const footerRef = React.useRef();
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);
  const defaultColumn = React.useMemo(() => ({
    minWidth: 30, width: 150, maxWidth: 200,
    Filter: InputColumnFilter,
  }), []);

  let { filterTypes, footer, Footer, ...contextOptions } = useDataTableContext();

  filterTypes = React.useMemo(() => ({
    // Add a new fuzzyTextFilterFn filter type.
    fuzzyText: fuzzyTextFilterFn,
    ...filterTypes
  }), [filterTypes]);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state, filteredRows, setAllFilters, ...rest} = useTable(
    {columns, data, defaultColumn, filterTypes, initialState, ...contextOptions},
    useResizeColumns,
    useFlexLayout,
    useGlobalFilter,
    useFilters,
    useSortBy,
    // (args) => console.log("hook", args)
  );

  const minTableWidth = React.useMemo(() => parseInt(getTableProps().style.minWidth.replace("px", "")), [getTableProps]);

  const RenderRow = React.useCallback(
    ({index, style}) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div {...row.getRowProps({style})} className="tr">
          {row.cells.map(cell => (
            <div {...cell.getCellProps(flexCellProps)} className="td">
              {cell.render('Cell')}
            </div>
          ))}
        </div>
      );
    },
    [prepareRow, rows]
  );

  const computeWidth = React.useCallback((containerWidth) => {
    const minWidth = minTableWidth + scrollBarSize
    return containerWidth >= minWidth ? containerWidth : minWidth;
  }, [scrollBarSize, minTableWidth]);

  const computeHeight = React.useCallback((containerHeight) => {
    const hHeight = headerRef.current ? headerRef.current.clientHeight : 0;
    const tHeight = toolbarRef.current ? toolbarRef.current.clientHeight : 0;
    const fHeight = footerRef.current ? footerRef.current.clientHeight : 0;
    return containerHeight - scrollBarSize - hHeight - tHeight - fHeight;
  }, [scrollBarSize, headerRef]);

  const FooterComponent = Footer ? Footer : DefaultFooter;

  const footerProps = React.useMemo(() => ({
    visibleItems: innerListRef.current ? innerListRef.current.childElementCount : 0,
    totalItems: filteredRows.length
  }), [filteredRows]);

  return (
    <div className="dt-wrapper">

      <div className="dt-toolbar" ref={toolbarRef}>

        <div className="dt-search">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>

        <div className="dt-filter-bar">
          
          <div>
            <button className="dt-reset-filter-btn" type="button" onClick={() => setAllFilters([])}>Reset Filters</button>
          </div>
          
          <div className="dt-filters">
            {rest.allColumns.reduce((filters, column, j) => {
              if (column.canFilter) {
                filters.push(
                  <div key={`filter${column.accessor}${j}`}>
                    {column.render('Filter')}
                  </div>
                );
              }
              return filters;
            }, [])}
          </div>

        </div>

      </div>

      <AutoSizer>
        {({ width, height }) => {
          width = computeWidth(width);
          height = computeHeight(height);

          return (
            <>
              <div {...getTableProps()} className="table" style={{ width }}>

                <div className="thead" style={{ width: width - (filteredRows.length * 35 > height ? scrollBarSize : 0) + "px" }} ref={headerRef}>
                  {headerGroups.map(headerGroup => (
                    <div {...headerGroup.getHeaderGroupProps()} className="tr" >
                      {headerGroup.headers.map(column => (
                        <div {...column.getHeaderProps(flexHeaderProps)} {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                          {column.render('Header')}
                          <span className="sort-dir">
                            {column.isSorted
                              ? column.isSortedDesc
                                ? <>&#9650;</>
                                : <>&#9660;</>
                              : <></>}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div {...getTableBodyProps()}>
                  <FixedSizeList
                    ref={listRef}
                    innerRef={innerListRef}
                    height={height}
                    itemCount={rows.length}
                    itemSize={35}
                    width={width}
                  >
                    {RenderRow}
                  </FixedSizeList>
                </div>
              </div>

              {footer && <FooterComponent ref={footerRef} {...footerProps} style={{ width }} />}

            </>
          )}}
      </AutoSizer>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: ColumnsPropTypes.isRequired,
  initialState: InitialStateProps,
  options: PropTypes.shape({
    
  })
};

DataTable.defaultProps = {
  initialState: {}
};

export default DataTable;