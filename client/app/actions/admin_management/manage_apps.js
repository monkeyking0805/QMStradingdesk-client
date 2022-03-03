import axios from 'axios'
import { CLIENT_URI } from '../../config/environment'
import { getTokenHeader } from '../../helpers/authHelper'
// Constant for manage apps
export const MANAGE_FETCH_APPS = 'MANAGE_FETCH_APPS'
export const MANAGE_FETCH_APPS_SUCCESS = 'MANAGE_FETCH_APPS_SUCCESS'
export const MANAGE_FETCH_APPS_ERROR = 'MANAGE_FETCH_APPS_ERROR'

export const MANAGE_FETCH_INDIVIDUAL_APP = 'MANAGE_FETCH_INDIVIDUAL_APP'
export const MANAGE_FETCH_INDIVIDUAL_APP_SUCCESS = 'MANAGE_FETCH_INDIVIDUAL_APP_SUCCESS'
export const MANAGE_FETCH_INDIVIDUAL_APP_ERROR = 'MANAGE_FETCH_INDIVIDUAL_APP_ERROR'

export const MANAGE_SAVE_APP = 'MANAGE_SAVE_APP'
export const MANAGE_SAVE_APP_SUCCESS = 'MANAGE_SAVE_APP_SUCCESS'
export const MANAGE_SAVE_APP_ERROR = 'MANAGE_SAVE_APP_ERROR'

export const MANAGE_UPDATE_APP = 'MANAGE_UPDATE_APP'
export const MANAGE_UPDATE_APP_SUCCESS = 'MANAGE_UPDATE_APP_SUCCESS'
export const MANAGE_UPDATE_APP_ERROR = 'MANAGE_UPDATE_APP_ERROR'

export const MANAGE_DELETE_APP = 'MANAGE_DELETE_APP'
export const MANAGE_DELETE_APP_SUCCESS = 'MANAGE_DELETE_APP_SUCCESS'
export const MANAGE_DELETE_APP_ERROR = 'MANAGE_DELETE_APP_ERROR'

// apps Management
export function fetchApps (filter = {}) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_APPS
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/apps`, {
        headers: getTokenHeader(),
        params: filter
      })
      dispatch({
        type: MANAGE_FETCH_APPS_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_APPS_ERROR
      })
    }
  }
}

export function fetchIndividualApp (appID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_INDIVIDUAL_APP
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/apps/${appID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_APP_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_APP_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveApp (venueRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_SAVE_APP
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/apps`, venueRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_SAVE_APP_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_SAVE_APP_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateApp (appID, venueRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_UPDATE_APP
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/admin/apps/${appID}`, venueRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_UPDATE_APP_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_UPDATE_APP_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteApp (appID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_DELETE_APP
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/admin/apps/${appID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_DELETE_APP_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_DELETE_APP_ERROR
      })
      return { error: error.response.data }
    }
  }
}
