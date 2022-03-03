import React, { Component } from 'react'
import { compose } from 'redux'
import Select from 'react-select'
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import ManageEventsTable from './ManageEventsTable'
import ManageEventsFilter from './ManageEventsFilter'
import ManageEventsNavbar from './ManageEventsNavbar'
import ManageEventsActions from './ManageEventsActions'
import { displayOptions } from '../../constants/defaultValues'
import {
  fetchClubs,
  fetchEventTypes,
  fetchVenues
} from '../../actions/assets_actions'
import {
  updateEvent,
  fetchEvents,
  deleteEvent,
  restoreEvent,
  archiveEvent,
  fetchIndividualEvent
} from '../../actions/admin_management/manage_events'
import {
  fetchFlagRegions
} from '../../actions/flag_actions'
import { tableDisplayLabel } from '../../helpers/utils'
import '@babel/polyfill'

class ManageEvents extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRows: [],
      viewArchived: false
    }
    this.handleRow = this.handleRow.bind(this)
    this.toggleArchive = this.toggleArchive.bind(this)
    this.handleAllRows = this.handleAllRows.bind(this)
    this.handleClearRows = this.handleClearRows.bind(this)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  async componentDidMount () {
    await Promise.all([
      await this.props.fetchClubs(),
      await this.props.fetchEventTypes(),
      await this.props.fetchVenues(),
      await this.props.fetchFlagRegions()
    ])
  }

  // Handling when item per page change
  async handleItemPerPageChange (itemPerPageValue) {
    await this.props.fetchEvents({
      ...this.props.eventsFilter,
      items_per_page: itemPerPageValue.value
    })
    this.handleClearRows()
  }

  handleRow (row) {
    const rows = this.state.selectedRows
    const index = rows.findIndex(id => row === id)
    if (index === -1) {
      rows.push(row)
    } else {
      rows.splice(index, 1)
    }
    this.setState({ selectedRows: rows })
  }

  toggleArchive () {
    const { viewArchived } = this.state
    this.setState({ viewArchived: !viewArchived }, async () => {
      await this.props.fetchEvents({
        page: 1,
        order_by: 'id',
        items_per_page: 50,
        archive: this.state.viewArchived ? 'TRUE' : 'FALSE'
      })
    })
  }

  handleAllRows (rows) {
    const selectedRows = rows.length !== 0 ? rows.map(asset => { return asset.id }) : []
    this.setState({ selectedRows })
  }

  handleClearRows () {
    this.setState({ selectedRows: [] })
  }

  render () {
    const {
      t,
      events,
      updateEvent,
      deleteEvent,
      fetchEvents,
      archiveEvent,
      eventsFilter,
      eventsPaginate,
      isEventsLoading,
      fetchIndividualEvent
    } = this.props
    const { selectedRows, viewArchived } = this.state
    const isSelected = selectedRows.length !== 0
    const defaultItemsPerPage = displayOptions[2]
    return (
      <div>
        <ManageEventsNavbar
          viewArchived={viewArchived}
          toggleArchive={this.toggleArchive}
        />
        <Row className='pt-70'>
          <Col xs={12} className='mt-15'>
            <ManageEventsFilter
              viewArchived={viewArchived}
              handleClearRows={this.handleClearRows}
            />
          </Col>
        </Row>
        <Row className='mt-15'>
          <Col xs={3}>
            <h1 className='m-0 p-0'>{viewArchived && 'Archived:'} {t('events')}</h1>
          </Col>
        </Row>
        <Row className='mt-15 data-filter'>
          <Col xs={12} md={9}>
            <ManageEventsActions
              t={t}
              events={events}
              isSelected={isSelected}
              fetchEvents={fetchEvents}
              deleteEvent={deleteEvent}
              viewArchived={viewArchived}
              archiveEvent={archiveEvent}
              eventsFilter={eventsFilter}
              selectedRows={selectedRows}
              handleAllRows={this.handleAllRows}
              restoreEvent={this.props.restoreEvent}
            />
          </Col>
          <Col xs={12} md={3}>
            <div className='display-list-dropdown'>
              <Select
                name='itemPerpage'
                className='react-select'
                classNamePrefix='react-select'
                options={displayOptions}
                placeholder={`${defaultItemsPerPage}`}
                defaultValue={defaultItemsPerPage}
                onChange={this.handleItemPerPageChange}
              />
            </div>
            <div className='display-list'>
              {tableDisplayLabel(eventsPaginate)}
            </div>
          </Col>
        </Row>
        <Row className='mt-15'>
          <Col xs={12}>
            <ManageEventsTable
              t={t}
              events={events}
              isSelected={isSelected}
              fetchEvents={fetchEvents}
              deleteEvent={deleteEvent}
              updateEvent={updateEvent}
              handleRow={this.handleRow}
              viewArchived={viewArchived}
              eventsFilter={eventsFilter}
              selectedRows={selectedRows}
              eventsPaginate={eventsPaginate}
              isEventsLoading={isEventsLoading}
              toggleArchive={this.toggleArchive}
              handleClearRows={this.handleClearRows}
              fetchIndividualEvent={fetchIndividualEvent}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    events: adminManagement.events,
    eventsFilter: adminManagement.eventsFilter,
    eventsPaginate: adminManagement.eventsPaginate,
    isEventsLoading: adminManagement.isEventsLoading
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchClubs,
    fetchEvents,
    deleteEvent,
    updateEvent,
    fetchVenues,
    archiveEvent,
    restoreEvent,
    fetchEventTypes,
    fetchFlagRegions,
    fetchIndividualEvent
  }),
  translate('events')
)(ManageEvents)
