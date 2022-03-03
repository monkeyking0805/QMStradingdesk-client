import axios from 'axios'
import { CLIENT_URI } from '../config/environment'
import { getTokenHeader } from '../helpers/authHelper'

export const FETCH_BRANDS = 'FETCH_BRANDS'
export const FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS'
export const FETCH_BRANDS_ERROR = 'FETCH_BRANDS_ERROR'

export const FETCH_SPORT_CODES = 'FETCH_SPORT_CODES'
export const FETCH_SPORT_CODES_SUCCESS = 'FETCH_SPORT_CODES_SUCCESS'
export const FETCH_SPORT_CODES_ERROR = 'FETCH_SPORT_CODES_ERROR'

export const FETCH_BRAND_CATEGORIES = 'FETCH_BRAND_CATEGORIES'
export const FETCH_BRAND_CATEGORIES_SUCCESS = 'FETCH_BRAND_CATEGORIES_SUCCESS'
export const FETCH_BRAND_CATEGORIES_ERROR = 'FETCH_BRAND_CATEGORIES_ERROR'

export const FETCH_REGIONS = 'FETCH_REGIONS'
export const FETCH_REGIONS_SUCCESS = 'FETCH_REGIONS_SUCCESS'
export const FETCH_REGIONS_ERROR = 'FETCH_REGIONS_ERROR'

export const FETCH_CLUBS = 'FETCH_CLUBS'
export const FETCH_CLUBS_SUCCESS = 'FETCH_CLUBS_SUCCESS'
export const FETCH_CLUBS_ERROR = 'FETCH_CLUBS_ERROR'

export const FETCH_VENUES = 'FETCH_VENUES'
export const FETCH_VENUES_SUCCESS = 'FETCH_VENUES_SUCCESS'
export const FETCH_VENUES_ERROR = 'FETCH_VENUES_ERROR'

export const FETCH_ASSET_TYPES = 'FETCH_ASSET_TYPES'
export const FETCH_ASSET_TYPES_SUCCESS = 'FETCH_ASSET_TYPES_SUCCESS'
export const FETCH_ASSET_TYPES_ERROR = 'FETCH_ASSET_TYPES_ERROR'

export const FETCH_EVENT_TYPES = 'FETCH_EVENT_TYPES'
export const FETCH_EVENT_TYPES_SUCCESS = 'FETCH_EVENT_TYPES_SUCCESS'
export const FETCH_EVENT_TYPES_ERROR = 'FETCH_EVENT_TYPES_ERROR'

export const FETCH_EVENTS = 'FETCH_EVENT'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENT_SUCCESS'
export const FETCH_EVENTS_ERROR = 'FETCH_EVENT_ERROR'

export const FETCH_ASSETS_UNIT_LIST = 'FETCH_ASSETS_LIST'
export const FETCH_ASSETS_UNIT_LIST_SUCCESS = 'FETCH_ASSETS_LIST_SUCCESS'
export const FETCH_ASSETS_UNIT_LIST_ERROR = 'FETCH_ASSETS_LIST_ERROR'

export function fetchSportCodes () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_SPORT_CODES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/assets/sportcodes`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_SPORT_CODES_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_SPORT_CODES_ERROR
      })
    }
  }
}

export function fetchBrands () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_BRANDS
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/brands`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_BRANDS_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_BRANDS_ERROR
      })
    }
  }
}

export function fetchBrandCategories () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_BRAND_CATEGORIES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/assets/brandcategories`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_BRAND_CATEGORIES_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_BRAND_CATEGORIES_ERROR
      })
    }
  }
}

export function fetchRegions () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_REGIONS
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/assets/regions`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_REGIONS_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_REGIONS_ERROR
      })
    }
  }
}

export function fetchClubs () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_CLUBS
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/assets/clubs`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_CLUBS_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_CLUBS_ERROR
      })
    }
  }
}

export function fetchVenues () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_VENUES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/assets/venues`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_VENUES_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_VENUES_ERROR
      })
    }
  }
}

export function fetchAssetTypes () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_ASSET_TYPES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/assets/assettypes`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_ASSET_TYPES_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_ASSET_TYPES_ERROR
      })
    }
  }
}

export function fetchEventTypes () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_EVENT_TYPES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/codetypes`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_EVENT_TYPES_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_EVENT_TYPES_ERROR
      })
    }
  }
}

export function fetchEvents () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_EVENTS
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/events`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_EVENTS_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_EVENTS_ERROR
      })
    }
  }
}

export function fetchAssetsUnitList () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_ASSETS_UNIT_LIST
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/assetunits`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_ASSETS_UNIT_LIST_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_ASSETS_UNIT_LIST_ERROR
      })
    }
  }
}
