import { compose } from 'redux'
import Select from 'react-select'
import { Row, Col, FormGroup, Input, InputGroup } from 'reactstrap'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { withToastManager } from 'react-toast-notifications'
import ManageBrandsTable from './ManageBrandsTable'
import ManageBrandsNavbar from './ManageBrandsNavbar'
import { tableDisplayLabel } from '../../helpers/utils'
import { SEARCH_ICON } from '../../constants/svgConstant'
import { displayOptions } from '../../constants/defaultValues'
import { fetchBrands, saveBrand } from '../../actions/admin_management/manage_brands'
import '@babel/polyfill'

class ManageBrands extends Component {
  constructor (props) {
    super(props)
    this.state = {
      brand: ''
    }
    this._handleSearchBoxChange = this._handleSearchBoxChange.bind(this)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  async handleItemPerPageChange (itemPerPageValue) {
    await this.props.fetchBrands({
      ...this.props.brandsFilter,
      items_per_page: itemPerPageValue.value
    })
  }

  async _handleSearchBoxChange (e) {
    e.preventDefault()
    const brandValue = e.target.value
    this.setState({
      brand: brandValue
    }, async () => {
      if (brandValue.length >= 3) {
        await this.props.fetchBrands({
          ...this.props.brandsFilter,
          brand: brandValue
        })
      }
      if (brandValue.length === 0) {
        await this.props.fetchBrands({
          items_per_page: this.props.brandsFilter.items_per_page
        })
      }
    })
  }

  render () {
    const { brand } = this.state
    const { t, brandsPaginate } = this.props
    return (
      <div>
        <ManageBrandsNavbar />

        <Row>
          <Col xs={3} className='pt-70'>
            <h1 className='m-0 p-0'>{t('brands')}</h1>
          </Col>
        </Row>

        <Row className='mt-15 data-filter'>
          <Col xs={3}>
            <FormGroup>
              <InputGroup className='input-box-search'>
                <Input
                  value={brand}
                  placeholder={t('searchByBrand')}
                  onChange={(e) => this._handleSearchBoxChange(e)}
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
            </FormGroup>
          </Col>
          <Col xs={{ size: 3, offset: 6 }}>
            <div className='display-list-dropdown'>
              <Select
                placeholder='10'
                name='itemPerpage'
                className='react-select'
                classNamePrefix='react-select'
                options={displayOptions}
                onChange={this.handleItemPerPageChange}
                defaultValue={displayOptions[2]}
              />
            </div>
            <div className='display-list'>
              {tableDisplayLabel(brandsPaginate)}
            </div>
          </Col>
        </Row>

        <Row className='mt-30'>
          <Col xs={12}>
            <ManageBrandsTable />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    isBrandsLoading: adminManagement.isBrandsLoading,
    brands: adminManagement.brands,
    brandsPaginate: adminManagement.brandsPaginate,
    brandsFilter: adminManagement.brandsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchBrands,
    saveBrand
  }),
  translate('admin')
)(withToastManager(ManageBrands))
