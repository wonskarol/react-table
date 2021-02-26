import React from 'react'
import { FiArrowUp, FiArrowDown, FiSearch, FiXCircle } from 'react-icons/fi'

export const ColumnHeader = props => {
  const [isFiltering, setIsFiltering] = React.useState(false)

  return (
    <th {...props.getHeaderProps()}>
      {!isFiltering && (
        <>
          <span {...props.getSortByToggleProps()}>
            {props.render('Header')}
            {props.isSorted ? (
              props.isSortedDesc ? (
                <FiArrowDown />
              ) : (
                <FiArrowUp />
              )
            ) : (
              ''
            )}
          </span>
          <div>
            {props.canFilter ? (
              <button onClick={() => setIsFiltering(true)}>
                <FiSearch />
              </button>
            ) : null}
          </div>
        </>
      )}
      {isFiltering && (
        <>
          {props.render('Filter')}
          <button onClick={() => setIsFiltering(false)}>
            <FiXCircle />
          </button>
        </>
      )}
    </th>
  )
}
