import {matchSorter} from "match-sorter";
import {useMemo} from "react";

export function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val;

export const getMultiFilterOptions = (id, filterOptions = null, preFilteredRows = []) => {
  const options = new Set();
  if (filterOptions) {
    filterOptions.forEach((option) => options.add(option))
  } else {
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
  }
  return [...options.values()];
};