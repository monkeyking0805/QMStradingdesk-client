import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Col, FormGroup, Row, Input, InputGroup } from 'reactstrap'
import { SEARCH_ICON } from '../../constants/svgConstant'
import MultipleSelect from '../../components/MutipleSelect'
import { fetchAssets } from '../../actions/admin_management/manage_assets'
import { dropdownOptionsTransform, distinctOptions } from '../../helpers/utils'
import '@babel/polyfill'

class ManageAssetFilter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      renderSelect: 0,
      eventOptions: [],
      sportCodesOptions: [],
      assetTypesOptions: [],
      filtersAssets: {
        events: [],
        sportCodes: [],
        assetTypes: [],
        searchQuery: ''
      }
    }
    this.searchAssets = this.searchAssets.bind(this)
    this.handleEventChange = this.handleEventChange.bind(this)
    this.handleAssetTypesChange = this.handleAssetTypesChange.bind(this)
    this.handleSportCodesChange = this.handleSportCodesChange.bind(this)
    this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this)
  }

  static getDerivedStateFromProps (nextProps, nextState) {
    const { events, assetTypes, sportCodes } = nextProps
    const { filtersAssets } = nextState
    const unselectedEvents = distinctOptions(filtersAssets.events, dropdownOptionsTransform(events))
    const unselectedsportCodes = distinctOptions(filtersAssets.sportCodes, dropdownOptionsTransform(sportCodes))
    const unselectedAssetTypes = distinctOptions(filtersAssets.assetTypes, dropdownOptionsTransform(assetTypes))
    return {
      eventOptions: filtersAssets.events.concat(unselectedEvents),
      sportCodesOptions: filtersAssets.sportCodes.concat(unselectedsportCodes),
      assetTypesOptions: filtersAssets.assetTypes.concat(unselectedAssetTypes)
    }
  }

  componentDidUpdate (oldProps) {
    const newProps = this.props
    if (newProps.viewArchived !== oldProps.viewArchived) {
      const newRenderSelect = ++this.state.renderSelect
      this.setState({
        renderSelect: newRenderSelect,
        eventOptions: [],
        sportCodesOptions: [],
        assetTypesOptions: [],
        filtersAssets: {
          events: [],
          sportCodes: [],
          assetTypes: [],
          searchQuery: ''
        }
      })
    }
  }

  async handleEventChange (events) {
    this.props.handleClearRows()
    await this.setState({ filtersAssets: { ...this.state.filtersAssets, events } })
    await this.searchAssets()
  }

  async handleAssetTypesChange (assetTypes) {
    this.props.handleClearRows()
    await this.setState({ filtersAssets: { ...this.state.filtersAssets, assetTypes } })
    await this.searchAssets()
  }

  async handleSportCodesChange (sportCodes) {
    this.props.handleClearRows()
    await this.setState({ filtersAssets: { ...this.state.filtersAssets, sportCodes } })
    await this.searchAssets()
  }

  // Handling search box change
  async handleSearchBoxChange (e) {
    this.props.handleClearRows()
    e.preventDefault()
    const searchQuery = e.target.value
    await this.setState({
      filtersAssets: {
        ...this.state.filtersAssets,
        searchQuery
      }
    })
    if (searchQuery.length > 2) {
      this.props.fetchAssets(this.props.assetsFilter, {
        ...this.state.filtersAssets,
        name: searchQuery
      })
    } else if (searchQuery.length === 0) {
      this.props.fetchAssets({
        ...this.props.assetsFilter,
        name: searchQuery
      })
    }
  }

  searchAssets () {
    this.props.fetchAssets(this.props.assetsFilter, this.state.filtersAssets)
  }

  render () {
    const { t } = this.props
    const {
      renderSelect,
      eventOptions,
      sportCodesOptions,
      assetTypesOptions,
      filtersAssets
    } = this.state
    return (
      <>
        <Row>
          <Col md={2}>
            <FormGroup>
              <MultipleSelect
                key={`event ${renderSelect}`}
                placeholder={t('event')}
                optionList={eventOptions}
                handleChange={this.handleEventChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <MultipleSelect
                key={`sportsCode ${renderSelect}`}
                placeholder={t('sportsCode')}
                optionList={sportCodesOptions}
                handleChange={this.handleSportCodesChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <MultipleSelect
                key={`assetType ${renderSelect}`}
                placeholder={t('assetType')}
                optionList={assetTypesOptions}
                handleChange={this.handleAssetTypesChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <InputGroup className='input-box-search'>
                <Input
                  placeholder={t('searchByName')}
                  onChange={(e) => this.handleSearchBoxChange(e)}
                  value={filtersAssets.searchQuery}
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
            </FormGroup>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ assets, adminManagement }) => {
  return {
    events: assets.events,
    assetTypes: assets.assetTypes,
    sportCodes: assets.sportCodes,
    assetsFilter: adminManagement.assetsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchAssets
  }),
  translate('assets')
)(ManageAssetFilter)
