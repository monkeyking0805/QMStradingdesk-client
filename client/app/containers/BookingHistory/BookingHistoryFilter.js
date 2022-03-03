import React, { Component } from 'react'
import { compose } from 'redux'
import Select from 'react-select'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Col, Input, InputGroup } from 'reactstrap'
import { SEARCH_ICON } from '../../constants/svgConstant'
import { fetchPackages } from '../../actions/packages_actions'
import { tableDisplayLabel } from '../../helpers/utils'
import { displayOptions } from '../../constants/defaultValues'
import '@babel/polyfill'

class BookingHistoryFilter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      renderSelect: 0,
      bookingFilters: {
        search: '',
        archive: 'FALSE',
        order_by: 'bookingdate',
        items_per_page: 50
      }
    }
    this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this)
    this.handleFilterOrderChange = this.handleFilterOrderChange.bind(this)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  componentDidMount () {
    this.setState({
      archive: this.props.viewArchived ? 'TRUE' : 'FALSE'
    })
  }

  componentDidUpdate (oldProps) {
    const newProps = this.props
    const newState = this.state
    if (newProps.viewArchived !== oldProps.viewArchived) {
      const newRenderSelect = ++this.state.renderSelect
      newState.renderSelect = newRenderSelect
      newState.bookingFilters = {
        search: '',
        items_per_page: 50,
        order_by: 'bookingdate',
        archive: newProps.viewArchived ? 'TRUE' : 'FALSE'
      }
      this.setState(newState)
    }
  }

  async handleFilterOrderChange (orderValue) {
    this.props.handleClearRows()
    const { bookingFilters } = this.state
    await this.setState({
      bookingFilters: {
        ...bookingFilters,
        order_by: orderValue.value,
        archive: this.props.viewArchived ? 'TRUE' : 'FALSE'
      }
    })
    await this.props.fetchPackages(this.state.bookingFilters)
  }

  async handleSearchBoxChange (e) {
    this.props.handleClearRows()
    const { bookingFilters } = this.state
    e.preventDefault()
    await this.setState({
      bookingFilters: {
        ...bookingFilters,
        search: e.target.value,
        archive: this.props.viewArchived ? 'TRUE' : 'FALSE'
      }
    })
    if (this.state.bookingFilters.search.length > 2) {
      await this.props.fetchPackages(this.state.bookingFilters)
    } else if (this.state.bookingFilters.search.length === 0) {
      await this.props.fetchPackages(this.state.bookingFilters)
    }
  }

  async handleItemPerPageChange (itemPerPageValue) {
    this.props.handleClearRows()
    const { bookingFilters } = this.state
    await this.setState({
      bookingFilters: {
        ...bookingFilters,
        archive: this.props.viewArchived ? 'TRUE' : 'FALSE',
        items_per_page: itemPerPageValue.value
      }
    })
    await this.props.fetchPackages(this.state.bookingFilters)
  }

  render () {
    const { bookingFilters, renderSelect } = this.state
    const { packagePaginate, t } = this.props
    const displayFilterOrder = [
      { value: 'id', label: t('id') },
      { value: 'client', label: t('client') },
      { value: 'user', label: t('salesRep') },
      { value: 'status', label: t('status') },
      { value: 'name', label: t('nameOfBooking') },
      { value: 'bookingdate', label: t('bookingDateRange') }
    ]

    return (
      <>
        <Col xs={12} md={3} className='pr-0'>
          <Select
            value=''
            name='orderBy'
            className='react-select'
            classNamePrefix='react-select'
            options={displayFilterOrder}
            key={`orderBy ${renderSelect}`}
            onChange={this.handleFilterOrderChange}
            placeholder={`Order By: ${t(bookingFilters.order_by)}`}
          />
        </Col>
        <Col xs={12} md={3}>
          <InputGroup className='input-box-search'>
            <Input
              placeholder='Search'
              value={this.state.bookingFilters.search}
              onChange={(e) => this.handleSearchBoxChange(e)}
            />
            <div className='input-group-append'>
              <span className='input-group-text'>
                <svg
                  width='15'
                  height='15'
                  focusable='false'
                  aria-hidden='true'
                  viewBox='0 0 24 24'
                >
                  <path d={SEARCH_ICON} />
                </svg>
              </span>
            </div>
          </InputGroup>
        </Col>
        <Col xs={12} md={{ size: 2, offset: 1 }}>
          <div className='display-list-dropdown'>
            <Select
              name='itemPerpage'
              className='react-select'
              classNamePrefix='react-select'
              options={displayOptions}
              defaultValue={this.state.bookingFilters.items_per_page}
              onChange={this.handleItemPerPageChange}
              placeholder={this.state.bookingFilters.items_per_page}
            />
          </div>
          <div className='display-list'>
            {tableDisplayLabel(packagePaginate)}
          </div>
        </Col>
      </>
    )
  }
}

const mapStateToProps = ({ packages }) => {
  return {
    packageListFilter: packages.packageListFilter,
    packagePaginate: packages.packagePaginate
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchPackages
  }),
  translate('bookingHistory')
)(BookingHistoryFilter)
