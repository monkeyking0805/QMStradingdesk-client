import axios from 'axios'
import { CLIENT_URI } from '../../config/environment'
import { getTokenHeader } from '../../helpers/authHelper'
// Constant for manage brands
export const MANAGE_FETCH_BRANDS = 'MANAGE_FETCH_BRANDS'
export const MANAGE_FETCH_BRANDS_SUCCESS = 'MANAGE_FETCH_BRANDS_SUCCESS'
export const MANAGE_FETCH_BRANDS_ERROR = 'MANAGE_FETCH_BRANDS_ERROR'

export const MANAGE_FETCH_INDIVIDUAL_BRAND = 'MANAGE_FETCH_INDIVIDUAL_BRAND'
export const MANAGE_FETCH_INDIVIDUAL_BRAND_SUCCESS = 'MANAGE_FETCH_INDIVIDUAL_BRAND_SUCCESS'
export const MANAGE_FETCH_INDIVIDUAL_BRAND_ERROR = 'MANAGE_FETCH_INDIVIDUAL_BRAND_ERROR'

export const MANAGE_SAVE_BRAND = 'MANAGE_SAVE_BRAND'
export const MANAGE_SAVE_BRAND_SUCCESS = 'MANAGE_SAVE_BRAND_SUCCESS'
export const MANAGE_SAVE_BRAND_ERROR = 'MANAGE_SAVE_BRAND_ERROR'

export const MANAGE_UPDATE_BRAND = 'MANAGE_UPDATE_BRAND'
export const MANAGE_UPDATE_BRAND_SUCCESS = 'MANAGE_UPDATE_BRAND_SUCCESS'
export const MANAGE_UPDATE_BRAND_ERROR = 'MANAGE_UPDATE_BRAND_ERROR'

export const MANAGE_DELETE_BRAND = 'MANAGE_DELETE_BRAND'
export const MANAGE_DELETE_BRAND_SUCCESS = 'MANAGE_DELETE_BRAND_SUCCESS'
export const MANAGE_DELETE_BRAND_ERROR = 'MANAGE_DELETE_BRAND_ERROR'

// Brands Management
export function fetchBrands (filters = {}) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_BRANDS
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/brands`, {
        headers: getTokenHeader(),
        params: {
          ...filters
        }
      })
      dispatch({
        type: MANAGE_FETCH_BRANDS_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_BRANDS_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchIndividualBrand (brandID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_INDIVIDUAL_BRAND
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/brands/${brandID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_BRAND_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_BRAND_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveBrand (brandRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_SAVE_BRAND
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/brands`, brandRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_SAVE_BRAND_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_SAVE_BRAND_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateBrand (brandID, brandRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_UPDATE_BRAND
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/admin/brands/${brandID}`, brandRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_UPDATE_BRAND_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_UPDATE_BRAND_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteBrand (brandID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_DELETE_BRAND
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/admin/brands/${brandID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_DELETE_BRAND_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_DELETE_BRAND_ERROR
      })
      return { error: error.response.data }
    }
  }
}
