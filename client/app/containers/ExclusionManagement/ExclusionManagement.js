import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { translate } from 'react-i18next'
import Select from 'react-select'
import { withToastManager } from 'react-toast-notifications'
import ExclusionManagementFilter from './ExclusionManagementFilter'
import ExclusionManagementTable from './ExclusionManagementTable'
import ExclusionManagementActions from './ExclusionManagementActions'
import { tableDisplayLabel } from '../../helpers/utils'
import {
  fetchClubs,
  fetchVenues,
  fetchBrands,
  fetchAssetTypes,
  fetchEventTypes,
  fetchSportCodes,
  fetchBrandCategories
} from '../../actions/assets_actions'
import {
  updateExclusion,
  deleteExclusion,
  fetchFilterExclusions,
  fetchIndividualExclusions
} from '../../actions/exclusions_actions'
import ExclusionManagementNavbar from './ExclusionManagementNavbar'
import { displayOptions } from '../../constants/defaultValues'
import '@babel/polyfill'

class ExclusionManagement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      exclusionFormModal: false,
      selectedRows: []
    }
    this.handleRow = this.handleRow.bind(this)
    this.handleAllRows = this.handleAllRows.bind(this)
    this.handleClearRows = this.handleClearRows.bind(this)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchBrandCategories()
    await this.props.fetchSportCodes()
    await this.props.fetchClubs()
    await this.props.fetchVenues()
    await this.props.fetchAssetTypes()
    await this.props.fetchEventTypes()
    await this.props.fetchBrands()
  }

  async handleItemPerPageChange (itemPerPageValue) {
    this.handleClearRows()
    const { filteredParameters } = this.props
    await this.props.fetchFilterExclusions(
      { items_per_page: itemPerPageValue.value },
      { ...filteredParameters, sportCodes: filteredParameters.codes }
    )
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

  render () {
    const { selectedRows } = this.state
    const {
      t,
      isLoading,
      deleteExclusion,
      updateExclusion,
      archiveExclusion,
      filteredPaginate,
      filteredParameters,
      filteredExclusionList,
      fetchFilterExclusions,
      fetchIndividualExclusions
    } = this.props
    const isSelected = selectedRows.length !== 0
    const defaultItemsPerPage = displayOptions[2]
    return (
      <>
        <ExclusionManagementNavbar />
        <Row>
          <Col xs={12} className='pt-70'>
            <ExclusionManagementFilter
              handleClearRows={this.handleClearRows}
            />
          </Col>
        </Row>
        <Row className='mt-15'>
          <Col xs={3}>
            <h1 className='m-0 p-0'>{t('exclusions')}</h1>
          </Col>
        </Row>
        <Row className='mt-15 data-filter'>
          <Col xs={9}>
            <ExclusionManagementActions
              t={t}
              isSelected={isSelected}
              selectedRows={selectedRows}
              deleteExclusion={deleteExclusion}
              handleAllRows={this.handleAllRows}
              archiveExclusion={archiveExclusion}
              filteredParameters={filteredParameters}
              filteredExclusionList={filteredExclusionList}
              fetchFilterExclusions={fetchFilterExclusions}
            />
          </Col>
          <Col xs={3}>
            <div className='display-list-dropdown'>
              <Select
                name='itemPerpage'
                className='react-select'
                classNamePrefix='react-select'
                options={displayOptions}
                defaultValue={defaultItemsPerPage}
                placeholder={`${defaultItemsPerPage}`}
                onChange={this.handleItemPerPageChange}
              />
            </div>
            <div className='display-list'>
              {tableDisplayLabel(filteredPaginate)}
            </div>
          </Col>
        </Row>
        <Row className='mt-15'>
          <Col xs={12}>
            <ExclusionManagementTable
              t={t}
              isLoading={isLoading}
              selectedRows={selectedRows}
              handleRow={this.handleRow}
              deleteExclusion={deleteExclusion}
              updateExclusion={updateExclusion}
              filteredPaginate={filteredPaginate}
              handleClearRows={this.handleClearRows}
              filteredParameters={filteredParameters}
              fetchFilterExclusions={fetchFilterExclusions}
              filteredExclusionList={filteredExclusionList}
              fetchIndividualExclusions={fetchIndividualExclusions}
            />
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ exclusions }) => {
  return {
    isLoading: exclusions.isLoading,
    filteredPaginate: exclusions.filteredPaginate,
    filteredParameters: exclusions.filteredParameters,
    filteredExclusionList: exclusions.filteredExclusionList
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchClubs,
    fetchVenues,
    fetchBrands,
    fetchSportCodes,
    fetchAssetTypes,
    fetchEventTypes,
    deleteExclusion,
    updateExclusion,
    fetchBrandCategories,
    fetchFilterExclusions,
    fetchIndividualExclusions
  }),
  translate('exclusions')
)(withToastManager(ExclusionManagement))
