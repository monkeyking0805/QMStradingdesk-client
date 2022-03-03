import React from 'react'
import { translate } from 'react-i18next'
import CSVReader from 'react-csv-reader'
import { Button, Label } from 'reactstrap'

const ImportFile = ({ t, handleReadCSV, onSubmit, disableImport, buttonLabel }) => {
  return (
    <>
      <Label>{t('csvFile')}</Label>
      <CSVReader
        cssClass='react-csv-input form-control'
        onFileLoaded={handleReadCSV}
      />
      <Button
        type='submit'
        color='primary'
        className='btn-main-qms pull-right mt-2'
        onClick={() => onSubmit()}
        disabled={disableImport}
      >
        {buttonLabel}
      </Button>
    </>
  )
}

export default translate('exclusions')(ImportFile)
