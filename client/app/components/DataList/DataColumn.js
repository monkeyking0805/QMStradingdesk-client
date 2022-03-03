import React from 'react'
import classnames from 'classnames'

const DataColumn = ({ children, isHeading, width, className, onClick }) => {
  return (
    <p
      onClick={onClick}
      className={classnames(`list-column mb-1 mt-1 w-${width} w-sm-100 ${className}`, {
        'list-item-heading': isHeading,
        'with-filter': onClick
      })}
    >
      {children}
    </p>
  )
}

export default DataColumn
