import axios from 'axios'
import { CLIENT_URI } from '../../config/environment'
import { getTokenHeader } from '../../helpers/authHelper'
// Constant for manage codes
export const MANAGE_FETCH_CODES = 'MANAGE_FETCH_CODES'
export const MANAGE_FETCH_CODES_SUCCESS = 'MANAGE_FETCH_CODES_SUCCESS'
export const MANAGE_FETCH_CODES_ERROR = 'MANAGE_FETCH_CODES_ERROR'

export const MANAGE_FETCH_INDIVIDUAL_CODE = 'MANAGE_FETCH_INDIVIDUAL_CODE'
export const MANAGE_FETCH_INDIVIDUAL_CODE_SUCCESS = 'MANAGE_FETCH_INDIVIDUAL_CODE_SUCCESS'
export const MANAGE_FETCH_INDIVIDUAL_CODE_ERROR = 'MANAGE_FETCH_INDIVIDUAL_CODE_ERROR'

export const MANAGE_SAVE_CODE = 'MANAGE_SAVE_CODE'
export const MANAGE_SAVE_CODE_SUCCESS = 'MANAGE_SAVE_CODE_SUCCESS'
export const MANAGE_SAVE_CODE_ERROR = 'MANAGE_SAVE_CODE_ERROR'

export const MANAGE_UPDATE_CODE = 'MANAGE_UPDATE_CODE'
export const MANAGE_UPDATE_CODE_SUCCESS = 'MANAGE_UPDATE_CODE_SUCCESS'
export const MANAGE_UPDATE_CODE_ERROR = 'MANAGE_UPDATE_CODE_ERROR'

export const MANAGE_DELETE_CODE = 'MANAGE_DELETE_CODE'
export const MANAGE_DELETE_CODE_SUCCESS = 'MANAGE_DELETE_CODE_SUCCESS'
export const MANAGE_DELETE_CODE_ERROR = 'MANAGE_DELETE_CODE_ERROR'

// Codes Management
export function fetchCodes (filter = {}) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_CODES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/codes`, {
        headers: getTokenHeader(),
        params: filter
      })
      dispatch({
        type: MANAGE_FETCH_CODES_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_CODES_ERROR
      })
    }
  }
}

export function fetchIndividualCode (codeID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_INDIVIDUAL_CODE
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/codes/${codeID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_CODE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_CODE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveCode (codeRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_SAVE_CODE
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/codes`, codeRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_SAVE_CODE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_SAVE_CODE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateCode (codeID, codeRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_UPDATE_CODE
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/admin/codes/${codeID}`, codeRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_UPDATE_CODE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_UPDATE_CODE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteCode (codeID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_DELETE_CODE
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/admin/codes/${codeID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_DELETE_CODE_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_DELETE_CODE_ERROR
      })
      return { error: error.response.data }
    }
  }
}
