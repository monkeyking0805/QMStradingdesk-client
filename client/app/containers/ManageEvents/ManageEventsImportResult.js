import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap'
import ManageEventsImportTable from './ManageEventsImportTable'

class ManageEventsImportResult extends Component {
  render () {
    const {
      t,
      validateResult,
      validateSuccess,
      isValidating,
      isValidateLoaded,
      totalAppliedRecommendation
    } = this.props

    if (isValidating) return <LoadingSpinner />
    return (
      <>
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
              <ManageEventsImportTable />
            </Col>
          </Row>
        )}
      </>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    isValidating: adminManagement.isEventValidating,
    isValidateLoaded: adminManagement.isEventValidateLoaded,
    totalAppliedRecommendation: adminManagement.eventTotalAppliedRecommendation,
    validateResult: adminManagement.eventValidateResult,
    validateSuccess: adminManagement.eventValidateSuccess
  }
}

export default compose(
  connect(mapStateToProps, null),
  translate('events')
)(ManageEventsImportResult)
