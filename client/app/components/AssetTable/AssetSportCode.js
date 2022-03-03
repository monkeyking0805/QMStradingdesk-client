import React from 'react'
import PropTypes from 'prop-types'

const AssetSportCode = ({ sportCodeTitle, children }) => {
  return (
    <div className='sportcode'>
      <div className='sportcode-name'>{sportCodeTitle}</div>
      {children}
    </div>
  )
}

AssetSportCode.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AssetSportCode
