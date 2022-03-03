import React from 'react'
import PropTypes from 'prop-types'

const AssetEventBody = ({ children }) => {
  return (
    <div className='assets accordian-item_body'>
      <div className='assetrow-details'>
        {children}
      </div>
    </div>
  )
}

AssetEventBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AssetEventBody
