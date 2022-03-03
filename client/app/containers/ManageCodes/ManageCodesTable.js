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
  fetchCodes,
  deleteCode,
  fetchIndividualCode,
  updateCode
} from '../../actions/admin_management/manage_codes'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { CodeForm } from '../../components/CodeForm'

import '@babel/polyfill'

class ManageCodesTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined,
      selectUpdateID: undefined,
      codeFormModal: false
    }
    this.dialogConfirmRef = React.createRef()
    this.codeFormRef = React.createRef()
    this.renderDataList = this.renderDataList.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
    this.toggleFormModal = this.toggleFormModal.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchCodes({
      items_per_page: 50
    })
  }

  toggleConfirmModal (codeID) {
    this.setState({ selectDeletedID: codeID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  toggleFormModal () {
    this.setState({ codeFormModal: !this.state.codeFormModal })
  }

  async handlePageChange (i) {
    await this.props.fetchCodes({
      ...this.props.codesFilter,
      page: i
    })
  }

  async handleFormUpdate (formValues) {
    const { toastManager, codesFilter } = this.props
    const result = await this.props.updateCode(this.state.selectUpdateID, formValues)
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.codeUpdated)
      this.toggleFormModal()
      await this.props.fetchCodes({
        ...codesFilter,
        page: codesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async handleDelete () {
    const { toastManager, codesFilter } = this.props
    const result = await this.props.deleteCode(this.state.selectDeletedID)
    this.dialogConfirmRef.current.toggleConfirmModal()
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.codeDeleted)
      await this.props.fetchCodes({
        ...codesFilter,
        page: codesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async initializeUpdateModal (codeID) {
    const result = await this.props.fetchIndividualCode(codeID)
    if (result.status === 200) {
      this.setState({ codeFormModal: true, selectUpdateID: codeID })
      this.codeFormRef.current.wrappedInstance.props.initialize({
        name: result.data.name
      })
    }
  }

  renderDataList (codes) {
    return codes.map((code) => {
      return (
        <DataRow>
          <DataColumn width={10}>{code.id}</DataColumn>
          <DataColumn width={70}>{code.name}</DataColumn>
          <DataColumn width={20}>
            <i
              className='simple-icon-note'
              onClick={() => { this.initializeUpdateModal(code.id) }}
            />
            <i
              className='simple-icon-trash'
              onClick={() => { this.toggleConfirmModal(code.id) }}
            />
          </DataColumn>
        </DataRow>
      )
    })
  }

  render () {
    const { t, codes, codesPaginate, isCodesLoading } = this.props
    const { codeFormModal } = this.state

    if (isCodesLoading) {
      return <LoadingSpinner />
    }

    return (
      <>
        <DataList compact>
          <DataHeader>
            <DataColumn width={10}>{t('ID')}</DataColumn>
            <DataColumn width={70}>{t('sportsCode')}</DataColumn>
            <DataColumn width={20}>{t('actions')}</DataColumn>
          </DataHeader>
          {this.renderDataList(codes)}
        </DataList>
        <Pagination
          currentPage={codesPaginate.current}
          totalPage={codesPaginate.last}
          onChangePage={i => this.handlePageChange(i)}
        />
        <DialogConfirm
          ref={this.dialogConfirmRef}
          t={t}
          onConfirm={this.handleDelete}
          title={t('deleteCode')}
          description={t('deleteCodeDescription')}
        />
        <Modal
          isOpen={codeFormModal}
          outline
          toggle={this.toggleFormModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleFormModal}>
            {t('sportsCode')}
          </ModalHeader>
          <ModalBody>
            <CodeForm
              ref={this.codeFormRef}
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
    isCodesLoading: adminManagement.isCodesLoading,
    codes: adminManagement.codes,
    codesPaginate: adminManagement.codesPaginate,
    codesFilter: adminManagement.codesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchCodes,
    deleteCode,
    fetchIndividualCode,
    updateCode
  }),
  translate('admin')
)(withToastManager(ManageCodesTable))
