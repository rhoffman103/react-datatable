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
  filter: PropTypes.string
});

export const ColumnsPropTypes = PropTypes.arrayOf(ColumnPropTypes);