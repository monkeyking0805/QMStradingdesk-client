import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { translate } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import ManageAssetTypesTable from './ManageAssetTypesTable'
import Select from 'react-select'
import { fetchAssetTypes, saveAssetType } from '../../actions/admin_management/manage_asset_types'
import { tableDisplayLabel } from '../../helpers/utils'
import ManageAssetTypesNavbar from './ManageAssetTypesNavbar'
import { displayOptions } from '../../constants/defaultValues'
import '@babel/polyfill'

class ManageAssetTypes extends Component {
  constructor (props) {
    super(props)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  async handleItemPerPageChange (itemPerPageValue) {
    await this.props.fetchAssetTypes({
      ...this.props.assetTypesFilter,
      items_per_page: itemPerPageValue.value
    })
  }

  render () {
    const { t, assetTypesPaginate } = this.props
    return (
      <div>
        <ManageAssetTypesNavbar />
        <Row>
          <Col xs={3} className='pt-70'>
            <h1 className='m-0 p-0'>{t('assetType')}</h1>
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
              {tableDisplayLabel(assetTypesPaginate)}
            </div>
          </Col>
        </Row>

        <Row className='mt-30'>
          <Col xs={12}>
            <ManageAssetTypesTable />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    isAssetTypesLoading: adminManagement.isAssetTypesLoading,
    assetTypes: adminManagement.assetTypes,
    assetTypesPaginate: adminManagement.assetTypesPaginate,
    assetTypesFilter: adminManagement.assetTypesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveAssetType,
    fetchAssetTypes
  }),
  translate('admin')
)(ManageAssetTypes)
