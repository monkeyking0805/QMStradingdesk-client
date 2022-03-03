import React, { useState, useMemo, Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { DataList, DataColumn, DataHeader } from '../../components/DataList'

import { PageHeader, HeaderRight, HeaderItem } from '../../components/PageHeader'
import { notificationMessages } from '../../constants/defaultValues'
import { withToastManager } from 'react-toast-notifications'
import { notification } from '../../helpers/notificationHelper'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import {
  saveExclusion,
  fetchFilterExclusions
} from '../../actions/exclusions_actions'
import { ExclusionForm } from '../../components/ExclusionForm'
import { Link } from 'react-router-dom'
import { clientPath } from '../../constants/clientPath'
import '@babel/polyfill'

const TableHeader = ({ t }) => {
  const [hideOnScroll, setHideOnScroll] = useState(true)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll],
    false,
    false,
    300
  )

  return useMemo(
    () => (
      <>
        {!hideOnScroll ? (
          <DataList compact>
            <DataHeader>
              <DataColumn width={5} />
              <DataColumn width={5}>{t('id')}</DataColumn>
              <DataColumn width={15}>{t('brandCategory')}</DataColumn>
              <DataColumn width={15}>{t('brand')}</DataColumn>
              <DataColumn width={10}>{t('sportsCode')}</DataColumn>
              <DataColumn width={10}>{t('eventType')}</DataColumn>
              <DataColumn width={10}>{t('club')}</DataColumn>
              <DataColumn width={10}>{t('venue')}</DataColumn>
              <DataColumn width={10}>{t('assetType')}</DataColumn>
              <DataColumn width={20}>{t('notes')}</DataColumn>
              <DataColumn width={5}>{t('action')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ExclusionManagementNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      exclusionFormModal: false
    }
    this._toggleExclusionModal = this._toggleExclusionModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleExclusionModal () {
    this.setState({ exclusionFormModal: !this.state.exclusionFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, filteredParameters } = this.props
    const result = await this.props.saveExclusion(formValues)
    if (result.status === 201) {
      notification.success(toastManager, notificationMessages.saveExclusionSuccess)
      this._toggleExclusionModal()
      await this.props.fetchFilterExclusions(
        { page: filteredParameters.page, items_per_page: filteredParameters.items_per_page },
        { ...filteredParameters, sportCodes: filteredParameters.codes }
      )
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { t } = this.props
    const { exclusionFormModal } = this.state
    return (
      <>
        <Modal
          isOpen={exclusionFormModal}
          outline
          toggle={this._toggleExclusionModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this._toggleExclusionModal}>
            {t('newExclusion')}
          </ModalHeader>
          <ModalBody>
            <ExclusionForm
              handleFormSubmit={this._handleFormSubmit}
            />
          </ModalBody>
        </Modal>

        <PageHeader>
          <HeaderRight>
            <HeaderItem>
              <Link
                to={`${clientPath.settings.exclusion.import}`}
                className='no-padding'
              >
                <Button
                  color='primary'
                  outline
                  className='btn-main-qms'
                >
                  {t('bulkUpdateExclusions')}
                </Button>
              </Link>
            </HeaderItem>
            <HeaderItem>
              <Button
                color='primary'
                className='btn-main-qms'
                onClick={() => this._toggleExclusionModal()}
              >
                {t('addNewExclusion')}
              </Button>
            </HeaderItem>
          </HeaderRight>
          <TableHeader t={t} />
        </PageHeader>
      </>
    )
  }
}

const mapStateToProps = ({ exclusions }) => {
  return {
    filteredPaginate: exclusions.filteredPaginate,
    filteredParameters: exclusions.filteredParameters
  }
}

export default compose(
  connect(mapStateToProps, {
    saveExclusion,
    fetchFilterExclusions
  }),
  translate('exclusions')
)(withToastManager(ExclusionManagementNavbar))
