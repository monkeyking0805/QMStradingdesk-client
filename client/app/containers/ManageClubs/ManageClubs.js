import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { translate } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import ManageClubsTable from './ManageClubsTable'
import Select from 'react-select'
import { fetchClubs, saveClub } from '../../actions/admin_management/manage_clubs'
import { tableDisplayLabel } from '../../helpers/utils'
import ManageClubsNavbar from './ManageClubsNavbar'
import { displayOptions } from '../../constants/defaultValues'
import '@babel/polyfill'

class ManageClubs extends Component {
  constructor (props) {
    super(props)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  async handleItemPerPageChange (itemPerPageValue) {
    await this.props.fetchClubs({
      ...this.props.clubsFilter,
      items_per_page: itemPerPageValue.value
    })
  }

  render () {
    const { t, clubsPaginate } = this.props
    return (
      <div>
        <ManageClubsNavbar />

        <Row>
          <Col xs={3} className='pt-70'>
            <h1 className='m-0 p-0'>{t('clubs')}</h1>
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
                defaultValue={displayOptions[2]}
                onChange={this.handleItemPerPageChange}
              />
            </div>
            <div className='display-list'>
              {tableDisplayLabel(clubsPaginate)}
            </div>
          </Col>
        </Row>

        <Row className='mt-30'>
          <Col xs={12}>
            <ManageClubsTable />
          </Col>
        </Row>
      </div>
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
    saveClub,
    fetchClubs
  }),
  translate('admin')
)(ManageClubs)
