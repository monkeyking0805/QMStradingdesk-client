import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import styled from 'styled-components'
import { PageHeader, Header, HeaderRight, HeaderItem } from '../../components/PageHeader'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { bookingState } from '../../constants/state'
import { ScheduleForm } from '../../components/ScheduleForm'
import { transformRequest } from '../../helpers/packagesHelper'
import { withToastManager } from 'react-toast-notifications'
import { notification } from '../../helpers/notificationHelper'
import { notificationMessages } from '../../constants/defaultValues'
import history from '../../helpers/historyHelper'
import PackageExportCSV from './PackageExportCSV'
import { clientPath } from '../../constants/clientPath'
import '@babel/polyfill'
import {
  savePackage,
  updatePackage,
  setModifyFromIndividualPackage
} from '../../actions/packages_actions'

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

class PackageViewNavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      packageCreate: props.packageCreate,
      saveScheduleModal: false
    }
    this._toggleSaveModal = this._toggleSaveModal.bind(this)
    this._handleScheduleSave = this._handleScheduleSave.bind(this)
    this._handleModifySchedule = this._handleModifySchedule.bind(this)
  }

  static getDerivedStateFromProps (nextProps) {
    return { packageCreate: nextProps.packageCreate }
  }

  _handleModifySchedule () {
    const { individualPackage } = this.props
    if (this.state.packageCreate === false) {
      this.props.setModifyFromIndividualPackage(true, individualPackage.id)
    } else {
      this.props.setModifyFromIndividualPackage(false, null)
    }
    history.push(clientPath.packages.search)
  }

  _toggleSaveModal () {
    this.setState({ saveScheduleModal: !this.state.saveScheduleModal })
  }

  async _handleScheduleSave (scheduleValues) {
    const { assetsSelected, assetsQuantity, brandCategories, match, toastManager } = this.props
    const scheduleRequest = transformRequest(scheduleValues, assetsSelected, assetsQuantity, brandCategories)
    let result
    if (this.state.packageCreate) {
      result = await this.props.savePackage(scheduleRequest)
    } else {
      const { packageID } = match.params
      result = await this.props.updatePackage(packageID, scheduleRequest)
    }
    if (result.status === 201 || result.status === 200) {
      this._toggleSaveModal()
      notification.success(toastManager, notificationMessages.saveSuccess)
      history.push(`${clientPath.packages.view}/${result.data.id}`)
    } else if (result.error) {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const {
      t,
      packageCreate,
      notAllowSalesPermission,
      disabledContent,
      displayConfirm,
      hideWorkingFlowButton,
      disableConfirmSubmit,
      displayAssetsTotal,
      brandCategories,
      toggleSubmitModal,
      toggleConfirmModal,
      packageStatus
    } = this.props
    const { saveScheduleModal } = this.state
    // Should display label by individual status
    let buttonLabel = t('saveDraft')
    if (packageStatus === bookingState.pending) {
      buttonLabel = t('updateSchedule')
    } else if (packageStatus === bookingState.confirmBooking) {
      buttonLabel = t('updateConfirmedSchedule')
    }
    return (
      <>
        <PageHeader>
          <FlexWrapper>
            <Header>
              <HeaderItem>
                {!notAllowSalesPermission && (
                  <span className='header-link' onClick={() => this._handleModifySchedule()}>
                    <i className='simple-icon-arrow-left' />
                    {` ${t('modifySchedule')}`}
                  </span>
                )}
              </HeaderItem>
            </Header>
            <HeaderRight>
              <HeaderItem>
                <PackageExportCSV
                  packageCreate={packageCreate}
                />
              </HeaderItem>
              {!notAllowSalesPermission && (
                <HeaderItem>
                  <Button
                    color='primary'
                    outline
                    className='btn-main-qms'
                    disabled={disabledContent}
                    onClick={() => this._toggleSaveModal()}
                  >
                    {buttonLabel}
                  </Button>
                </HeaderItem>
              )}
              {!displayConfirm && !notAllowSalesPermission && !hideWorkingFlowButton && (
                <HeaderItem>
                  <Button
                    color='primary'
                    className='btn-main-qms'
                    disabled={disabledContent || disableConfirmSubmit}
                    onClick={() => toggleSubmitModal()}
                  >
                    {t('submitSchedule')}
                  </Button>
                </HeaderItem>
              )}
              {displayConfirm && !notAllowSalesPermission && !hideWorkingFlowButton && (
                <HeaderItem>
                  <Button
                    color='primary'
                    className='btn-main-qms'
                    disabled={disabledContent || disableConfirmSubmit}
                    onClick={() => toggleConfirmModal()}
                  >
                    {t('confirmSchedule')}
                  </Button>
                </HeaderItem>
              )}
            </HeaderRight>
          </FlexWrapper>
        </PageHeader>

        <Modal
          isOpen={saveScheduleModal}
          size='lg'
          outline
          toggle={this._toggleSaveModal}
        >
          <ModalHeader toggle={this._toggleSaveModal}>
            {t('saveSchedule')}
          </ModalHeader>
          <ModalBody>
            <ScheduleForm
              initializeForm={!packageCreate}
              formDescription={t('modalInstruction')}
              buttonLabel={t('saveSchedule')}
              brandCategories={brandCategories}
              displayAssetsTotal={displayAssetsTotal}
              handleFormSubmit={this._handleScheduleSave}
            />
          </ModalBody>
        </Modal>
      </>
    )
  }
}

export default compose(
  connect(null, {
    savePackage,
    updatePackage,
    setModifyFromIndividualPackage
  }),
  translate('orderSummary')
)(withToastManager(PackageViewNavBar))
