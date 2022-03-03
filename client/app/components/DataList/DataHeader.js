import React from 'react'

const DataHeader = ({ children }) => {
  return (
    <div className='list-header d-flex flex-column flex-lg-row justify-content-between '>
      {children}
    </div>
  )
}

export default DataHeader
