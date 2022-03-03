import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { translate } from 'react-i18next'
import { Row, Col, FormGroup, Input, InputGroup } from 'reactstrap'
import ManageBrandCategoriesTable from './ManageBrandCategoriesTable'
import Select from 'react-select'
import { fetchBrandCategories, saveBrandCategory } from '../../actions/admin_management/manage_brand_categories'
import { tableDisplayLabel } from '../../helpers/utils'
import { withToastManager } from 'react-toast-notifications'
import ManageBrandCategoriesNavbar from './ManageBrandCategoriesNavbar'
import { displayOptions } from '../../constants/defaultValues'
import { SEARCH_ICON } from '../../constants/svgConstant'
import '@babel/polyfill'

class ManageBrandCategories extends Component {
  constructor (props) {
    super(props)
    this.state = {
      brand: '',
      brandCategoryFormModal: false
    }
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  async handleItemPerPageChange (itemPerPageValue) {
    await this.props.fetchBrandCategories({
      ...this.props.brandCategoriesFilter,
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
        await this.props.fetchBrandCategories({
          ...this.props.brandCategoriesFilter,
          brand: brandValue
        })
      }
      if (brandValue.length === 0) {
        await this.props.fetchBrandCategories({
          items_per_page: this.props.brandCategoriesFilter.items_per_page
        })
      }
    })
  }

  render () {
    const { brand } = this.state
    const { t, brandCategoriesPaginate } = this.props
    return (
      <div>
        <ManageBrandCategoriesNavbar />

        <Row>
          <Col xs={3} className='pt-70'>
            <h1 className='m-0 p-0'>{t('brandCategories')}</h1>
          </Col>
        </Row>

        <Row className='mt-15 data-filter'>
          <Col xs={3}>
            <FormGroup>
              <InputGroup className='input-box-search'>
                <Input
                  value={brand}
                  placeholder={t('searchByBrandCategory')}
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
              {tableDisplayLabel(brandCategoriesPaginate)}
            </div>
          </Col>
        </Row>

        <Row className='mt-30'>
          <Col xs={12}>
            <ManageBrandCategoriesTable />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    isBrandCategoriesLoading: adminManagement.isBrandCategoriesLoading,
    brandCategories: adminManagement.brandCategories,
    brandCategoriesPaginate: adminManagement.brandCategoriesPaginate,
    brandCategoriesFilter: adminManagement.brandCategoriesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveBrandCategory,
    fetchBrandCategories
  }),
  translate('admin')
)(withToastManager(ManageBrandCategories))
