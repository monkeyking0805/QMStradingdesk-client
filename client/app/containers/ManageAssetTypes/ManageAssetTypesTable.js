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
  fetchAssetTypes,
  deleteAssetType,
  fetchIndividualAssetType,
  updateAssetType
} from '../../actions/admin_management/manage_asset_types'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { AssetTypeForm } from '../../components/AssetTypeForm'

import '@babel/polyfill'

class ManageAssetTypesTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined,
      selectUpdateID: undefined,
      assetTypeFormModal: false
    }
    this.dialogConfirmRef = React.createRef()
    this.assetTypeFormRef = React.createRef()
    this.renderDataList = this.renderDataList.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
    this.toggleFormModal = this.toggleFormModal.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchAssetTypes({
      items_per_page: 50
    })
  }

  toggleConfirmModal (assetTypeID) {
    this.setState({ selectDeletedID: assetTypeID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  toggleFormModal () {
    this.setState({ assetTypeFormModal: !this.state.assetTypeFormModal })
  }

  async handlePageChange (i) {
    await this.props.fetchAssetTypes({
      ...this.props.assetTypesFilter,
      page: i
    })
  }

  async handleFormUpdate (formValues) {
    const { toastManager, assetTypesFilter } = this.props
    const result = await this.props.updateAssetType(this.state.selectUpdateID, formValues)
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.assetTypeSaved)
      this.toggleFormModal()
      await this.props.fetchAssetTypes({
        ...assetTypesFilter,
        page: assetTypesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async handleDelete () {
    const { toastManager, assetTypesFilter } = this.props
    const result = await this.props.deleteAssetType(this.state.selectDeletedID)
    this.dialogConfirmRef.current.toggleConfirmModal()
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.assetTypeDeleted)
      await this.props.fetchAssetTypes({
        ...assetTypesFilter,
        page: assetTypesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async initializeUpdateModal (assetTypeID) {
    const result = await this.props.fetchIndividualAssetType(assetTypeID)
    if (result.status === 200) {
      this.setState({ assetTypeFormModal: true, selectUpdateID: assetTypeID })
      this.assetTypeFormRef.current.wrappedInstance.props.initialize({
        name: result.data.name
      })
    }
  }

  renderDataList (assetTypes) {
    return assetTypes.map((assetType) => {
      return (
        <DataRow>
          <DataColumn width={10}>{assetType.id}</DataColumn>
          <DataColumn width={70}>{assetType.name}</DataColumn>
          <DataColumn width={20}>
            <i
              className='simple-icon-note'
              onClick={() => { this.initializeUpdateModal(assetType.id) }}
            />
            <i
              className='simple-icon-trash'
              onClick={() => { this.toggleConfirmModal(assetType.id) }}
            />
          </DataColumn>
        </DataRow>
      )
    })
  }

  render () {
    const { t, assetTypes, assetTypesPaginate, isAssetTypesLoading } = this.props
    const { assetTypeFormModal } = this.state

    if (isAssetTypesLoading) {
      return <LoadingSpinner />
    }

    return (
      <>
        <DataList compact>
          <DataHeader>
            <DataColumn width={10}>{t('ID')}</DataColumn>
            <DataColumn width={70}>{t('assetType')}</DataColumn>
            <DataColumn width={20}>{t('actions')}</DataColumn>
          </DataHeader>
          {this.renderDataList(assetTypes)}
        </DataList>
        <Pagination
          currentPage={assetTypesPaginate.current}
          totalPage={assetTypesPaginate.last}
          onChangePage={i => this.handlePageChange(i)}
        />
        <DialogConfirm
          ref={this.dialogConfirmRef}
          t={t}
          onConfirm={this.handleDelete}
          title={t('deleteAssetType')}
          description={t('deleteAssetTypeDescription')}
        />
        <Modal
          isOpen={assetTypeFormModal}
          outline
          toggle={this.toggleFormModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleFormModal}>
            {t('assetType')}
          </ModalHeader>
          <ModalBody>
            <AssetTypeForm
              ref={this.assetTypeFormRef}
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
    isAssetTypesLoading: adminManagement.isAssetTypesLoading,
    assetTypes: adminManagement.assetTypes,
    assetTypesPaginate: adminManagement.assetTypesPaginate,
    assetTypesFilter: adminManagement.assetTypesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchAssetTypes,
    deleteAssetType,
    fetchIndividualAssetType,
    updateAssetType
  }),
  translate('admin')
)(withToastManager(ManageAssetTypesTable))
