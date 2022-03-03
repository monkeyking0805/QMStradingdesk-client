import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { translate } from 'react-i18next'
import AssetUnitTable from './AssetUnitTable'
import AssetUnitFilter from './AssetUnitFilter'
import AssetUnitNavbar from './AssetUnitNavbar'
import AssetUnitActions from './AssetUnitActions'
import { withToastManager } from 'react-toast-notifications'
import {
  fetchAssetUnits,
  deleteAssetUnit,
  updateAssetUnit,
  archiveAssetUnit,
  restoreAssetUnit,
  fetchIndividualAssetUnits
} from '../../actions/admin_management_actions'
import '@babel/polyfill'

class AssetUnit extends Component {
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
      await this.props.fetchAssetUnits({
        page: 1,
        order_by: 'id',
        items_per_page: 50,
        archive: this.state.viewArchived ? 'TRUE' : 'FALSE'
      })
    })
  }

  render () {
    const { selectedRows, viewArchived } = this.state
    const {
      t,
      assetUnits,
      fetchAssetUnits,
      deleteAssetUnit,
      updateAssetUnit,
      archiveAssetUnit,
      restoreAssetUnit,
      assetUnitsFilter,
      assetUnitsPaginate,
      isAssetUnitsLoading,
      fetchIndividualAssetUnits
    } = this.props
    const isSelected = selectedRows.length !== 0

    return (
      <div>
        <AssetUnitNavbar
          viewArchived={viewArchived}
          toggleArchive={this.toggleArchive}
        />
        <Row>
          <Col xs={3} className='pt-50'>
            <h1 className='m-0 p-0'>{viewArchived && 'Archived:'} {t('assetUnits')}</h1>
          </Col>
        </Row>
        <Row className='mb-3 data-filter' style={{ marginTop: 20 }}>
          <Col xs={12} md={3} className='pr-0'>
            <AssetUnitActions
              t={t}
              isSelected={isSelected}
              assetUnits={assetUnits}
              selectedRows={selectedRows}
              viewArchived={viewArchived}
              fetchAssetUnits={fetchAssetUnits}
              deleteAssetUnit={deleteAssetUnit}
              handleAllRows={this.handleAllRows}
              toggleArchive={this.toggleArchive}
              assetUnitsFilter={assetUnitsFilter}
              archiveAssetUnit={archiveAssetUnit}
              restoreAssetUnit={restoreAssetUnit}
              handleClearRows={this.handleClearRows}
            />
          </Col>
          <AssetUnitFilter
            viewArchived={viewArchived}
            handleClearRows={this.handleClearRows}
          />
        </Row>
        <Row className='mt-10'>
          <Col xs={12}>
            <AssetUnitTable
              t={t}
              assetUnits={assetUnits}
              handleRow={this.handleRow}
              viewArchived={viewArchived}
              selectedRows={selectedRows}
              fetchAssetUnits={fetchAssetUnits}
              deleteAssetUnit={deleteAssetUnit}
              updateAssetUnit={updateAssetUnit}
              toggleArchive={this.toggleArchive}
              assetUnitsFilter={assetUnitsFilter}
              handleClearRows={this.handleClearRows}
              assetUnitsPaginate={assetUnitsPaginate}
              isAssetUnitsLoading={isAssetUnitsLoading}
              fetchIndividualAssetUnits={fetchIndividualAssetUnits}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    assetUnits: adminManagement.assetUnits,
    archiveAssetUnit: adminManagement.archiveAssetUnit,
    assetUnitsFilter: adminManagement.assetUnitsFilter,
    assetUnitsPaginate: adminManagement.assetUnitsPaginate,
    isAssetUnitsLoading: adminManagement.isAssetUnitsLoading
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchAssetUnits,
    deleteAssetUnit,
    updateAssetUnit,
    archiveAssetUnit,
    restoreAssetUnit,
    fetchIndividualAssetUnits
  }),
  translate('assetUnits')
)(withToastManager(AssetUnit))
