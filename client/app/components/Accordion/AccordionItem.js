import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
const AccordionItem = (props) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className={classnames('accordian-item', { 'accordian-item_expanded': expanded })}>
      {props.contentRenderer(props.data, () => setExpanded(!expanded))}
    </div>
  )
}

AccordionItem.propTypes = {
  contentRenderer: PropTypes.func
}

export default AccordionItem
