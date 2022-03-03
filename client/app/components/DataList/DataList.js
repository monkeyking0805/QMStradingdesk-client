import React from 'react'

const DataList = ({ children, compact }) => {
  const compactClass = (compact) ? 'compact' : ''
  return (
    <div className={`data-list ${compactClass}`}>
      {children}
    </div>
  )
}

export default DataList
