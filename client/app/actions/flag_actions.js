import axios from 'axios'
import { CLIENT_URI } from '../config/environment'
import { getTokenHeader } from '../helpers/authHelper'

export const FETCH_FLAG_LANGUAGES = 'FETCH_FLAG_LANGUAGES'
export const FETCH_FLAG_LANGUAGES_SUCCESS = 'FETCH_FLAG_LANGUAGES_SUCCESS'
export const FETCH_FLAG_LANGUAGES_ERROR = ' FETCH_FLAG_LANGUAGES_ERROR'

export const FETCH_FLAG_COUNTRIES = 'FETCH_FLAG_COUNTRIES'
export const FETCH_FLAG_COUNTRIES_SUCCESS = 'FETCH_FLAG_COUNTRIES_SUCCESS'
export const FETCH_FLAG_COUNTRIES_ERROR = 'FETCH_FLAG_COUNTRIES_ERROR'

export const FETCH_FLAG_TIMEZONES = 'FETCH_FLAG_TIMEZONES'
export const FETCH_FLAG_TIMEZONES_SUCCESS = 'FETCH_FLAG_TIMEZONES_SUCCESS'
export const FETCH_FLAG_TIMEZONES_ERROR = 'FETCH_FLAG_TIMEZONES_ERROR'

export const FETCH_FLAG_REGIONS = 'FETCH_FLAG_REGIONS'
export const FETCH_FLAG_REGIONS_SUCCESS = 'FETCH_FLAG_REGIONS_SUCCESS'
export const FETCH_FLAG_REGIONS_ERROR = 'FETCH_FLAG_REGIONS_ERROR'

export const FETCH_FLAG_USER_ROLES = 'FETCH_FLAG_USER_ROLES'
export const FETCH_FLAG_USER_ROLES_SUCCESS = 'FETCH_FLAG_USER_ROLES_SUCCESS'
export const FETCH_FLAG_USER_ROLES_ERROR = 'FETCH_FLAG_USER_ROLES_ERROR'

export function fetchFlagTimezones () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_FLAG_TIMEZONES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/flag/timezones`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_FLAG_TIMEZONES_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_FLAG_TIMEZONES_ERROR
      })
    }
  }
}

export function fetchFlagLanguages () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_FLAG_LANGUAGES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/flag/languages`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_FLAG_LANGUAGES_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_FLAG_LANGUAGES_ERROR
      })
    }
  }
}

export function fetchFlagCountries () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_FLAG_COUNTRIES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/flag/countries`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_FLAG_COUNTRIES_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_FLAG_COUNTRIES_ERROR
      })
    }
  }
}

export function fetchFlagRegions () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_FLAG_REGIONS
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/flag/regions`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_FLAG_REGIONS_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_FLAG_REGIONS_ERROR
      })
    }
  }
}

export function fetchFlagUserRoles () {
  return async (dispatch) => {
    dispatch({
      type: FETCH_FLAG_USER_ROLES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/flag/roles`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_FLAG_USER_ROLES_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_FLAG_USER_ROLES_ERROR
      })
    }
  }
}
