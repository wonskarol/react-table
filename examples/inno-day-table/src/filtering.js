import React from 'react';
import {matchSorter} from 'match-sorter'

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
  
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

export const useFilterTypes = () => {
    return React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
            return rows.filter(row => {
                const rowValue = row.values[id]
                return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
            },
        }),
    []
)};

// Define a default UI for filtering
export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }
  

export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
// Calculate the options for filtering
// using the preFilteredRows
const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
    options.add(row.values[id])
    })
    return [...options.values()]
}, [id, preFilteredRows])

// Render a multi-select box
return (
    <select
    value={filterValue}
    onChange={e => {
        setFilter(e.target.value || undefined)
    }}
    >
    <option value="">All</option>
    {options.map((option, i) => (
        <option key={i} value={option}>
        {option}
        </option>
    ))}
    </select>
)
}