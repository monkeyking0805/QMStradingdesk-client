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
import { fetchApps, saveApp } from '../../actions/admin_management/manage_apps'
import { AppForm } from '../../components/AppsForm'
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
              <DataColumn width={10}>{t('ID')}</DataColumn>
              <DataColumn width={30}>{t('apps')}</DataColumn>
              <DataColumn width={40}>{t('apiKeys')}</DataColumn>
              <DataColumn width={20}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ManageAppsNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      appsFormModal: false
    }
    this._toggleAppsModal = this._toggleAppsModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleAppsModal () {
    this.setState({ appsFormModal: !this.state.appsFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, appsFilter } = this.props
    const result = await this.props.saveApp(formValues)
    if (result.status === 200 || result.status === 201) {
      notification.success(toastManager, notificationMessages.appsSaved)
      this._toggleAppsModal()
      await this.props.fetchApps({
        ...appsFilter,
        page: appsFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { t } = this.props
    const { appsFormModal } = this.state
    return (
      <>
        <Modal
          isOpen={appsFormModal}
          outline
          toggle={this._toggleAppsModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this._toggleAppsModal}>
            {t('apps')}
          </ModalHeader>
          <ModalBody>
            <AppForm
              handleFormSubmit={this._handleFormSubmit}
            />
          </ModalBody>
        </Modal>

        <PageHeader>
          <HeaderRight>
            <HeaderItem>
              <Button
                color='primary'
                className='btn-main-qms'
                onClick={() => this._toggleAppsModal()}
              >
                {t('addNewApps')}
              </Button>
            </HeaderItem>
          </HeaderRight>
          <TableHeader t={t} />
        </PageHeader>
      </>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    appsFilter: adminManagement.appsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveApp,
    fetchApps
  }),
  translate('admin')
)(withToastManager(ManageAppsNavbar))
