import React, { Component, useState } from 'react'
import styled from 'styled-components'
import { translate } from 'react-i18next'
import { withToastManager } from 'react-toast-notifications'
import { Modal, ModalHeader, ModalBody, CustomInput } from 'reactstrap'
import { EventForm } from '../../components/EventForm'
import { Pagination } from '../../components/Pagination'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { DataList, DataRow, DataColumn, DataHeader } from '../../components/DataList'
import { notificationMessages, dateFormat } from '../../constants/defaultValues'
import { notification } from '../../helpers/notificationHelper'
import { dropdownSingleOptionsTransform, displaySingleDate } from '../../helpers/utils'
import moment from 'moment'
import '@babel/polyfill'

const DataRowWrapper = styled.div`
  cursor: pointer;
`

const ViewArchivedLinks = styled.div`
  cursor: pointer;
  text-align: right;
  text-decoration: underline;
  position: absolute;
  right: 0;
  z-index: 1;
`

const EventsTableWrapper = styled.div`
  position: relative;
`

const RenderDataRow = ({
  t,
  items,
  event,
  handleRow,
  selectedRows,
  initializeUpdateModal
}) => {
  const isExistInSelected = selectedRows.includes(event.id)
  const [selectedState, setSelectedState] = useState(isExistInSelected)
  const isRowSelected = isExistInSelected

  const selectRowHandler = (e) => {
    if (e.shiftKey) {
      for (const item of items) {
        const selected = selectedRows.includes(item.id)
        if (item.id === event.id) break
        if (!selected) handleRow(item.id)
      }
    }
    handleRow(event.id)
    setSelectedState(!selectedState)
  }

  const updateModal = (e) => {
    e.stopPropagation()
    initializeUpdateModal(event.id)
  }
  return (
    <DataRowWrapper onClick={selectRowHandler}>
      <DataRow className={isRowSelected ? 'active-row' : ''}>
        <DataColumn className={isRowSelected ? 'active-column' : ''} width={5}>
          <CustomInput
            type='checkbox'
            checked={isRowSelected}
            className={isRowSelected ? 'active-checkbox' : ''}
          />
        </DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={5}>{event.id}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={15}>{event.name}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>{displaySingleDate(event.startDate, dateFormat.displayFormat)}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>{displaySingleDate(event.endDate, dateFormat.displayFormat)}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>{event.codeType ? event.codeType.name : ''}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>{event.club ? event.club.name : ''}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>{event.venue ? event.venue.name : ''}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={5}>{event.region ? event.region.name : ''}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={5}>{event.round}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={5}>{event.isFta ? t('simulcast') : t('stv')}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={5}>
          <i
            style={{ color: isRowSelected ? '#fff' : null }}
            className='simple-icon-note'
            onClick={(e) => updateModal(e)}
          />
        </DataColumn>
      </DataRow>
    </DataRowWrapper>
  )
}

class ManageEventsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined,
      selectUpdateID: undefined,
      eventFormModal: false
    }
    this.eventFormRef = React.createRef()
    this.toggleFormModal = this.toggleFormModal.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchEvents({
      page: 1,
      order_by: 'id',
      archive: 'FALSE',
      items_per_page: 50
    })
  }

  async componentDidUpdate (prevProps) {
    const { eventsFilter, viewArchived } = this.props
    if (prevProps.viewArchived !== viewArchived) {
      await this.props.fetchEvents({
        ...eventsFilter,
        page: 1,
        order_by: 'id',
        archive: viewArchived ? 'TRUE' : 'FALSE'
      })
    }
  }

  async handlePageChange (i) {
    await this.props.fetchEvents({
      ...this.props.eventsFilter,
      page: i
    })
    this.props.handleClearRows()
  }

  toggleFormModal () {
    this.setState({ eventFormModal: !this.state.eventFormModal })
  }

  async initializeUpdateModal (eventID) {
    const result = await this.props.fetchIndividualEvent(eventID)
    if (result.status === 200) {
      this.setState({ eventFormModal: true, selectUpdateID: eventID })
      const eventDetail = result.data
      this.eventFormRef.current.wrappedInstance.wrappedInstance.props.initialize({
        name: eventDetail.name,
        startDate: {
          value: moment(eventDetail.startDate).utc()
        },
        endDate: {
          value: moment(eventDetail.endDate).utc()
        },
        codeType: dropdownSingleOptionsTransform(eventDetail.codeType),
        club: dropdownSingleOptionsTransform(eventDetail.club),
        venue: dropdownSingleOptionsTransform(eventDetail.venue),
        region: dropdownSingleOptionsTransform(eventDetail.region),
        round: result.data.round,
        isFta: result.data.isFta || false
      })
    }
  }

  async handleFormUpdate (formValues) {
    const { toastManager, eventsFilter } = this.props
    const result = await this.props.updateEvent(this.state.selectUpdateID, {
      ...formValues,
      startDate: moment(formValues.startDate.value).utc().toISOString(),
      endDate: moment(formValues.endDate.value).utc().toISOString()
    })
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.eventUpdated)
      this.toggleFormModal()
      await this.props.fetchEvents(eventsFilter)
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { t, events, eventsPaginate, isEventsLoading, selectedRows, handleRow, viewArchived, toggleArchive } = this.props
    const { eventFormModal } = this.state

    if (isEventsLoading) {
      return <LoadingSpinner />
    }

    return (
      <EventsTableWrapper>
        <DataList compact>
          <DataHeader>
            <DataColumn width={5} />
            <DataColumn width={5}>{t('id')}</DataColumn>
            <DataColumn width={15}>{t('fixture')}</DataColumn>
            <DataColumn width={10}>{t('startDate')}</DataColumn>
            <DataColumn width={10}>{t('endDate')}</DataColumn>
            <DataColumn width={10}>{t('eventType')}</DataColumn>
            <DataColumn width={10}>{t('club')}</DataColumn>
            <DataColumn width={10}>{t('venue')}</DataColumn>
            <DataColumn width={5}>{t('state')}</DataColumn>
            <DataColumn width={5}>{t('round')}</DataColumn>
            <DataColumn width={5}>{t('broadcast')}</DataColumn>
            <DataColumn width={5}>{t('actions')}</DataColumn>
          </DataHeader>
          {events.map(event => (
            <RenderDataRow
              t={t}
              event={event}
              items={events}
              handleRow={handleRow}
              selectedRows={selectedRows}
              initializeUpdateModal={this.initializeUpdateModal}
            />
          ))}
        </DataList>
        {!viewArchived &&
          <ViewArchivedLinks
            onClick={toggleArchive}
            style={eventsPaginate.last > 1 ? { bottom: 20 } : { bottom: -20 }}
          >
            View Archived Items
          </ViewArchivedLinks>}
        <Pagination
          totalPage={eventsPaginate.last}
          currentPage={eventsPaginate.current}
          onChangePage={i => this.handlePageChange(i)}
        />
        <Modal
          isOpen={eventFormModal}
          outline
          toggle={this.toggleFormModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleFormModal}>
            {t('event')}
          </ModalHeader>
          <ModalBody>
            <EventForm
              ref={this.eventFormRef}
              handleFormSubmit={this.handleFormUpdate}
            />
          </ModalBody>
        </Modal>
      </EventsTableWrapper>
    )
  }
}

ManageEventsTable.defaultProps = {
  t: () => {},
  events: [],
  selectedRows: [],
  isEventsLoading: false,
  fetchEvents: () => {},
  handleRow: () => {},
  eventsPaginate: {
    last: 1,
    current: 0
  }
}

export default translate('events')(withToastManager(ManageEventsTable))
