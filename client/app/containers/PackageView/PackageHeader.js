import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import { StepsProgress } from '../../components/StepsProgress'
import { bookingState } from '../../constants/state'
import PackageViewNavBar from './PackageViewNavBar'
import '@babel/polyfill'
import {
  savePackage,
  updatePackage,
  setModifyFromIndividualPackage
} from '../../actions/packages_actions'
class PackageHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      packageCreate: props.packageCreate,
      saveScheduleModal: false
    }
    this.getCurrentState = this.getCurrentState.bind(this)
  }

  static getDerivedStateFromProps (nextProps) {
    return { packageCreate: nextProps.packageCreate }
  }

  getCurrentState (packageStatus) {
    switch (packageStatus) {
      case bookingState.draft:
        return 0
      case bookingState.pending:
        return 1
      case bookingState.confirmBooking:
        return 2
    }
  }

  render () {
    const {
      t,
      packageCreate,
      individualPackage
    } = this.props
    const displayStepProgress = (packageCreate) || false
    const stepList = [
      { stepLabel: t(bookingState.draft) },
      { stepLabel: t(bookingState.pending) },
      { stepLabel: t(bookingState.confirmBooking) }
    ]

    return (
      <>
        <PackageViewNavBar
          {...this.props}
        />
        <div className='summary-header pt-70'>
          <Row>
            <Col xs={12} sm={9} className='align-middle'>
              <Row>
                <Col xs={12}>
                  <h1 className='m-0 p-0'>{t('schedulePreview')}</h1>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className='mt-50'>
                  {!displayStepProgress && (
                    <StepsProgress currentState={this.getCurrentState(individualPackage.status)} stepList={stepList} />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ assetsManagement, packages, searchAsset }) => {
  return {
    assetsQuantity: assetsManagement.assetsQuantity,
    assetsSelected: assetsManagement.assetsSelected,
    individualPackage: packages.individualPackage,
    brandCategories: searchAsset.filters.brandCategories
  }
}

export default compose(
  connect(mapStateToProps, {
    savePackage,
    updatePackage,
    setModifyFromIndividualPackage
  }),
  translate('orderSummary')
)(PackageHeader)
