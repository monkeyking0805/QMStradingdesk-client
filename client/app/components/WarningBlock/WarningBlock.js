import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle } from 'reactstrap'

const WarningBlock = ({ title, description }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <p>{description}</p>
      </CardBody>
    </Card>
  )
}

WarningBlock.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

export default WarningBlock
