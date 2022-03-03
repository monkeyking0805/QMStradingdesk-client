import axios from 'axios'
import { CLIENT_URI } from '../config/environment'
import { getTokenHeader } from '../helpers/authHelper'

// THis use only for any user view exclusion
export const FETCH_EXCLUSIONS = 'FETCH_EXCLUSIONS'
export const FETCH_EXCLUSIONS_SUCCESS = 'FETCH_EXCLUSIONS_SUCCESS'
export const FETCH_EXCLUSIONS_ERROR = 'FETCH_EXCLUSIONS_ERROR'

export const SAVE_EXCLUSION = 'SAVE_EXCLUSION'
export const SAVE_EXCLUSION_SUCCESS = 'SAVE_EXCLUSION_SUCCESS'
export const SAVE_EXCLUSION_ERROR = 'SAVE_EXCLUSION_ERROR'

// This use for admin can view exclusion with filter
export const FETCH_FILTER_EXCLUSIONS = 'FETCH_FILTER_EXCLUSIONS'
export const FETCH_FILTER_EXCLUSIONS_SUCCESS = 'FETCH_FILTER_EXCLUSIONS_SUCCESS'
export const FETCH_FILTER_EXCLUSIONS_ERROR = 'FETCH_FILTER_EXCLUSIONS_ERROR'

export const DELETE_EXCLUSION = 'DELETE_EXCLUSION'
export const DELETE_EXCLUSION_SUCCESS = 'DELETE_EXCLUSION_SUCCESS'
export const DELETE_EXCLUSION_ERROR = 'DELETE_EXCLUSION_ERROR'

export const FETCH_INDIVIDUAL_EXCLUSIONS = 'FETCH_INDIVIDUAL_EXCLUSIONS'
export const FETCH_INDIVIDUAL_EXCLUSIONS_SUCCESS = 'FETCH_INDIVIDUAL_EXCLUSIONS_SUCCESS'
export const FETCH_INDIVIDUAL_EXCLUSIONS_ERROR = 'FETCH_INDIVIDUAL_EXCLUSIONS_ERROR'

export const UPDATE_EXCLUSION = 'UPDATE_EXCLUSION'
export const UPDATE_EXCLUSION_SUCCESS = 'UPDATE_EXCLUSION_SUCCESS'
export const UPDATE_EXCLUSION_ERROR = 'UPDATE_EXCLUSION_ERROR'

export const IMPORT_CSV = 'IMPORT_CSV'
export const IMPORT_CSV_SUCCESS = 'IMPORT_CSV_SUCCESS'
export const IMPORT_CSV_ERROR = 'IMPORT_CSV_ERROR'

export const VALIDATE_IMPORT_CSV = 'VALIDATE_IMPORT_CSV'
export const VALIDATE_IMPORT_CSV_SUCCESS = 'VALIDATE_IMPORT_CSV_SUCCESS'
export const VALIDATE_IMPORT_CSV_ERROR = 'VALIDATE_IMPORT_CSV_ERROR'

export const RESET_VALIDATE_IMPORT = 'RESET_VALIDATE_IMPORT'

export function fetchExclusions (clubID) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_EXCLUSIONS
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/exclusions/club/${clubID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_EXCLUSIONS_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: FETCH_EXCLUSIONS_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveExclusion (exclusionRequest) {
  return async (dispatch) => {
    dispatch({
      type: SAVE_EXCLUSION
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/exclusions`, exclusionRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: SAVE_EXCLUSION_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: SAVE_EXCLUSION_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchFilterExclusions (paramOptions = {}, filters = {}) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_FILTER_EXCLUSIONS
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/exclusions/search`, filters, {
        headers: getTokenHeader(),
        params: {
          ...paramOptions
        }
      })
      dispatch({
        type: FETCH_FILTER_EXCLUSIONS_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: FETCH_FILTER_EXCLUSIONS_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteExclusion (exclusionID) {
  return async (dispatch) => {
    dispatch({
      type: DELETE_EXCLUSION
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/exclusions/${exclusionID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: DELETE_EXCLUSION_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: DELETE_EXCLUSION_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchIndividualExclusions (exclusionID) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_INDIVIDUAL_EXCLUSIONS
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/exclusions/${exclusionID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_INDIVIDUAL_EXCLUSIONS_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: FETCH_INDIVIDUAL_EXCLUSIONS_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateExclusion (exclusionID, exclusionRequest) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_EXCLUSION
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/exclusions/${exclusionID}`, exclusionRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: UPDATE_EXCLUSION_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: UPDATE_EXCLUSION_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function validateImportCSV (csvData) {
  return async (dispatch) => {
    dispatch({
      type: VALIDATE_IMPORT_CSV
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/exclusions/validateimport`, csvData, {
        headers: getTokenHeader()
      })
      dispatch({
        type: VALIDATE_IMPORT_CSV_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: VALIDATE_IMPORT_CSV_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function resetValidateImport () {
  return async (dispatch) => {
    dispatch({
      type: RESET_VALIDATE_IMPORT
    })
  }
}
