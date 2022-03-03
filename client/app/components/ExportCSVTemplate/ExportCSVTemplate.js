import React from 'react'
import { CSVLink } from 'react-csv/lib'

const ExportCSVTemplate = ({ buttonLabel, fileName, csvData }) => {
  return (
    <CSVLink
      className='export-link'
      data={csvData}
      filename={`${fileName}.csv`}
    >
      {buttonLabel}
    </CSVLink>
  )
}

export default ExportCSVTemplate
