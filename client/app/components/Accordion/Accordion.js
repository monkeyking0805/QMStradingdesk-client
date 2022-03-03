import React from 'react'
import PropTypes from 'prop-types'
import AccordionItem from './AccordionItem'
const Accordion = ({ items, contentRenderer }) => {
  return (
    <div className='accordian'>
      {items.map((item, key) => (
        <AccordionItem
          key={key}
          data={item}
          contentRenderer={contentRenderer}
        />
      ))}
    </div>
  )
}

Accordion.propTypes = {
  items: PropTypes.array,
  contentRenderer: PropTypes.func
}

export default Accordion
