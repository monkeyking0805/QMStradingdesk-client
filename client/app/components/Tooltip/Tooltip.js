import React, { useState } from 'react'
import { Tooltip } from 'reactstrap'
import PropTypes from 'prop-types'
const ToolTip = ({ target, text, children }) => {
  const [tooltipOpen, setToggle] = useState(false)
  return (
    <>
      <span id={target}>{children}</span>
      <Tooltip
        placement='top'
        isOpen={tooltipOpen}
        autohide
        target={target}
        toggle={() => setToggle(!tooltipOpen)}
      >
        {text}
      </Tooltip>
    </>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string,
  target: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ToolTip
