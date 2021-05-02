import PropTypes from "prop-types";

export const ColumnFilterProps = PropTypes.shape({
  filterValue: PropTypes.any,
  preFilteredRows: PropTypes.array,
  setFilter: PropTypes.func,
  id: PropTypes.any,
  /** used for ChecklistInputFilter */
  filterListType: PropTypes.oneOf(["checkbox", "radio"]),
});

