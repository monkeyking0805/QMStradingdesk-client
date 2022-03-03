/* global describe it */

import assetsReducer from './assets_reducer'
import * as types from '../actions/assets_actions'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'

describe('Reducer:Assets', () => {
  it('Should return initial state', () => {
    expect(assetsReducer(undefined, {})).to.eql({
      isSportCodesLoading: false,
      isBrandCategoriesLoading: false,
      isRegionsLoading: false,
      isClubsLoading: false,
      isVenuesLoading: false,
      isAssetTypesLoading: false,
      isEventTypesLoading: false,
      isBrandLoading: false,
      isEventLoading: false,
      isAssetUnitLoading: false,
      sportCodes: [],
      brandCategories: [],
      regions: [],
      clubs: [],
      venues: [],
      assetTypes: [],
      eventTypes: [],
      brands: [],
      events: [],
      assetUnits: []
    })
  })

  it('Should handle fetch sport codes', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_SPORT_CODES
      })
    ).to.eql({
      isSportCodesLoading: true
    })
  })

  it('Should handle fetch sport codes success', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_SPORT_CODES_SUCCESS,
        payload: fixtures.mockResponse.assets.sportcode
      })
    ).to.eql({
      isSportCodesLoading: false,
      sportCodes: fixtures.mockResponse.assets.sportcode
    })
  })

  it('Should handle fetch sport codes error', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_SPORT_CODES_ERROR
      })
    ).to.eql({
      isSportCodesLoading: false
    })
  })

  it('Should handle fetch brand category', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_BRAND_CATEGORIES
      })
    ).to.eql({
      isBrandCategoryLoading: true
    })
  })

  it('Should handle fetch brand category success', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_BRAND_CATEGORIES_SUCCESS,
        payload: fixtures.mockResponse.assets.brandcategory
      })
    ).to.eql({
      isBrandCategoryLoading: false,
      brandCategories: fixtures.mockResponse.assets.brandcategory
    })
  })

  it('Should handle fetch brand category error', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_BRAND_CATEGORIES_ERROR
      })
    ).to.eql({
      isBrandCategoryLoading: false
    })
  })

  it('Should handle fetch regions', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_REGIONS
      })
    ).to.eql({
      isRegionsLoading: true
    })
  })

  it('Should handle fetch regions success', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_REGIONS_SUCCESS,
        payload: fixtures.mockResponse.assets.regions
      })
    ).to.eql({
      isRegionsLoading: false,
      regions: fixtures.mockResponse.assets.regions
    })
  })

  it('Should handle fetch regions error', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_REGIONS_ERROR
      })
    ).to.eql({
      isRegionsLoading: false
    })
  })

  it('Should handle fetch clubs', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_CLUBS
      })
    ).to.eql({
      isClubsLoading: true
    })
  })

  it('Should handle fetch clubs success', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_CLUBS_SUCCESS,
        payload: fixtures.mockResponse.assets.clubs
      })
    ).to.eql({
      isClubsLoading: false,
      clubs: fixtures.mockResponse.assets.clubs
    })
  })

  it('Should handle fetch clubs error', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_CLUBS_ERROR
      })
    ).to.eql({
      isClubsLoading: false
    })
  })

  it('Should handle fetch venues', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_VENUES
      })
    ).to.eql({
      isVenuesLoading: true
    })
  })

  it('Should handle fetch venues success', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_VENUES_SUCCESS,
        payload: fixtures.mockResponse.assets.venues
      })
    ).to.eql({
      isVenuesLoading: false,
      venues: fixtures.mockResponse.assets.venues
    })
  })

  it('Should handle fetch venues error', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_VENUES_ERROR
      })
    ).to.eql({
      isVenuesLoading: false
    })
  })

  it('Should handle fetch asset types', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_ASSET_TYPES
      })
    ).to.eql({
      isAssetTypesLoading: true
    })
  })

  it('Should handle fetch asset types success', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_ASSET_TYPES_SUCCESS,
        payload: fixtures.mockResponse.assets.assetTypes
      })
    ).to.eql({
      isAssetTypesLoading: false,
      assetTypes: fixtures.mockResponse.assets.assetTypes
    })
  })

  it('Shpuld handle fetch asset types error', () => {
    expect(
      assetsReducer([], {
        type: types.FETCH_ASSET_TYPES_ERROR
      })
    ).to.eql({
      isAssetTypesLoading: false
    })
  })

  it('Should handle fetch event types', () => {

  })

  it('Should handle fetch event types success', () => {

  })

  it('Should handle fetch event types error', () => {

  })
})
