import axios from 'axios'
import { CLIENT_URI } from '../../config/environment'
import { getTokenHeader } from '../../helpers/authHelper'
// Constant for manage assets
export const MANAGE_FETCH_ASSETS = 'MANAGE_FETCH_ASSETS'
export const MANAGE_FETCH_ASSETS_SUCCESS = 'MANAGE_FETCH_ASSETS_SUCCESS'
export const MANAGE_FETCH_ASSETS_ERROR = 'MANAGE_FETCH_ASSETS_ERROR'

export const MANAGE_FETCH_INDIVIDUAL_ASSET = 'MANAGE_FETCH_INDIVIDUAL_ASSET'
export const MANAGE_FETCH_INDIVIDUAL_ASSET_SUCCESS = 'MANAGE_FETCH_INDIVIDUAL_ASSET_SUCCESS'
export const MANAGE_FETCH_INDIVIDUAL_ASSET_ERROR = 'MANAGE_FETCH_INDIVIDUAL_ASSET_ERROR'

export const MANAGE_SAVE_ASSET = 'MANAGE_SAVE_ASSET'
export const MANAGE_SAVE_ASSET_SUCCESS = 'MANAGE_SAVE_ASSET_SUCCESS'
export const MANAGE_SAVE_ASSET_ERROR = 'MANAGE_SAVE_ASSET_ERROR'

export const MANAGE_UPDATE_ASSET = 'MANAGE_UPDATE_ASSET'
export const MANAGE_UPDATE_ASSET_SUCCESS = 'MANAGE_UPDATE_ASSET_SUCCESS'
export const MANAGE_UPDATE_ASSET_ERROR = 'MANAGE_UPDATE_ASSET_ERROR'

export const MANAGE_DELETE_ASSET = 'MANAGE_DELETE_ASSET'
export const MANAGE_DELETE_ASSET_SUCCESS = 'MANAGE_DELETE_ASSET_SUCCESS'
export const MANAGE_DELETE_ASSET_ERROR = 'MANAGE_DELETE_ASSET_ERROR'

export const MANAGE_ARCHIVE_ASSET = 'MANAGE_ARCHIVE_ASSET'
export const MANAGE_ARCHIVE_ASSET_SUCCESS = 'MANAGE_ARCHIVE_ASSET_SUCCESS'
export const MANAGE_ARCHIVE_ASSET_ERROR = 'MANAGE_ARCHIVE_ASSET_ERROR'

export const MANAGE_RESTORE_ASSET = 'MANAGE_RESTORE_ASSET'
export const MANAGE_RESTORE_ASSET_SUCCESS = 'MANAGE_RESTORE_ASSET_SUCCESS'
export const MANAGE_RESTORE_ASSET_ERROR = 'MANAGE_RESTORE_ASSET_ERROR'

export const VALIDATE_IMPORT_ASSETS_CSV = 'VALIDATE_IMPORT_ASSETS_CSV'
export const VALIDATE_IMPORT_ASSETS_CSV_SUCCESS = 'VALIDATE_IMPORT_ASSETS_CSV_SUCCESS'
export const VALIDATE_IMPORT_ASSETS_CSV_ERROR = 'VALIDATE_IMPORT_ASSETS_CSV_ERROR'

export const RESET_VALIDATE_ASSETS_CSV_IMPORT = 'RESET_VALIDATE_ASSETS_CSV_IMPORT'

// Assets Management
export function fetchAssets (paramOptions = {}, filters = {}) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_ASSETS
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/assets`, {
        ...paramOptions,
        ...filters
      }, {
        headers: getTokenHeader(),
        params: {
          ...paramOptions,
          page: (paramOptions.page) ? paramOptions.page : 1
        }
      })
      dispatch({
        type: MANAGE_FETCH_ASSETS_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_ASSETS_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchIndividualAsset (assetID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_INDIVIDUAL_ASSET
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/assets/${assetID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_ASSET_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_ASSET_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveAsset (assetRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_SAVE_ASSET
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/assets/create`, assetRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_SAVE_ASSET_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_SAVE_ASSET_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateAsset (assetID, assetRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_UPDATE_ASSET
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/admin/assets/${assetID}`, assetRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_UPDATE_ASSET_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_UPDATE_ASSET_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteAsset (assetID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_DELETE_ASSET
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/admin/assets/${assetID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_DELETE_ASSET_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_DELETE_ASSET_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function archiveAsset (assetID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_ARCHIVE_ASSET
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/assets/archive`, { id: assetID }, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_ARCHIVE_ASSET_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_ARCHIVE_ASSET_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function restoreAsset (assetID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_RESTORE_ASSET
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/assets/restore`, { id: assetID }, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_RESTORE_ASSET_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_RESTORE_ASSET_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function validateAssetsImportCSV (csvData) {
  return async (dispatch) => {
    dispatch({
      type: VALIDATE_IMPORT_ASSETS_CSV
    })

    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/assets/validateimport`, csvData, {
        headers: getTokenHeader()
      })
      dispatch({
        type: VALIDATE_IMPORT_ASSETS_CSV_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: VALIDATE_IMPORT_ASSETS_CSV_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function resetValidateAssetsImport () {
  return async (dispatch) => {
    dispatch({
      type: RESET_VALIDATE_ASSETS_CSV_IMPORT
    })
  }
}
