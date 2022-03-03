import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import MultipleSelect from '../../components/MutipleSelect'
import { dropdownOptionsTransform, distinctOptions } from '../../helpers/utils'
import { Col, FormGroup, Row } from 'reactstrap'
import {
  fetchFilterExclusions
} from '../../actions/exclusions_actions'
import '@babel/polyfill'

class ExclusionManagementFilter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      brandCategoriesOptions: [],
      sportCodesOptions: [],
      eventTypeOptions: [],
      clubsOptions: [],
      venuesOptions: [],
      assetTypesOptions: [],
      eventTypesOptions: [],
      filtersExclusions: {
        brandCategories: [],
        sportCodes: [],
        codeTypes: [],
        clubs: [],
        venues: [],
        assetTypes: []
      }
    }
    this.handleBrandCategoryChange = this.handleBrandCategoryChange.bind(this)
    this.handleEventTypeChange = this.handleEventTypeChange.bind(this)
    this.handleClubChange = this.handleClubChange.bind(this)
    this.handleVenueChange = this.handleVenueChange.bind(this)
    this.handleAssetTypeChange = this.handleAssetTypeChange.bind(this)
    this.handleSportCodeChange = this.handleSportCodeChange.bind(this)
    this.searchExclusion = this.searchExclusion.bind(this)
  }

  static getDerivedStateFromProps (nextProps, nextState) {
    const { sportCodes, brandCategories, clubs, venues, assetTypes, eventTypes } = nextProps
    const { filtersExclusions } = nextState
    const unselectedBrandCategories = distinctOptions(filtersExclusions.brandCategories, dropdownOptionsTransform(brandCategories))
    const unselectedSportCodes = distinctOptions(filtersExclusions.sportCodes, dropdownOptionsTransform(sportCodes))
    const unselectedEventTypes = distinctOptions(filtersExclusions.codeTypes, dropdownOptionsTransform(eventTypes))
    const unselectedClubs = distinctOptions(filtersExclusions.clubs, dropdownOptionsTransform(clubs))
    const unselectedVenues = distinctOptions(filtersExclusions.venues, dropdownOptionsTransform(venues))
    const unselectedAssetTypes = distinctOptions(filtersExclusions.assetTypes, dropdownOptionsTransform(assetTypes))
    return {
      brandCategoriesOptions: filtersExclusions.brandCategories.concat(unselectedBrandCategories),
      sportCodesOptions: filtersExclusions.sportCodes.concat(unselectedSportCodes),
      eventTypeOptions: filtersExclusions.codeTypes.concat(unselectedEventTypes),
      clubsOptions: filtersExclusions.clubs.concat(unselectedClubs),
      venuesOptions: filtersExclusions.venues.concat(unselectedVenues),
      assetTypesOptions: filtersExclusions.assetTypes.concat(unselectedAssetTypes)
    }
  }

  async handleBrandCategoryChange (brandCategories) {
    this.props.handleClearRows()
    await this.setState({ filtersExclusions: { ...this.state.filtersExclusions, brandCategories } })
    await this.searchExclusion()
  }

  async handleSportCodeChange (sportCodes) {
    this.props.handleClearRows()
    await this.setState({ filtersExclusions: { ...this.state.filtersExclusions, sportCodes } })
    await this.searchExclusion()
  }

  async handleEventTypeChange (codeTypes) {
    this.props.handleClearRows()
    await this.setState({ filtersExclusions: { ...this.state.filtersExclusions, codeTypes } })
    await this.searchExclusion()
  }

  async handleClubChange (clubs) {
    this.props.handleClearRows()
    await this.setState({ filtersExclusions: { ...this.state.filtersExclusions, clubs } })
    await this.searchExclusion()
  }

  async handleVenueChange (venues) {
    this.props.handleClearRows()
    await this.setState({ filtersExclusions: { ...this.state.filtersExclusions, venues } })
    await this.searchExclusion()
  }

  async handleAssetTypeChange (assetTypes) {
    this.props.handleClearRows()
    await this.setState({ filtersExclusions: { ...this.state.filtersExclusions, assetTypes } })
    await this.searchExclusion()
  }

  async searchExclusion () {
    this.props.handleClearRows()
    const { exclusionsFilteredParameters } = this.props
    await this.props.fetchFilterExclusions(
      { items_per_page: exclusionsFilteredParameters.items_per_page },
      this.state.filtersExclusions
    )
  }

  render () {
    const { t } = this.props
    const {
      brandCategoriesOptions,
      sportCodesOptions,
      eventTypeOptions,
      clubsOptions,
      venuesOptions,
      assetTypesOptions
    } = this.state

    return (
      <>
        <Row>
          <Col md={2}>
            <FormGroup>
              <MultipleSelect
                placeholder={t('brandCategory')}
                optionList={brandCategoriesOptions}
                handleChange={this.handleBrandCategoryChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <MultipleSelect
                placeholder={t('sportsCode')}
                optionList={sportCodesOptions}
                handleChange={this.handleSportCodeChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <MultipleSelect
                placeholder={t('eventType')}
                optionList={eventTypeOptions}
                handleChange={this.handleEventTypeChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <MultipleSelect
                placeholder={t('club')}
                optionList={clubsOptions}
                handleChange={this.handleClubChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <MultipleSelect
                placeholder={t('venue')}
                optionList={venuesOptions}
                handleChange={this.handleVenueChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <MultipleSelect
                placeholder={t('assetType')}
                optionList={assetTypesOptions}
                handleChange={this.handleAssetTypeChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ assets, exclusions }) => {
  return {
    isBrandCategoriesLoading: assets.isBrandCategoriesLoading,
    isRegionsLoading: assets.isRegionsLoading,
    isClubsLoading: assets.isClubsLoading,
    isVenuesLoading: assets.isVenuesLoading,
    isAssetTypesLoading: assets.isAssetTypesLoading,
    sportCodes: assets.sportCodes,
    brandCategories: assets.brandCategories,
    clubs: assets.clubs,
    venues: assets.venues,
    assetTypes: assets.assetTypes,
    eventTypes: assets.eventTypes,
    exclusionsFilteredParameters: exclusions.filteredParameters
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchFilterExclusions
  }),
  translate('exclusions')
)(ExclusionManagementFilter)
