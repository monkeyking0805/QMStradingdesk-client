import axios from 'axios'
import { CLIENT_URI } from '../config/environment'
import { getTokenHeader } from '../helpers/authHelper'
export const FETCH_ASSETS_UNIT = 'FETCH_ASSETS_UNIT'
export const FETCH_ASSETS_UNIT_SUCCESS = 'FETCH_ASSETS_UNIT_SUCCESS'
export const FETCH_ASSETS_UNIT_ERROR = 'FETCH_ASSETS_UNIT_ERROR'

export const FETCH_INDIVIDUAL_ASSETS_UNIT = 'FETCH_INDIVIDUAL_ASSETS_UNIT'
export const FETCH_INDIVIDUAL_ASSETS_UNIT_SUCCESS = 'FETCH_INDIVIDUAL_ASSETS_UNIT_SUCCESS'
export const FETCH_INDIVIDUAL_ASSETS_UNIT_ERROR = 'FETCH_INDIVIDUAL_ASSETS_UNIT_ERROR'

export const SAVE_ASSETS_UNIT = 'SAVE_ASSETS_UNIT'
export const SAVE_ASSETS_UNIT_SUCCESS = 'SAVE_ASSETS_UNIT_SUCCESS'
export const SAVE_ASSETS_UNIT_ERROR = 'SAVE_ASSETS_UNIT_ERROR'

export const UPDATE_ASSETS_UNIT = 'UPDATE_ASSETS_UNIT'
export const UPDATE_ASSETS_UNIT_SUCCESS = 'UPDATE_ASSETS_UNIT_SUCCESS'
export const UPDATE_ASSETS_UNIT_ERROR = 'UPDATE_ASSETS_UNIT_ERROR'

export const DELETE_ASSETS_UNIT = 'DELETE_ASSETS_UNIT'
export const DELETE_ASSETS_UNIT_SUCCESS = 'DELETE_ASSETS_UNIT_SUCCESS'
export const DELETE_ASSETS_UNIT_ERROR = 'DELETE_ASSETS_UNIT_ERROR'

export const MANAGE_RESTORE_ASSETS_UNIT = 'MANAGE_RESTORE_ASSETS_UNIT'
export const MANAGE_RESTORE_ASSETS_UNIT_SUCCESS = 'MANAGE_RESTORE_ASSETS_UNIT_SUCCESS'
export const MANAGE_RESTORE_ASSETS_UNIT_ERROR = 'MANAGE_RESTORE_ASSETS_UNIT_ERROR'

export const MANAGE_ARCHIVE_ASSETS_UNIT = 'MANAGE_ARCHIVE_ASSETS_UNIT'
export const MANAGE_ARCHIVE_ASSETS_UNIT_SUCCESS = 'MANAGE_ARCHIVE_ASSETS_UNIT_SUCCESS'
export const MANAGE_ARCHIVE_ASSETS_UNIT_ERROR = 'MANAGE_ARCHIVE_ASSETS_UNIT_ERROR'

export function fetchAssetUnits (filter = {}) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_ASSETS_UNIT
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/assetunits`, {
        headers: getTokenHeader(),
        params: filter
      })
      dispatch({
        type: FETCH_ASSETS_UNIT_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_ASSETS_UNIT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchIndividualAssetUnits (assetUnitID) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_INDIVIDUAL_ASSETS_UNIT
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/assetunits/${assetUnitID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_INDIVIDUAL_ASSETS_UNIT_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: FETCH_INDIVIDUAL_ASSETS_UNIT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveAssetUnit (assetUnitRequest) {
  return async (dispatch) => {
    dispatch({
      type: SAVE_ASSETS_UNIT
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/assetunits`, assetUnitRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: SAVE_ASSETS_UNIT_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: SAVE_ASSETS_UNIT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateAssetUnit (assetUnitID, formValues) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_ASSETS_UNIT
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/admin/assetunits/${assetUnitID}`, formValues, {
        headers: getTokenHeader()
      })
      dispatch({
        type: UPDATE_ASSETS_UNIT_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: UPDATE_ASSETS_UNIT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteAssetUnit (assetUnitID) {
  return async (dispatch) => {
    dispatch({
      type: DELETE_ASSETS_UNIT
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/admin/assetunits/${assetUnitID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: DELETE_ASSETS_UNIT_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: DELETE_ASSETS_UNIT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function archiveAssetUnit (assetUnitID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_ARCHIVE_ASSETS_UNIT
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/assetunits/archive`, { id: assetUnitID }, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_ARCHIVE_ASSETS_UNIT_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_ARCHIVE_ASSETS_UNIT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function restoreAssetUnit (assetID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_RESTORE_ASSETS_UNIT
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/assetunits/restore`, { id: assetID }, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_RESTORE_ASSETS_UNIT_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_RESTORE_ASSETS_UNIT_ERROR
      })
      return { error: error.response.data }
    }
  }
}
