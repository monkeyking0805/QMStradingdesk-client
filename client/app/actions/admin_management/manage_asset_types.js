import axios from 'axios'
import { CLIENT_URI } from '../../config/environment'
import { getTokenHeader } from '../../helpers/authHelper'
// Constant for manage asset type
export const MANAGE_FETCH_ASSET_TYPES = 'MANAGE_FETCH_ASSET_TYPES'
export const MANAGE_FETCH_ASSET_TYPES_SUCCESS = 'MANAGE_FETCH_ASSET_TYPES_SUCCESS'
export const MANAGE_FETCH_ASSET_TYPES_ERROR = 'MANAGE_FETCH_ASSET_TYPES_ERROR'

export const MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE = 'MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE'
export const MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE_SUCCESS = 'MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE_SUCCESS'
export const MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE_ERROR = 'MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE_ERROR'

export const MANAGE_SAVE_ASSET_TYPE = 'MANAGE_SAVE_ASSET_TYPE'
export const MANAGE_SAVE_ASSET_TYPE_SUCCESS = 'MANAGE_SAVE_ASSET_TYPE_SUCCESS'
export const MANAGE_SAVE_ASSET_TYPE_ERROR = 'MANAGE_SAVE_ASSET_TYPE_ERROR'

export const MANAGE_UPDATE_ASSET_TYPE = 'MANAGE_UPDATE_ASSET_TYPE'
export const MANAGE_UPDATE_ASSET_TYPE_SUCCESS = 'MANAGE_UPDATE_ASSET_TYPE_SUCCESS'
export const MANAGE_UPDATE_ASSET_TYPE_ERROR = 'MANAGE_UPDATE_ASSET_TYPE_ERROR'

export const MANAGE_DELETE_ASSET_TYPE = 'MANAGE_DELETE_ASSET_TYPE'
export const MANAGE_DELETE_ASSET_TYPE_SUCCESS = 'MANAGE_DELETE_ASSET_TYPE_SUCCESS'
export const MANAGE_DELETE_ASSET_TYPE_ERROR = 'MANAGE_DELETE_ASSET_TYPE_ERROR'

// Asset Type Management
export function fetchAssetTypes (filter = {}) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_ASSET_TYPES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/assettypes`, {
        headers: getTokenHeader(),
        params: filter
      })
      dispatch({
        type: MANAGE_FETCH_ASSET_TYPES_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_ASSET_TYPES_ERROR
      })
    }
  }
}

export function fetchIndividualAssetType (assetTypeID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/assettypes/${assetTypeID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveAssetType (assetTypeRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_SAVE_ASSET_TYPE
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/assettypes`, assetTypeRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_SAVE_ASSET_TYPE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_SAVE_ASSET_TYPE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateAssetType (assetTypeID, assetTypeRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_UPDATE_ASSET_TYPE
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/admin/assettypes/${assetTypeID}`, assetTypeRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_UPDATE_ASSET_TYPE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_UPDATE_ASSET_TYPE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteAssetType (assetTypeID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_DELETE_ASSET_TYPE
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/admin/assettypes/${assetTypeID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_DELETE_ASSET_TYPE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_DELETE_ASSET_TYPE_ERROR
      })
      return { error: error.response.data }
    }
  }
}
