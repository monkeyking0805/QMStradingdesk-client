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
  fetchVenues,
  deleteVenue,
  fetchIndividualVenue,
  updateVenue
} from '../../actions/admin_management/manage_venues'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { VenueForm } from '../../components/VenueForm'

import '@babel/polyfill'

class ManageVenuesTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined,
      selectUpdateID: undefined,
      venueFormModal: false
    }
    this.dialogConfirmRef = React.createRef()
    this.venueFormRef = React.createRef()
    this.renderDataList = this.renderDataList.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
    this.toggleFormModal = this.toggleFormModal.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchVenues({
      items_per_page: 50
    })
  }

  toggleConfirmModal (venueID) {
    this.setState({ selectDeletedID: venueID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  toggleFormModal () {
    this.setState({ venueFormModal: !this.state.venueFormModal })
  }

  async handlePageChange (i) {
    await this.props.fetchVenues({
      ...this.props.venuesFilter,
      page: i
    })
  }

  async handleFormUpdate (formValues) {
    const { toastManager, venuesFilter } = this.props
    const result = await this.props.updateVenue(this.state.selectUpdateID, formValues)
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.venueUpdated)
      this.toggleFormModal()
      await this.props.fetchVenues({
        ...venuesFilter,
        page: venuesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async handleDelete () {
    const { toastManager, venuesFilter } = this.props
    const result = await this.props.deleteVenue(this.state.selectDeletedID)
    this.dialogConfirmRef.current.toggleConfirmModal()
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.venueDeleted)
      await this.props.fetchVenues({
        ...venuesFilter,
        page: venuesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async initializeUpdateModal (venueID) {
    const result = await this.props.fetchIndividualVenue(venueID)
    if (result.status === 200) {
      this.setState({ venueFormModal: true, selectUpdateID: venueID })
      this.venueFormRef.current.wrappedInstance.props.initialize({
        name: result.data.name
      })
    }
  }

  renderDataList (venues) {
    return venues.map((venue) => {
      return (
        <DataRow>
          <DataColumn width={10}>{venue.id}</DataColumn>
          <DataColumn width={70}>{venue.name}</DataColumn>
          <DataColumn width={20}>
            <i
              className='simple-icon-note'
              onClick={() => { this.initializeUpdateModal(venue.id) }}
            />
            <i
              className='simple-icon-trash'
              onClick={() => { this.toggleConfirmModal(venue.id) }}
            />
          </DataColumn>
        </DataRow>
      )
    })
  }

  render () {
    const { t, venues, venuesPaginate, isVenuesLoading } = this.props
    const { venueFormModal } = this.state

    if (isVenuesLoading) {
      return <LoadingSpinner />
    }

    return (
      <>
        <DataList compact>
          <DataHeader>
            <DataColumn width={10}>{t('ID')}</DataColumn>
            <DataColumn width={70}>{t('venue')}</DataColumn>
            <DataColumn width={20}>{t('actions')}</DataColumn>
          </DataHeader>
          {this.renderDataList(venues)}
        </DataList>
        <Pagination
          currentPage={venuesPaginate.current}
          totalPage={venuesPaginate.last}
          onChangePage={i => this.handlePageChange(i)}
        />
        <DialogConfirm
          ref={this.dialogConfirmRef}
          t={t}
          onConfirm={this.handleDelete}
          title={t('deleteVenue')}
          description={t('deleteVenueDescription')}
        />
        <Modal
          isOpen={venueFormModal}
          outline
          toggle={this.toggleFormModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleFormModal}>
            {t('venue')}
          </ModalHeader>
          <ModalBody>
            <VenueForm
              ref={this.venueFormRef}
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
    isVenuesLoading: adminManagement.isVenuesLoading,
    venues: adminManagement.venues,
    venuesPaginate: adminManagement.venuesPaginate,
    venuesFilter: adminManagement.venuesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchVenues,
    deleteVenue,
    fetchIndividualVenue,
    updateVenue
  }),
  translate('admin')
)(withToastManager(ManageVenuesTable))
