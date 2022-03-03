import axios from 'axios'
import { CLIENT_URI } from '../../config/environment'
import { getTokenHeader } from '../../helpers/authHelper'
// Constant for manage codeTypes
export const MANAGE_FETCH_CODE_TYPES = 'MANAGE_FETCH_CODE_TYPES'
export const MANAGE_FETCH_CODE_TYPES_SUCCESS = 'MANAGE_FETCH_CODE_TYPES_SUCCESS'
export const MANAGE_FETCH_CODE_TYPES_ERROR = 'MANAGE_FETCH_CODE_TYPES_ERROR'

export const MANAGE_FETCH_INDIVIDUAL_CODE_TYPE = 'MANAGE_FETCH_INDIVIDUAL_CODE_TYPE'
export const MANAGE_FETCH_INDIVIDUAL_CODE_TYPE_SUCCESS = 'MANAGE_FETCH_INDIVIDUAL_CODE_TYPE_SUCCESS'
export const MANAGE_FETCH_INDIVIDUAL_CODE_TYPE_ERROR = 'MANAGE_FETCH_INDIVIDUAL_CODE_TYPE_ERROR'

export const MANAGE_SAVE_CODE_TYPE = 'MANAGE_SAVE_CODE_TYPE'
export const MANAGE_SAVE_CODE_TYPE_SUCCESS = 'MANAGE_SAVE_CODE_TYPE_SUCCESS'
export const MANAGE_SAVE_CODE_TYPE_ERROR = 'MANAGE_SAVE_CODE_TYPE_ERROR'

export const MANAGE_UPDATE_CODE_TYPE = 'MANAGE_UPDATE_CODE_TYPE'
export const MANAGE_UPDATE_CODE_TYPE_SUCCESS = 'MANAGE_UPDATE_CODE_TYPE_SUCCESS'
export const MANAGE_UPDATE_CODE_TYPE_ERROR = 'MANAGE_UPDATE_CODE_TYPE_ERROR'

export const MANAGE_DELETE_CODE_TYPE = 'MANAGE_DELETE_CODE_TYPE'
export const MANAGE_DELETE_CODE_TYPE_SUCCESS = 'MANAGE_DELETE_CODE_TYPE_SUCCESS'
export const MANAGE_DELETE_CODE_TYPE_ERROR = 'MANAGE_DELETE_CODE_TYPE_ERROR'

// codeTypes Management
export function fetchCodeTypes (filter = {}) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_CODE_TYPES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/codeTypes`, {
        headers: getTokenHeader(),
        params: filter
      })
      dispatch({
        type: MANAGE_FETCH_CODE_TYPES_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_CODE_TYPES_ERROR
      })
    }
  }
}

export function fetchIndividualCodeType (codeTypeID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_INDIVIDUAL_CODE_TYPE
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/codeTypes/${codeTypeID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_CODE_TYPE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_CODE_TYPE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveCodeType (codeTypeRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_SAVE_CODE_TYPE
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/codeTypes`, codeTypeRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_SAVE_CODE_TYPE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_SAVE_CODE_TYPE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateCodeType (codeTypeID, codeTypeRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_UPDATE_CODE_TYPE
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/admin/codeTypes/${codeTypeID}`, codeTypeRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_UPDATE_CODE_TYPE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_UPDATE_CODE_TYPE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteCodeType (codeTypeID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_DELETE_CODE_TYPE
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/admin/codeTypes/${codeTypeID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_DELETE_CODE_TYPE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_DELETE_CODE_TYPE_ERROR
      })
      return { error: error.response.data }
    }
  }
}
