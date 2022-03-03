import axios from 'axios'
import { CLIENT_URI } from '../../config/environment'
import { getTokenHeader } from '../../helpers/authHelper'
// Constant for manage venues
export const MANAGE_FETCH_BRAND_CATEGORIES = 'MANAGE_FETCH_BRAND_CATEGORIES'
export const MANAGE_FETCH_BRAND_CATEGORIES_SUCCESS = 'MANAGE_FETCH_BRAND_CATEGORIES_SUCCESS'
export const MANAGE_FETCH_BRAND_CATEGORIES_ERROR = 'MANAGE_FETCH_BRAND_CATEGORIES_ERROR'

export const MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY = 'MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY'
export const MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY_SUCCESS = 'MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY_SUCCESS'
export const MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY_ERROR = 'MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY_ERROR'

export const MANAGE_SAVE_BRAND_CATEGORY = 'MANAGE_SAVE_BRAND_CATEGORY'
export const MANAGE_SAVE_BRAND_CATEGORY_SUCCESS = 'MANAGE_SAVE_BRAND_CATEGORY_SUCCESS'
export const MANAGE_SAVE_BRAND_CATEGORY_ERROR = 'MANAGE_SAVE_BRAND_CATEGORY_ERROR'

export const MANAGE_UPDATE_BRAND_CATEGORY = 'MANAGE_UPDATE_BRAND_CATEGORY'
export const MANAGE_UPDATE_BRAND_CATEGORY_SUCCESS = 'MANAGE_UPDATE_BRAND_CATEGORY_SUCCESS'
export const MANAGE_UPDATE_BRAND_CATEGORY_ERROR = 'MANAGE_UPDATE_BRAND_CATEGORY_ERROR'

export const MANAGE_DELETE_BRAND_CATEGORY = 'MANAGE_DELETE_BRAND_CATEGORY'
export const MANAGE_DELETE_BRAND_CATEGORY_SUCCESS = 'MANAGE_DELETE_BRAND_CATEGORY_SUCCESS'
export const MANAGE_DELETE_BRAND_CATEGORY_ERROR = 'MANAGE_DELETE_BRAND_CATEGORY_ERROR'

// Brand Category Management
export function fetchBrandCategories (filter = {}) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_BRAND_CATEGORIES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/brandcategories`, {
        headers: getTokenHeader(),
        params: filter
      })
      dispatch({
        type: MANAGE_FETCH_BRAND_CATEGORIES_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_BRAND_CATEGORIES_ERROR
      })
    }
  }
}

export function fetchIndividualBrandCategory (brandCategoryID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/brandcategories/${brandCategoryID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveBrandCategory (brandCategoryRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_SAVE_BRAND_CATEGORY
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/brandcategories`, brandCategoryRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_SAVE_BRAND_CATEGORY_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_SAVE_BRAND_CATEGORY_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateBrandCategory (brandCategoryID, brandCategoryRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_UPDATE_BRAND_CATEGORY
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/admin/brandcategories/${brandCategoryID}`, brandCategoryRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_UPDATE_BRAND_CATEGORY_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_UPDATE_BRAND_CATEGORY_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteBrandCategory (brandCategoryID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_DELETE_BRAND_CATEGORY
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/admin/brandcategories/${brandCategoryID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_DELETE_BRAND_CATEGORY_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_DELETE_BRAND_CATEGORY_ERROR
      })
      return { error: error.response.data }
    }
  }
}
