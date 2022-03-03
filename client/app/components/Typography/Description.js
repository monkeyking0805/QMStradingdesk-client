import React from 'react'
const Description = (props) => {
  return (
    <dl className='row'>
      {props.children}
    </dl>
  )
}
export default Description
