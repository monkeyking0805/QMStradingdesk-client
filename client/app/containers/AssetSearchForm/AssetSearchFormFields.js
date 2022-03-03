import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Row, Col, FormGroup, Form } from 'reactstrap'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import _ from 'lodash'
import MultipleSelect from '../../components/MutipleSelect'
import DateRangePickerWrapper from '../../components/DateRangePickerWrapper'
import { dropdownOptionsTransform, distinctOptions } from '../../helpers/utils'
import { withToastManager } from 'react-toast-notifications'
import { notification } from '../../helpers/notificationHelper'
import {
  fetchSportCodes,
  fetchBrandCategories,
  fetchRegions,
  fetchClubs,
  fetchVenues,
  fetchAssetTypes
} from '../../actions/assets_actions'

import {
  fetchSearchAsset
} from '../../actions/search_asset_actions'

class AssetSearchFormFields extends Component {
  constructor (props) {
    super(props)
    const { filters } = props.searchAsset
    this.state = {
      initializeComplete: false,
      formFocused: false,
      dropdownOpened: false,
      sportCodesOption: [],
      brandCategoriesOption: [],
      regionsOption: [],
      clubsOption: [],
      venuesOption: [],
      assetTypesOption: [],
      filters,
      startDate: filters.startDate,
      endDate: filters.endDate
    }
    this._handleDateRangeApply = this._handleDateRangeApply.bind(this)
    this._renderMultipleDropdown = this._renderMultipleDropdown.bind(this)
    this._handleFormSearch = this._handleFormSearch.bind(this)
    this._handleFocused = this._handleFocused.bind(this)
    this._handleRemoveFocus = this._handleRemoveFocus.bind(this)
  }

  async componentDidMount () {
    const { searchAsset, toastManager } = this.props
    await this.props.fetchBrandCategories()
    await this.props.fetchSportCodes()
    await this.props.fetchRegions()
    await this.props.fetchClubs()
    await this.props.fetchVenues()
    await this.props.fetchAssetTypes()
    const result = await this.props.fetchSearchAsset(searchAsset.filters)

    // Intiailize Selected Brands Categories if it was set.
    this.props.initialize({
      brandCategory: searchAsset.filters.brandCategories,
      state: searchAsset.filters.regions,
      sportCodes: searchAsset.filters.sportCodes,
      club: searchAsset.filters.clubs,
      assetType: searchAsset.filters.assetTypes,
      venue: searchAsset.filters.venues
    })

    if (result && result.error) {
      notification.warning(toastManager, result.error.message)
    }

    this.setState({ initializeComplete: true })
  }

  static getDerivedStateFromProps (nextProps) {
    const { searchAsset: { filters }, sportCodes, brandCategories, regions, clubs, venues, assetTypes } = nextProps
    return {
      sportCodesOption: dropdownOptionsTransform(sportCodes),
      brandCategoriesOption: dropdownOptionsTransform(brandCategories),
      regionsOption: dropdownOptionsTransform(regions),
      clubsOption: dropdownOptionsTransform(clubs),
      venuesOption: dropdownOptionsTransform(venues),
      assetTypesOption: dropdownOptionsTransform(assetTypes),
      filters
    }
  }

  async _handleDateRangeApply () {
    if (!this.state.dropdownOpened) {
      await this.setState({ formFocused: false })
    }
    await this._handleFormSearch()
  }

  async _handleFocused (focused) {
    await this.setState({ formFocused: true })
  }

  async _handleRemoveFocus () {
    await this.setState({ formFocused: false })
  }

  _renderMultipleDropdown (dropdownOptions) {
    if (this.state.initializeComplete && !this.props.focused && dropdownOptions.input.value.length === 0) {
      this._handleFormSearch()
    }

    let optionsValues = dropdownOptions.optionList
    if (Array.isArray(dropdownOptions.input.value)) {
      const unselectedValue = distinctOptions(dropdownOptions.input.value, dropdownOptions.optionList)
      optionsValues = dropdownOptions.input.value.concat(unselectedValue)
    }
    return (
      <MultipleSelect
        selectedOption={dropdownOptions.input.value}
        className={`${dropdownOptions.input.value.length === 0 ? '' : 'is-selected'}`}
        classNamePrefix='react-select'
        value={dropdownOptions.input.value}
        handleChange={dropdownOptions.input.onChange}
        onMenuOpen={() => {
          this.setState({ dropdownOpened: true })
          this.setState({ formFocused: true })
        }}
        onBlur={() => this._handleFormSearch()}
        optionList={optionsValues}
        placeholder={dropdownOptions.placeholder}
        onMenuClose={() => {
          this.setState({ dropdownOpened: false })
          this._handleRemoveFocus()
          this._handleFormSearch()
        }}
      />
    )
  }

  async _handleFormSearch () {
    const { searchFormValue, searchAsset } = this.props
    // Check if form filters have changed if not so don't need to fetch data
    if (!_.isEqual({
      ...searchAsset.filters,
      ...searchFormValue,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }, searchAsset.filters)) {
      this.props.fetchSearchAsset({
        ...searchAsset.filters,
        ...searchFormValue,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      })
    }
  }

  render () {
    const { t } = this.props
    const {
      sportCodesOption,
      brandCategoriesOption,
      regionsOption,
      clubsOption,
      venuesOption,
      assetTypesOption,
      formFocused,
      startDate,
      endDate
    } = this.state

    return (
      <>
        {formFocused && (
          <div className='backdrop' />
        )}
        <Form className='w-100 form-filters'>
          <Col md={12} style={{ zIndex: formFocused ? '1050' : '1' }}>
            <Row>
              <Col md={6} xs={12}>
                <Row>
                  <Col md={4} xs={12} className='pr-1'>
                    <FormGroup>
                      <Field
                        name='brandCategory'
                        component={this._renderMultipleDropdown}
                        placeholder={t('brandCategory')}
                        optionList={brandCategoriesOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} xs={12} className='pl-1 pr-1'>
                    <FormGroup>
                      <Field
                        name='sportCodes'
                        component={this._renderMultipleDropdown}
                        placeholder={t('sportCodes')}
                        optionList={sportCodesOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} xs={12} className='pl-1 pr-1'>
                    <FormGroup className={`${(startDate || endDate) ? 'date-picker-selected-date' : ''}`}>
                      <DateRangePickerWrapper
                        startDate={startDate}
                        endDate={endDate}
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                        checkFocused={this._handleFocused}
                        onApply={this._handleDateRangeApply}
                        onClose={this._handleDateRangeApply}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col md={6} xs={12}>
                <Row>
                  <Col md={3} xs={12} className='pl-1 pr-1'>
                    <FormGroup>
                      <Field
                        name='state'
                        component={this._renderMultipleDropdown}
                        placeholder={t('state')}
                        optionList={regionsOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3} xs={12} className='pl-1 pr-1'>
                    <FormGroup>
                      <Field
                        name='club'
                        component={this._renderMultipleDropdown}
                        placeholder={t('club')}
                        optionList={clubsOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3} xs={12} className='pl-1 pr-1'>
                    <FormGroup>
                      <Field
                        name='venue'
                        component={this._renderMultipleDropdown}
                        placeholder={t('venue')}
                        optionList={venuesOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3} xs={12} className='pl-1'>
                    <FormGroup>
                      <Field
                        name='assetType'
                        component={this._renderMultipleDropdown}
                        placeholder={t('assetType')}
                        optionList={assetTypesOption}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Form>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { searchAsset, assets } = state
  const selector = formValueSelector('assetSearchForm')
  return {
    searchFormValue: {
      brandCategories: selector(state, 'brandCategory'),
      regions: selector(state, 'state'),
      sportCodes: selector(state, 'sportCodes'),
      clubs: selector(state, 'club'),
      assetTypes: selector(state, 'assetType'),
      venues: selector(state, 'venue')
    },
    isBrandCategoriesLoading: assets.isBrandCategoriesLoading,
    isRegionsLoading: assets.isRegionsLoading,
    isClubsLoading: assets.isClubsLoading,
    isVenuesLoading: assets.isVenuesLoading,
    isAssetTypesLoading: assets.isAssetTypesLoading,
    sportCodes: assets.sportCodes,
    brandCategories: assets.brandCategories,
    regions: assets.regions,
    clubs: assets.clubs,
    venues: assets.venues,
    assetTypes: assets.assetTypes,
    searchAsset
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchBrandCategories,
    fetchSportCodes,
    fetchRegions,
    fetchClubs,
    fetchVenues,
    fetchAssetTypes,
    fetchSearchAsset
  }),
  reduxForm({
    form: 'assetSearchForm',
    enableReinitialize: true
  }),
  translate('assetSearchForm')
)(withToastManager(AssetSearchFormFields))
