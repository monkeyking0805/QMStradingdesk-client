import React, { Component } from 'react'
import { compose } from 'redux'
import Select from 'react-select'
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withToastManager } from 'react-toast-notifications'
import ManageAssetTable from './ManageAssetTable'
import ManageAssetFilter from './ManageAssetFilter'
import ManageAssetNavbar from './ManageAssetNavbar'
import ManageAssetActions from './ManageAssetActions'
import {
  fetchEvents,
  fetchAssetTypes,
  fetchAssetsUnitList,
  fetchSportCodes
} from '../../actions/assets_actions'
import { tableDisplayLabel } from '../../helpers/utils'
import {
  saveAsset,
  fetchAssets,
  deleteAsset,
  restoreAsset,
  updateAsset,
  archiveAsset,
  fetchIndividualAsset
} from '../../actions/admin_management/manage_assets'
import { displayOptions } from '../../constants/defaultValues'
import '@babel/polyfill'

class ManageAsset extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchQuery: '',
      selectedRows: [],
      assetModal: false,
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
      await this.props.fetchEvents(),
      await this.props.fetchAssetTypes(),
      await this.props.fetchAssetsUnitList(),
      await this.props.fetchSportCodes()
    ])
  }

  // Handling when item per page change
  async handleItemPerPageChange (itemPerPageValue) {
    this.handleClearRows()
    await this.props.fetchAssets({
      ...this.props.assetsFilter,
      items_per_page: itemPerPageValue.value
    })
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

  handleAllRows (rows) {
    const selectedRows = rows.length !== 0 ? rows.map(asset => { return asset.id }) : []
    this.setState({ selectedRows })
  }

  handleClearRows () {
    this.setState({ selectedRows: [] })
  }

  toggleArchive () {
    const { viewArchived } = this.state
    this.setState({ viewArchived: !viewArchived }, async () => {
      await this.props.fetchAssets({
        page: 1,
        order_by: 'id',
        items_per_page: 50,
        archive: this.state.viewArchived ? 'TRUE' : 'FALSE'
      })
    })
  }

  render () {
    const { selectedRows, viewArchived } = this.state
    const { t, assetsPaginate } = this.props
    const isSelected = selectedRows.length !== 0
    const defaultItemsPerPage = displayOptions[2]

    return (
      <div>
        <ManageAssetNavbar
          viewArchived={viewArchived}
          toggleArchive={this.toggleArchive}
        />
        <Row>
          <Col xs={12} className='pt-70'>
            <ManageAssetFilter
              viewArchived={viewArchived}
              handleClearRows={this.handleClearRows}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <h1 className='m-0 p-0'>{viewArchived && 'Archived:'} {t('assets')}</h1>
          </Col>
        </Row>
        <Row className='mt-15 mb-0 data-filter'>
          <Col xs={12} md={9}>
            <ManageAssetActions
              t={this.props.t}
              isSelected={isSelected}
              assets={this.props.assets}
              selectedRows={selectedRows}
              viewArchived={viewArchived}
              handleAllRows={this.handleAllRows}
              fetchAssets={this.props.fetchAssets}
              deleteAsset={this.props.deleteAsset}
              restoreAsset={this.props.restoreAsset}
              archiveAsset={this.props.archiveAsset}
              assetsFilter={this.props.assetsFilter}
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
              {tableDisplayLabel(assetsPaginate)}
            </div>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col xs={12}>
            <ManageAssetTable
              t={this.props.t}
              assets={this.props.assets}
              handleRow={this.handleRow}
              viewArchived={viewArchived}
              selectedRows={selectedRows}
              toggleArchive={this.toggleArchive}
              fetchAssets={this.props.fetchAssets}
              deleteAsset={this.props.deleteAsset}
              updateAsset={this.props.updateAsset}
              assetsFilter={this.props.assetsFilter}
              handleClearRows={this.handleClearRows}
              assetsPaginate={this.props.assetsPaginate}
              isAssetsLoading={this.props.isAssetsLoading}
              fetchIndividualAsset={this.props.fetchIndividualAsset}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    assets: adminManagement.assets,
    assetsFilter: adminManagement.assetsFilter,
    assetsPaginate: adminManagement.assetsPaginate,
    isAssetsLoading: adminManagement.isAssetsLoading
  }
}

export default compose(
  connect(mapStateToProps, {
    saveAsset,
    fetchEvents,
    updateAsset,
    fetchAssets,
    deleteAsset,
    archiveAsset,
    restoreAsset,
    fetchSportCodes,
    fetchAssetTypes,
    fetchAssetsUnitList,
    fetchIndividualAsset
  }),
  translate('assets')
)(withToastManager(ManageAsset))
