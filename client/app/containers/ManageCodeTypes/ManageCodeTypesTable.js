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
  fetchCodeTypes,
  deleteCodeType,
  fetchIndividualCodeType,
  updateCodeType
} from '../../actions/admin_management/manage_code_types'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { CodeTypeForm } from '../../components/CodeTypeForm'
import { dropdownSingleOptionsTransform } from '../../helpers/utils'

import '@babel/polyfill'

class ManageCodeTypesTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined,
      selectUpdateID: undefined,
      codeTypeFormModal: false
    }
    this.dialogConfirmRef = React.createRef()
    this.codeTypeFormRef = React.createRef()
    this.renderDataList = this.renderDataList.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
    this.toggleFormModal = this.toggleFormModal.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchCodeTypes({
      items_per_page: 50
    })
  }

  toggleConfirmModal (codeTypeID) {
    this.setState({ selectDeletedID: codeTypeID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  toggleFormModal () {
    this.setState({ codeTypeFormModal: !this.state.codeTypeFormModal })
  }

  async handlePageChange (i) {
    await this.props.fetchCodeTypes({
      ...this.props.codeTypesFilter,
      page: i
    })
  }

  async handleFormUpdate (formValues) {
    const { toastManager, codeTypesFilter } = this.props
    const result = await this.props.updateCodeType(this.state.selectUpdateID, formValues)
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.codeTypeUpdated)
      this.toggleFormModal()
      await this.props.fetchCodeTypes({
        ...codeTypesFilter,
        page: codeTypesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async handleDelete () {
    const { toastManager, codeTypesFilter } = this.props
    const result = await this.props.deleteCodeType(this.state.selectDeletedID)
    this.dialogConfirmRef.current.toggleConfirmModal()
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.codeTypeDeleted)
      await this.props.fetchCodeTypes({
        ...codeTypesFilter,
        page: codeTypesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async initializeUpdateModal (codeTypeID) {
    const result = await this.props.fetchIndividualCodeType(codeTypeID)
    if (result.status === 200) {
      this.setState({ codeTypeFormModal: true, selectUpdateID: codeTypeID })
      // 2 Warpped Instance
      this.codeTypeFormRef.current.wrappedInstance.wrappedInstance.props.initialize({
        name: result.data.name,
        code: dropdownSingleOptionsTransform(result.data.code)
      })
    }
  }

  renderDataList (codeTypes) {
    return codeTypes.map((codeType) => {
      return (
        <DataRow>
          <DataColumn width={5}>{codeType.id}</DataColumn>
          <DataColumn width={35}>{codeType.name}</DataColumn>
          <DataColumn width={40}>{codeType.code.name}</DataColumn>
          <DataColumn width={20}>
            <i
              className='simple-icon-note'
              onClick={() => { this.initializeUpdateModal(codeType.id) }}
            />
            <i
              className='simple-icon-trash'
              onClick={() => { this.toggleConfirmModal(codeType.id) }}
            />
          </DataColumn>
        </DataRow>
      )
    })
  }

  render () {
    const { t, codeTypes, codeTypesPaginate, isCodeTypesLoading } = this.props
    const { codeTypeFormModal } = this.state

    if (isCodeTypesLoading) {
      return <LoadingSpinner />
    }

    return (
      <>
        <DataList compact>
          <DataHeader>
            <DataColumn width={5}>{t('ID')}</DataColumn>
            <DataColumn width={35}>{t('eventType')}</DataColumn>
            <DataColumn width={40}>{t('sportsCode')}</DataColumn>
            <DataColumn width={20}>{t('actions')}</DataColumn>
          </DataHeader>
          {this.renderDataList(codeTypes)}
        </DataList>
        <Pagination
          currentPage={codeTypesPaginate.current}
          totalPage={codeTypesPaginate.last}
          onChangePage={i => this.handlePageChange(i)}
        />
        <DialogConfirm
          ref={this.dialogConfirmRef}
          t={t}
          onConfirm={this.handleDelete}
          title={t('deleteCodeType')}
          description={t('deleteCodeTypeDescription')}
        />
        <Modal
          isOpen={codeTypeFormModal}
          outline
          toggle={this.toggleFormModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleFormModal}>
            {t('eventType')}
          </ModalHeader>
          <ModalBody>
            <CodeTypeForm
              ref={this.codeTypeFormRef}
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
    isCodeTypesLoading: adminManagement.isCodeTypesLoading,
    codeTypes: adminManagement.codeTypes,
    codeTypesPaginate: adminManagement.codeTypesPaginate,
    codeTypesFilter: adminManagement.codeTypesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchCodeTypes,
    deleteCodeType,
    fetchIndividualCodeType,
    updateCodeType
  }),
  translate('admin')
)(withToastManager(ManageCodeTypesTable))
