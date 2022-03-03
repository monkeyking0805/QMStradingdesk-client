import React from 'react'
import PropTypes from 'prop-types'

const AssetTable = ({ children }) => {
  return (
    <div className='search-assets search-assets-result'>
      {children}
    </div>
  )
}

AssetTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AssetTable
