import React from 'react'
import { Card, CardBody } from 'reactstrap'

const DataRow = ({ children, className }) => {
  return (
    <Card className={`${className}`}>
      <CardBody
        className='d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center list-row'
      >
        {children}
      </CardBody>
    </Card>
  )
}

export default DataRow
