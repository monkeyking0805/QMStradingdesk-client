import React, { Component } from 'react'
import { compose } from 'redux'
import Select from 'react-select'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Col, Input, InputGroup } from 'reactstrap'
import { tableDisplayLabel } from '../../helpers/utils'
import { SEARCH_ICON } from '../../constants/svgConstant'
import { displayOptions } from '../../constants/defaultValues'
import { fetchAssetUnits } from '../../actions/admin_management_actions'
import '@babel/polyfill'

class AssetUnitFilter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      renderSelect: 0,
      assetUnitFilters: {
        name: '',
        order_by: 'id',
        items_per_page: 50
      }
    }
    this.handleFilterOrderChange = this.handleFilterOrderChange.bind(this)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
    this._handleSearchBoxChange = this._handleSearchBoxChange.bind(this)
  }

  componentDidUpdate (oldProps) {
    const newProps = this.props
    if (newProps.viewArchived !== oldProps.viewArchived) {
      const newRenderSelect = ++this.state.renderSelect
      this.setState({
        renderSelect: newRenderSelect,
        assetUnitFilters: {
          name: '',
          order_by: 'id',
          items_per_page: 50
        }
      })
    }
  }

  async handleFilterOrderChange (orderValue) {
    this.props.handleClearRows()
    const { assetUnitFilters } = this.state
    const { viewArchived } = this.props
    await this.setState({
      assetUnitFilters: {
        ...assetUnitFilters,
        order_by: orderValue.value,
        archive: viewArchived ? 'TRUE' : 'FALSE'
      }
    })
    await this.props.fetchAssetUnits(this.state.assetUnitFilters)
  }

  async handleItemPerPageChange (itemPerPageValue) {
    const { assetUnitFilters } = this.state
    const { viewArchived } = this.props
    this.props.handleClearRows()
    await this.setState({
      assetUnitFilters: {
        ...assetUnitFilters,
        items_per_page: itemPerPageValue.value,
        archive: viewArchived ? 'TRUE' : 'FALSE'
      }
    })
    await this.props.fetchAssetUnits(this.state.assetUnitFilters)
  }

  async _handleSearchBoxChange (e) {
    e.preventDefault()
    const { viewArchived } = this.props
    const name = e.target.value
    await this.setState({
      assetUnitFilters: { ...this.state.assetUnitFilters, name }
    })
    await this.props.fetchAssetUnits({
      ...this.state.assetUnitFilters,
      archive: viewArchived ? 'TRUE' : 'FALSE'
    })
  }

  render () {
    const { t, assetUnitsPaginate } = this.props
    const { assetUnitFilters, renderSelect } = this.state
    const defaultItemsPerPage = displayOptions[2]
    const displayFilterOrder = [
      { value: 'id', label: t('id') },
      { value: 'name', label: t('name') },
      { value: 'price_fta', label: t('price_fta') },
      { value: 'price_ppv', label: t('price_ppv') }
    ]

    return (
      <>
        <Col xs={12} md={3} className='pr-0'>
          <Select
            name='orderBy'
            className='react-select'
            classNamePrefix='react-select'
            placeholder={`Order By: ${t(assetUnitFilters.order_by)}`}
            onChange={this.handleFilterOrderChange}
            options={displayFilterOrder}
            value=''
            key={`orderBy ${renderSelect}`}
          />
        </Col>
        <Col xs={12} md={3}>
          <InputGroup className='input-box-search'>
            <Input
              placeholder={t('searchByAssetUnitName')}
              onChange={e => this._handleSearchBoxChange(e)}
              value={assetUnitFilters.name}
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
        </Col>
        <Col xs={12} md={{ size: 2, offset: 1 }}>
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
            {tableDisplayLabel(assetUnitsPaginate)}
          </div>
        </Col>
      </>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    assetUnitsPaginate: adminManagement.assetUnitsPaginate,
    assetUnitsFilter: adminManagement.assetUnitsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchAssetUnits
  }),
  translate('assetUnits')
)(AssetUnitFilter)
