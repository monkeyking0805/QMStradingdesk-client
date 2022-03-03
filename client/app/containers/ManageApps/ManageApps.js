import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { translate } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import ManageAppsTable from './ManageAppsTable'
import Select from 'react-select'
import { fetchApps } from '../../actions/admin_management/manage_apps'
import { tableDisplayLabel } from '../../helpers/utils'
import ManageAppsNavbar from './ManageAppsNavbar'
import { displayOptions } from '../../constants/defaultValues'

import '@babel/polyfill'

class ManageApps extends Component {
  constructor (props) {
    super(props)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  async handleItemPerPageChange (itemPerPageValue) {
    await this.props.fetchApps({
      ...this.props.appsFilter,
      items_per_page: itemPerPageValue.value
    })
  }

  render () {
    const { t, appsPaginate } = this.props
    return (
      <div>
        <ManageAppsNavbar />
        <Row>
          <Col xs={3} className='pt-70'>
            <h1 className='m-0 p-0'>{t('apps')}</h1>
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
              {tableDisplayLabel(appsPaginate)}
            </div>
          </Col>
        </Row>

        <Row className='mt-30'>
          <Col xs={12}>
            <ManageAppsTable />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    isAppsLoading: adminManagement.isAppsLoading,
    apps: adminManagement.apps,
    appsPaginate: adminManagement.appsPaginate,
    appsFilter: adminManagement.appsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchApps
  }),
  translate('admin')
)(ManageApps)
