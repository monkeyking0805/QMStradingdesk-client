import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { translate } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import ManageVenuesTable from './ManageVenuesTable'
import Select from 'react-select'
import { fetchVenues, saveVenue } from '../../actions/admin_management/manage_venues'
import { tableDisplayLabel } from '../../helpers/utils'
import ManageVenuesNavbar from './ManageVenuesNavbar'
import { displayOptions } from '../../constants/defaultValues'

import '@babel/polyfill'

class ManageVenues extends Component {
  constructor (props) {
    super(props)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  async handleItemPerPageChange (itemPerPageValue) {
    await this.props.fetchVenues({
      ...this.props.venuesFilter,
      items_per_page: itemPerPageValue.value
    })
  }

  render () {
    const { t, venuesPaginate } = this.props
    return (
      <div>
        <ManageVenuesNavbar />
        <Row>
          <Col xs={3} className='pt-70'>
            <h1 className='m-0 p-0'>{t('venues')}</h1>
          </Col>
        </Row>

        <Row className='mt-15 data-filter'>
          <Col xs={{ size: 3, offset: 9 }}>
            <div className='display-list-dropdown'>
              <Select
                className='react-select'
                classNamePrefix='react-select'
                placeholder='10'
                name='itemPerpage'
                options={displayOptions}
                onChange={this.handleItemPerPageChange}
                defaultValue={displayOptions[2]}
              />
            </div>
            <div className='display-list'>
              {tableDisplayLabel(venuesPaginate)}
            </div>
          </Col>
        </Row>

        <Row className='mt-30'>
          <Col xs={12}>
            <ManageVenuesTable />
          </Col>
        </Row>
      </div>
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
    saveVenue,
    fetchVenues
  }),
  translate('admin')
)(ManageVenues)
