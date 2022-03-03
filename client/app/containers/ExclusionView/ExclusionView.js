import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import ExclusionFilter from './ExclusionFilter'
import ExclusionTable from './ExclusionTable'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { WarningBlock } from '../../components/WarningBlock'

class ExclusionView extends Component {
  render () {
    const { t, isLoading, exclusionList } = this.props
    const displayTable = (exclusionList.length > 0) || false
    return (
      <>
        <Row>
          <Col xs={12} className='mt-30'>
            <h1 className='m-0 p-0'>{t('exclusions')}</h1>
          </Col>
          <Col xs={3} className='mt-30'>
            <ExclusionFilter />
          </Col>
        </Row>

        <Row className='mt-30'>
          <Col xs={12}>
            {isLoading && (
              <LoadingSpinner />
            )}
            {!isLoading && displayTable && (
              <ExclusionTable />
            )}
            {!isLoading && !displayTable && (
              <WarningBlock
                title={t('noExclusionAvailable')}
                description={t('noExclusionDescription')}
              />
            )}
          </Col>
        </Row>

      </>
    )
  }
}

const mapStateToProps = ({ exclusions }) => {
  return {
    exclusionList: exclusions.exclusionList,
    isLoading: exclusions.isLoading
  }
}

export default compose(
  connect(mapStateToProps, null),
  translate('exclusions')
)(ExclusionView)
