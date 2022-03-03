import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap'
import { validateImportCSV, resetValidateImport } from '../../actions/exclusions_actions'
import { ImportFile } from '../../components/ImportFile'
import { ExportCSVTemplate } from '../../components/ExportCSVTemplate'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { PageHeader, Header, HeaderRight, HeaderItem } from '../../components/PageHeader'
import { Link } from 'react-router-dom'
import { clientPath } from '../../constants/clientPath'
import ExclusionImportTable from './ExclusionImportTable'
class ExclusionImport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      csvImportData: [],
      disabledImport: true
    }
    this.handleReadCSV = this.handleReadCSV.bind(this)
    this.handleUploadData = this.handleUploadData.bind(this)
  }

  componentWillUnmount () {
    this.props.resetValidateImport()
  }

  handleReadCSV (data) {
    this.setState({
      csvImportData: data,
      disabledImport: false
    })
  }

  handleUploadData () {
    this.props.validateImportCSV(this.state.csvImportData)
  }

  render () {
    const {
      t,
      validateResult,
      validateSuccess,
      isValidating,
      isValidateLoaded,
      totalAppliedRecommendation
    } = this.props

    const { disabledImport } = this.state

    return (
      <>
        <PageHeader>
          <Header>
            <HeaderItem>
              <Link
                to={`${clientPath.settings.exclusion.view}`}
                className='no-padding'
              >
                <span className='header-link'>
                  <i className='simple-icon-arrow-left' />
                  {` ${t('Back')}`}
                </span>
              </Link>
            </HeaderItem>
          </Header>
          <HeaderRight>
            <HeaderItem>
              <ExportCSVTemplate
                csvData={[
                  [t('brandCategory'), t('brand'), t('eventType'), t('club'), t('venue'), t('assetType'), t('note')]
                ]}
                buttonLabel={t('downloadCSVTemplate')}
                fileName='exclusion-import-template'
              />
            </HeaderItem>
          </HeaderRight>
        </PageHeader>
        <Row>
          <Col xs={3} className='pt-70'>
            <h1 className='m-0 p-0'>{t('uploadExclusions')}</h1>
          </Col>
        </Row>
        <Row className='mt-15'>
          <Col xs={12}>
            <Card>
              <CardBody>
                <CardTitle>{t('fileUpload')}</CardTitle>
                <Row>
                  <Col xs={6}>
                    <p>{t('uploadExclusionDescription1')}</p>
                    <p>{t('uploadExclusionDescription2')}</p>
                  </Col>
                  <Col xs={6}>
                    <ImportFile
                      buttonLabel={t('uploadExclusions')}
                      handleReadCSV={this.handleReadCSV}
                      onSubmit={this.handleUploadData}
                      disableImport={disabledImport}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {isValidating && (
          <LoadingSpinner />
        )}
        {isValidateLoaded && !validateSuccess && !isValidating && (
          <Row className='mt-15'>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <CardTitle>{t('results')}</CardTitle>
                  <Row>
                    <Col xs={6}>
                      <p>{t('uploadFailDescription')}</p>
                    </Col>
                    <Col xs={6} className='upload error'>
                      <i className='simple-icon-close' />
                      <p>{t('importError')}</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        {isValidateLoaded && validateSuccess && !isValidating && (
          <Row className='mt-15'>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <CardTitle>{t('results')}</CardTitle>
                  <Row>
                    <Col xs={6}>
                      <p>{t('uploadSuccessDescription1')}</p>
                      <p>{t('uploadSuccessDescription2')}</p>
                    </Col>
                    <Col xs={6} className='upload success'>
                      <i className='simple-icon-check' />
                      <p>{t('importSuccess')}</p>
                      <h2>{validateResult.length}</h2>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        {isValidateLoaded && totalAppliedRecommendation !== 0 && !isValidating && (
          <Row className='mt-15'>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <CardTitle>{t('automaticMatchValue')}</CardTitle>
                  <Row>
                    <Col xs={6}>
                      <p>{t('automaticDescription1')}</p>
                      <p>{t('automacicDescription2')}</p>
                    </Col>
                    <Col xs={6} className='upload warning'>
                      <i className='simple-icon-exclamation' />
                      <p>{t('resultsMatched')}</p>
                      <h2>{totalAppliedRecommendation}</h2>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        {isValidateLoaded && !isValidating && validateResult.length !== 0 && (
          <Row className='mt-15'>
            <Col xs={12}>
              <ExclusionImportTable />
            </Col>
          </Row>
        )}

      </>
    )
  }
}

const mapStateToProps = ({ exclusions }) => {
  return {
    isValidating: exclusions.isValidating,
    isValidateLoaded: exclusions.isValidateLoaded,
    totalAppliedRecommendation: exclusions.totalAppliedRecommendation,
    validateResult: exclusions.validateResult,
    validateSuccess: exclusions.validateSuccess
  }
}

export default compose(
  connect(mapStateToProps, {
    validateImportCSV,
    resetValidateImport
  }),
  translate('exclusions')
)(ExclusionImport)
