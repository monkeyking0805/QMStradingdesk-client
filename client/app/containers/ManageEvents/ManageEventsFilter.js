import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import MultipleSelect from '../../components/MutipleSelect'
import { dropdownOptionsTransform, distinctOptions } from '../../helpers/utils'
import { Col, FormGroup, Row, Input, InputGroup } from 'reactstrap'
import { SEARCH_ICON } from '../../constants/svgConstant'
import {
  fetchEvents
} from '../../actions/admin_management/manage_events'
import DateRangePickerWrapper from '../../components/DateRangePickerWrapper'

import '@babel/polyfill'

class ManageEventFilter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      renderSelect: 0,
      clubsOptions: [],
      venuesOptions: [],
      regionsOptions: [],
      eventTypesOptions: [],
      filtersEvents: {
        clubs: [],
        venues: [],
        codes: [],
        regions: [],
        name: ''
      }
    }
    this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this)
    this.searchEvents = this.searchEvents.bind(this)

    this.handleCodeChange = this.handleCodeChange.bind(this)
    this.handleClubChange = this.handleClubChange.bind(this)
    this.handleVenueChange = this.handleVenueChange.bind(this)
    this.handleRegionChange = this.handleRegionChange.bind(this)
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this)
  }

  static getDerivedStateFromProps (nextProps, nextState) {
    const { clubs, eventTypes, regions, venues } = nextProps
    const { filtersEvents } = nextState
    const unselectedClubs = distinctOptions(filtersEvents.clubs, dropdownOptionsTransform(clubs))
    const unselectedVenues = distinctOptions(filtersEvents.venues, dropdownOptionsTransform(venues))
    const unselectedEventTypes = distinctOptions(filtersEvents.codes, dropdownOptionsTransform(eventTypes))
    const unselectedRegions = distinctOptions(filtersEvents.regions, dropdownOptionsTransform(regions))
    return {
      clubsOptions: filtersEvents.clubs.concat(unselectedClubs),
      venuesOptions: filtersEvents.venues.concat(unselectedVenues),
      regionsOptions: filtersEvents.regions.concat(unselectedRegions),
      eventTypesOptions: filtersEvents.codes.concat(unselectedEventTypes)
    }
  }

  componentDidUpdate (oldProps) {
    const newProps = this.props
    if (newProps.viewArchived !== oldProps.viewArchived) {
      const newRenderSelect = ++this.state.renderSelect
      this.setState({
        renderSelect: newRenderSelect,
        clubsOptions: [],
        venuesOptions: [],
        regionsOptions: [],
        eventTypesOptions: [],
        filtersEvents: {
          clubs: [],
          venues: [],
          codes: [],
          regions: [],
          name: ''
        }
      })
    }
  }

  async handleCodeChange (codes) {
    await this.setState({ filtersEvents: { ...this.state.filtersEvents, codes } })
    await this.searchEvents()
    this.props.handleClearRows()
  }

  async handleVenueChange (venues) {
    await this.setState({ filtersEvents: { ...this.state.filtersEvents, venues } })
    await this.searchEvents()
    this.props.handleClearRows()
  }

  async handleClubChange (clubs) {
    await this.setState({ filtersEvents: { ...this.state.filtersEvents, clubs } })
    await this.searchEvents()
    this.props.handleClearRows()
  }

  async handleRegionChange (regions) {
    await this.setState({ filtersEvents: { ...this.state.filtersEvents, regions } })
    await this.searchEvents()
    this.props.handleClearRows()
  }

  async handleDateRangeChange ({ startDate, endDate }) {
    await this.setState({
      filtersEvents: { ...this.state.filtersEvents, startDate, endDate }
    })
    await this.searchEvents()
    this.props.handleClearRows()
  }

  // Handling search box change
  async handleSearchBoxChange (e) {
    e.preventDefault()
    const name = e.target.value
    await this.setState({ filtersEvents: { ...this.state.filtersEvents, name } })
    if (name.length > 2) {
      await this.props.fetchEvents(this.props.eventsFilter, this.state.filtersEvents)
    } else if (name.length === 0) {
      await this.props.fetchEvents(this.props.eventsFilter, {
        ...this.state.filtersEvents,
        name
      })
    }
    this.props.handleClearRows()
  }

  async searchEvents () {
    const { filtersEvents } = this.state
    await this.props.fetchEvents(this.props.eventsFilter, {
      ...filtersEvents,
      startDate: (filtersEvents.startDate) || '',
      endDate: (filtersEvents.endDate) || ''
    })
    this.props.handleClearRows()
  }

  render () {
    const { t } = this.props
    const {
      renderSelect,
      clubsOptions,
      venuesOptions,
      regionsOptions,
      eventTypesOptions,
      filtersEvents
    } = this.state
    return (
      <>
        <Row>
          <Col md={6}>
            <Row>
              <Col md={8}>
                <FormGroup>
                  <InputGroup className='input-box-search'>
                    <Input
                      placeholder={t('searchByFixture')}
                      onChange={(e) => this.handleSearchBoxChange(e)}
                      value={filtersEvents.name}
                    />
                    <div className='input-group-append'>
                      <span className='input-group-text'>
                        <svg
                          height='15'
                          width='15'
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                          focusable='false'
                        >
                          <path d={SEARCH_ICON} />
                        </svg>
                      </span>
                    </div>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md={4}>
                <DateRangePickerWrapper
                  startDate={filtersEvents.startDate}
                  endDate={filtersEvents.endDate}
                  onDatesChange={this.handleDateRangeChange}
                />
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={3}>
                <FormGroup>
                  <MultipleSelect
                    key={`eventtype ${renderSelect}`}
                    placeholder={t('eventType')}
                    optionList={eventTypesOptions}
                    handleChange={this.handleCodeChange}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <MultipleSelect
                    key={`venue ${renderSelect}`}
                    placeholder={t('venue')}
                    optionList={venuesOptions}
                    handleChange={this.handleVenueChange}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <MultipleSelect
                    key={`club ${renderSelect}`}
                    placeholder={t('club')}
                    optionList={clubsOptions}
                    handleChange={this.handleClubChange}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <MultipleSelect
                    key={`region ${renderSelect}`}
                    placeholder={t('region')}
                    optionList={regionsOptions}
                    handleChange={this.handleRegionChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ assets, flag, adminManagement }) => {
  return {
    clubs: assets.clubs,
    // Event Type same as Code Types
    eventTypes: assets.eventTypes,
    venues: assets.venues,
    regions: flag.flagRegions,
    eventsFilter: adminManagement.eventsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchEvents
  }),
  translate('events')
)(ManageEventFilter)
