/* global describe it */

import searchReducer from './search_asset_reducer'
import * as actions from '../actions/search_asset_actions'
import { expect } from 'chai'

const searchInitialize = {
  isLoading: false,
  success: false,
  isSearched: false,
  filters: {
    onlyAvailable: true,
    assetTypes: [],
    brandCategories: [],
    clubs: [],
    endDate: null,
    regions: [],
    sportCodes: [],
    startDate: null,
    venues: []
  },
  result: {
    codes: [],
    csvSportCodes: []
  }
}

describe('Reducer:Search Asset', () => {
  it('Should return initial state', () => {
    expect(searchReducer(undefined, {})).to.eql(searchInitialize)
  })

  it('Should handle initialize filter from individual pacakge', () => {
    expect(
      searchReducer(searchInitialize, {
        type: actions.INITIALIZE_FILTER_FROM_INDIVIDUAL_PACKAGE_VIEW,
        payload: []
      })
    ).to.eql({
      ...searchInitialize,
      filters: {
        ...searchInitialize.filters,
        brandCategories: []
      }
    })
  })

  it('Should handle search asset', () => {
    expect(
      searchReducer([], {
        type: actions.SEARCH_ASSET,
        filters: {}
      })
    ).to.eql({
      isLoading: true,
      filters: {}
    })
  })

  it('Should handle search asset success', () => {
    expect(
      searchReducer([], {
        type: actions.SEARCH_ASSET_SUCCESS,
        payload: {
          codes: [],
          csvSportCodes: []
        }
      })
    ).to.eql({
      isLoading: false,
      success: true,
      isSearched: true,
      result: {
        codes: [],
        csvSportCodes: []
      }
    })
  })

  it('Should handle search asset error', () => {
    expect(
      searchReducer([], {
        type: actions.SEARCH_ASSET_ERROR
      })
    ).to.eql({
      isLoading: false,
      result: {
        codes: []
      }
    })
  })

  it('Should handle reset search filter', () => {
    expect(
      searchReducer(searchInitialize, {
        type: actions.RESET_SEARCH_FILTER
      })
    ).to.eql({
      ...searchInitialize,
      filters: searchInitialize.filters
    })
  })

  it('Should handle reset sales search filter', () => {
    expect(
      searchReducer(searchInitialize, {
        type: actions.RESET_SALES_SEARCH_FILTER
      })
    ).to.eql({
      ...searchInitialize,
      filters: {
        ...searchInitialize.filters,
        brandCategories: searchInitialize.filters.brandCategories
      }
    })
  })

  it('Should handle toggle available asset', () => {
    expect(
      searchReducer(searchInitialize, {
        type: actions.TOGGLE_AVAILABLE_ASSET_FILTER
      })
    ).to.eql({
      ...searchInitialize,
      filters: {
        ...searchInitialize.filters,
        onlyAvailable: false
      }
    })
  })

  it('Should handle set fetching loading state', () => {
    expect(
      searchReducer([], {
        type: actions.SET_FETCHING_LOADING_STATE
      })
    ).to.eql({
      isLoading: true
    })
  })
})
