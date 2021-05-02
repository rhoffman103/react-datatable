import PropTypes from "prop-types";

/** @SEE https://react-table.tanstack.com/docs/api/useTable#column-options */
export const ColumnPropTypes = PropTypes.shape({
  id: PropTypes.string,
  accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object),
  Header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  Footer: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  Cell: PropTypes.func,
  width: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,

  /** custom props for data-table options */
  Filter: PropTypes.func,
  filter: PropTypes.oneOfType([
    /** @SEE default filterTypes https://github.com/tannerlinsley/react-table/blob/master/src/filterTypes.js */
    PropTypes.oneOf(["text", "exactText", "exactTextCase", "includes", "includesAll", "includesSome", "includesValue", "exact", "equals", "between"]),
    PropTypes.string // used if custom filterType is added in DataTableProvider options
  ])
});

export const InitialStateProps = PropTypes.shape({
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  globalFilter: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // columnId
    value: PropTypes.string
  })),
  sortBy: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // columnId
    desc: PropTypes.bool
  }))
});

export const ColumnsPropTypes = PropTypes.arrayOf(ColumnPropTypes);