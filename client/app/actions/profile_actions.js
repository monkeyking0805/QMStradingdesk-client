import axios from 'axios'
import { CLIENT_URI } from '../config/environment'
import { getTokenHeader } from '../helpers/authHelper'

export const FETCH_PROFILE_DETAIL = 'FETCH_PROFILE_DETAIL'
export const FETCH_PROFILE_DETAIL_SUCCESS = 'FETCH_PROFILE_DETAIL_SUCCESS'
export const FETCH_PROFILE_DETAIL_ERROR = 'FETCH_PROFILE_DETAIL_ERROR'

export const UPDATE_PROFILE_DETAIL = 'UPDATE_PROFILE_DETAIL'
export const UPDATE_PROFILE_DETAIL_SUCCESS = 'UPDATE_PROFILE_DETAIL_SUCCESS'
export const UPDATE_PROFILE_DETAIL_ERROR = 'UPDATE_PROFILE_DETAIL_ERROR'

export const RESET_PROFILE_PASSWORD = 'RESET_PROFILE_PASSWORD'
export const RESET_PROFILE_PASSWORD_SUCCESS = 'RESET_PROFILE_PASSWORD_SUCCESS'
export const RESET_PROFILE_PASSWORD_ERROR = 'RESET_PROFILE_PASSWORD_ERROR'

export const REQUEST_RESET_PROFILE_EMAIL = 'REQUEST_RESET_PROFILE_EMAIL'
export const REQUEST_RESET_PROFILE_EMAIL_SUCCESS = 'REQUEST_RESET_PROFILE_EMAIL_SUCCESS'
export const REQUEST_RESET_PROFILE_EMAIL_ERROR = 'REQUEST_RESET_PROFILE_EMAIL_ERROR'

export const RESET_PROFILE_EMAIL = 'RESET_PROFILE_EMAIL'
export const RESET_PROFILE_EMAIL_SUCCESS = 'RESET_PROFILE_EMAIL_SUCCESS'
export const RESET_PROFILE_EMAIL_ERROR = 'RESET_PROFILE_EMAIL_ERROR'

export function fetchProfileDetail () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_PROFILE_DETAIL
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/profile`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_PROFILE_DETAIL_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_DETAIL_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateProfileDetail (profileDetail) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_PROFILE_DETAIL
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/profile`, profileDetail, {
        headers: getTokenHeader()
      })
      dispatch({
        type: UPDATE_PROFILE_DETAIL_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_DETAIL_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function resetProfilePassword (passwordDetail) {
  return async (dispatch) => {
    dispatch({
      type: RESET_PROFILE_PASSWORD
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/profile/resetpassword`, passwordDetail, {
        headers: getTokenHeader()
      })
      dispatch({
        type: RESET_PROFILE_PASSWORD_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: RESET_PROFILE_PASSWORD_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function requestResetProfileEmail (formValues) {
  return async (dispatch) => {
    dispatch({
      type: REQUEST_RESET_PROFILE_EMAIL
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/profile/resetemail`, formValues, {
        headers: getTokenHeader()
      })
      dispatch({
        type: REQUEST_RESET_PROFILE_EMAIL_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: REQUEST_RESET_PROFILE_EMAIL_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function resetProfileEmail (resetToken) {
  return async (dispatch) => {
    dispatch({
      type: RESET_PROFILE_EMAIL
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/profile/resetemail/${resetToken}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: RESET_PROFILE_EMAIL_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: RESET_PROFILE_EMAIL_ERROR
      })
      return { error: error.response.data }
    }
  }
}
