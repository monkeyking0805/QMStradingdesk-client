import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { ImportFile } from '../../components/ImportFile'
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap'
import { validateEventsImportCSV, resetValidateEventsImport } from '../../actions/admin_management/manage_events'
// import PropTypes from 'prop-types'
class ManageEventsImportPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      csvImportData: [],
      disabledImport: true
    }
    this.handleReadCSV = this.handleReadCSV.bind(this)
    this.handleUploadData = this.handleUploadData.bind(this)
  }

  handleReadCSV (data) {
    this.setState({
      csvImportData: data,
      disabledImport: false
    })
  }

  handleUploadData () {
    this.props.validateEventsImportCSV(this.state.csvImportData)
  }

  render () {
    const { t } = this.props
    return (
      <Card>
        <CardBody>
          <CardTitle>{t('fileUpload')}</CardTitle>
          <Row>
            <Col xs={6}>
              <p>{t('uploadEventsDescription1')}</p>
              <p>{t('uploadEventsDescription2')}</p>
            </Col>
            <Col xs={6}>
              <ImportFile
                buttonLabel={t('uploadEvents')}
                handleReadCSV={this.handleReadCSV}
                onSubmit={this.handleUploadData}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default compose(
  connect(null, {
    validateEventsImportCSV,
    resetValidateEventsImport
  }),
  translate('events')
)(ManageEventsImportPanel)
