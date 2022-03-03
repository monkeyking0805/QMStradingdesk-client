import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { DataList, DataRow, DataColumn, DataHeader } from '../../components/DataList'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { Pagination } from '../../components/Pagination'
import { DialogConfirm } from '../../components/DialogConfirm'
import { withToastManager } from 'react-toast-notifications'
import { notification } from '../../helpers/notificationHelper'
import { notificationMessages } from '../../constants/defaultValues'
import {
  fetchApps,
  deleteApp,
  fetchIndividualApp,
  updateApp
} from '../../actions/admin_management/manage_apps'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { AppForm } from '../../components/AppsForm'

import '@babel/polyfill'

class ManageAppsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined,
      selectUpdateID: undefined,
      appsFormModal: false
    }
    this.dialogConfirmRef = React.createRef()
    this.appsFormRef = React.createRef()
    this.renderDataList = this.renderDataList.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
    this.toggleFormModal = this.toggleFormModal.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchApps({
      items_per_page: 50
    })
  }

  toggleConfirmModal (appsID) {
    this.setState({ selectDeletedID: appsID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  toggleFormModal () {
    this.setState({ appsFormModal: !this.state.appsFormModal })
  }

  async handlePageChange (i) {
    await this.props.fetchApps({
      ...this.props.appsFilter,
      page: i
    })
  }

  async handleFormUpdate (formValues) {
    const { toastManager, appsFilter } = this.props
    const result = await this.props.updateApp(this.state.selectUpdateID, formValues)
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.appsUpdated)
      this.toggleFormModal()
      await this.props.fetchApps({
        ...appsFilter,
        page: appsFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async handleDelete () {
    const { toastManager, appsFilter } = this.props
    const result = await this.props.deleteApp(this.state.selectDeletedID)
    this.dialogConfirmRef.current.toggleConfirmModal()
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.appsDeleted)
      await this.props.fetchApps({
        ...appsFilter,
        page: appsFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async initializeUpdateModal (appsID) {
    const result = await this.props.fetchIndividualApp(appsID)
    if (result.status === 200) {
      this.setState({ appsFormModal: true, selectUpdateID: appsID })
      this.appsFormRef.current.wrappedInstance.props.initialize({
        name: result.data.name
      })
    }
  }

  renderDataList (apps) {
    return apps.map((apps) => {
      return (
        <DataRow>
          <DataColumn width={10}>{apps.id}</DataColumn>
          <DataColumn width={30}>{apps.name}</DataColumn>
          <DataColumn width={40}>{apps.api_keys}</DataColumn>
          <DataColumn width={20}>
            <i
              className='simple-icon-note'
              onClick={() => { this.initializeUpdateModal(apps.id) }}
            />
            <i
              className='simple-icon-trash'
              onClick={() => { this.toggleConfirmModal(apps.id) }}
            />
          </DataColumn>
        </DataRow>
      )
    })
  }

  render () {
    const { t, apps, appsPaginate, isAppsLoading } = this.props
    const { appsFormModal } = this.state

    if (isAppsLoading) {
      return <LoadingSpinner />
    }

    return (
      <>
        <DataList compact>
          <DataHeader>
            <DataColumn width={10}>{t('ID')}</DataColumn>
            <DataColumn width={30}>{t('apps')}</DataColumn>
            <DataColumn width={40}>{t('apiKeys')}</DataColumn>
            <DataColumn width={20}>{t('actions')}</DataColumn>
          </DataHeader>
          {this.renderDataList(apps)}
        </DataList>
        <Pagination
          currentPage={appsPaginate.current}
          totalPage={appsPaginate.last}
          onChangePage={i => this.handlePageChange(i)}
        />
        <DialogConfirm
          ref={this.dialogConfirmRef}
          t={t}
          onConfirm={this.handleDelete}
          title={t('deleteApp')}
          description={t('deleteAppDescription')}
        />
        <Modal
          isOpen={appsFormModal}
          outline
          toggle={this.toggleFormModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleFormModal}>
            {t('apps')}
          </ModalHeader>
          <ModalBody>
            <AppForm
              ref={this.appsFormRef}
              handleFormSubmit={this.handleFormUpdate}
            />
          </ModalBody>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    isAppsLoading: adminManagement.isAppsLoading,
    apps: adminManagement.apps,
    appsPaginate: adminManagement.appsPaginate,
    appsFilter: adminManagement.appsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchApps,
    deleteApp,
    fetchIndividualApp,
    updateApp
  }),
  translate('admin')
)(withToastManager(ManageAppsTable))
