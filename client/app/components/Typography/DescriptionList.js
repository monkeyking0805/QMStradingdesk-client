import React from 'react'
import classnames from 'classnames'
const DescriptionList = ({ title, description, descriptionRight }) => {
  return (
    <>
      <dt className='col-sm-6 col-md-6'>{title}</dt>
      <dd className={classnames('col-sm-6 col-md-6', { 'text-left': descriptionRight })}>{description}</dd>
    </>
  )
}
export default DescriptionList
