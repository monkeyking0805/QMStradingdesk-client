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
  fetchClubs,
  deleteClub,
  fetchIndividualClub,
  updateClub
} from '../../actions/admin_management/manage_clubs'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { ClubForm } from '../../components/ClubForm'

import '@babel/polyfill'

class ManageClubsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined,
      selectUpdateID: undefined,
      clubFormModal: false
    }
    this.dialogConfirmRef = React.createRef()
    this.clubFormRef = React.createRef()
    this.renderDataList = this.renderDataList.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
    this.toggleFormModal = this.toggleFormModal.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchClubs({
      items_per_page: 50
    })
  }

  toggleConfirmModal (clubID) {
    this.setState({ selectDeletedID: clubID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  toggleFormModal () {
    this.setState({ clubFormModal: !this.state.clubFormModal })
  }

  async handlePageChange (i) {
    await this.props.fetchClubs({
      ...this.props.clubsFilter,
      page: i
    })
  }

  async handleFormUpdate (formValues) {
    const { toastManager, clubsFilter } = this.props
    const result = await this.props.updateClub(this.state.selectUpdateID, formValues)
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.clubUpdated)
      await this.props.fetchClubs(clubsFilter)
      this.toggleFormModal()
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async handleDelete () {
    const { toastManager, clubsFilter } = this.props
    const result = await this.props.deleteClub(this.state.selectDeletedID)
    this.dialogConfirmRef.current.toggleConfirmModal()
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.clubDeleted)
      await this.props.fetchClubs(clubsFilter)
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async initializeUpdateModal (clubID) {
    const result = await this.props.fetchIndividualClub(clubID)
    if (result.status === 200) {
      this.setState({ clubFormModal: true, selectUpdateID: clubID })
      this.clubFormRef.current.wrappedInstance.props.initialize({
        name: result.data.name
      })
    }
  }

  renderDataList (clubs) {
    return clubs.map((club) => {
      return (
        <DataRow>
          <DataColumn width={10}>{club.id}</DataColumn>
          <DataColumn width={70}>{club.name}</DataColumn>
          <DataColumn width={20}>
            <i
              className='simple-icon-note'
              onClick={() => { this.initializeUpdateModal(club.id) }}
            />
            <i
              className='simple-icon-trash'
              onClick={() => { this.toggleConfirmModal(club.id) }}
            />
          </DataColumn>
        </DataRow>
      )
    })
  }

  render () {
    const { t, clubs, clubsPaginate, isClubsLoading } = this.props
    const { clubFormModal } = this.state

    if (isClubsLoading) {
      return <LoadingSpinner />
    }

    return (
      <>
        <DataList compact>
          <DataHeader>
            <DataColumn width={10}>{t('ID')}</DataColumn>
            <DataColumn width={70}>{t('club')}</DataColumn>
            <DataColumn width={20}>{t('actions')}</DataColumn>
          </DataHeader>
          {this.renderDataList(clubs)}
        </DataList>
        <Pagination
          currentPage={clubsPaginate.current}
          totalPage={clubsPaginate.last}
          onChangePage={i => this.handlePageChange(i)}
        />
        <DialogConfirm
          ref={this.dialogConfirmRef}
          t={t}
          onConfirm={this.handleDelete}
          title={t('deleteClub')}
          description={t('deleteClubDescription')}
        />
        <Modal
          isOpen={clubFormModal}
          outline
          toggle={this.toggleFormModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleFormModal}>
            {t('club')}
          </ModalHeader>
          <ModalBody>
            <ClubForm
              ref={this.clubFormRef}
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
    isClubsLoading: adminManagement.isClubsLoading,
    clubs: adminManagement.clubs,
    clubsPaginate: adminManagement.clubsPaginate,
    clubsFilter: adminManagement.clubsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchClubs,
    deleteClub,
    fetchIndividualClub,
    updateClub
  }),
  translate('admin')
)(withToastManager(ManageClubsTable))
