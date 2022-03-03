import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
const AssetEvent = ({ expanded, borderLeft, children }) => {
  return (
    <div className={
      classnames('accordian-item',
        { 'accordian-item_expanded': expanded },
        { 'event-border-left': borderLeft }
      )
    }
    >
      {children}
    </div>
  )
}

AssetEvent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AssetEvent
