import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap'
import { ImportFile } from '../../components/ImportFile'
import { validateAssetsImportCSV, resetValidateAssetsImport } from '../../actions/admin_management/manage_assets'
class ManageAssetImportPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      csvImportData: [],
      disabledImport: true
    }
    this._handleReadCSV = this._handleReadCSV.bind(this)
    this._handleDataUpload = this._handleDataUpload.bind(this)
  }

  componentWillUnmount () {
    this.props.resetValidateAssetsImport()
  }

  _handleReadCSV (data) {
    this.setState({
      csvImportData: data,
      disabledImport: false
    })
  }

  _handleDataUpload () {
    this.props.validateAssetsImportCSV(this.state.csvImportData)
  }

  render () {
    const { t } = this.props
    return (
      <Card>
        <CardBody>
          <CardTitle>{t('fileUpload')}</CardTitle>
          <Row>
            <Col xs={6}>
              <p>{t('uploadAssetsDescription1')}</p>
              <p>{t('uploadAssetsDescription2')}</p>
            </Col>
            <Col xs={6}>
              <ImportFile
                buttonLabel={t('uploadAssets')}
                handleReadCSV={this._handleReadCSV}
                onSubmit={this._handleDataUpload}
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
    validateAssetsImportCSV,
    resetValidateAssetsImport
  }),
  translate('assets')
)(ManageAssetImportPanel)
