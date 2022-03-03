import axios from 'axios'
import { CLIENT_URI } from '../../config/environment'
import { getTokenHeader } from '../../helpers/authHelper'
// Constant for manage events
export const MANAGE_FETCH_EVENTS = 'MANAGE_FETCH_EVENTS'
export const MANAGE_FETCH_EVENTS_SUCCESS = 'MANAGE_FETCH_EVENTS_SUCCESS'
export const MANAGE_FETCH_EVENTS_ERROR = 'MANAGE_FETCH_EVENTS_ERROR'

export const MANAGE_FETCH_INDIVIDUAL_EVENT = 'MANAGE_FETCH_INDIVIDUAL_EVENT'
export const MANAGE_FETCH_INDIVIDUAL_EVENT_SUCCESS = 'MANAGE_FETCH_INDIVIDUAL_EVENT_SUCCESS'
export const MANAGE_FETCH_INDIVIDUAL_EVENT_ERROR = 'MANAGE_FETCH_INDIVIDUAL_EVENT_ERROR'

export const MANAGE_SAVE_EVENT = 'MANAGE_SAVE_EVENT'
export const MANAGE_SAVE_EVENT_SUCCESS = 'MANAGE_SAVE_EVENT_SUCCESS'
export const MANAGE_SAVE_EVENT_ERROR = 'MANAGE_SAVE_EVENT_ERROR'

export const MANAGE_UPDATE_EVENT = 'MANAGE_UPDATE_EVENT'
export const MANAGE_UPDATE_EVENT_SUCCESS = 'MANAGE_UPDATE_EVENT_SUCCESS'
export const MANAGE_UPDATE_EVENT_ERROR = 'MANAGE_UPDATE_EVENT_ERROR'

export const MANAGE_DELETE_EVENT = 'MANAGE_DELETE_EVENT'
export const MANAGE_DELETE_EVENT_SUCCESS = 'MANAGE_DELETE_EVENT_SUCCESS'
export const MANAGE_DELETE_EVENT_ERROR = 'MANAGE_DELETE_EVENT_ERROR'

export const MANAGE_ARCHIVE_EVENT = 'MANAGE_ARCHIVE_EVENT'
export const MANAGE_ARCHIVE_EVENT_SUCCESS = 'MANAGE_ARCHIVE_EVENT_SUCCESS'
export const MANAGE_ARCHIVE_EVENT_ERROR = 'MANAGE_ARCHIVE_EVENT_ERROR'

export const MANAGE_RESTORE_EVENT = 'MANAGE_RESTORE_EVENT'
export const MANAGE_RESTORE_EVENT_SUCCESS = 'MANAGE_RESTORE_EVENT_SUCCESS'
export const MANAGE_RESTORE_EVENT_ERROR = 'MANAGE_RESTORE_EVENT_ERROR'

export const MANAGE_IMPORT_EVENTS_CSV = 'MANAGE_IMPORT_EVENTS_CSV'
export const MANAGE_IMPORT_EVENTS_CSV_SUCCESS = 'MANAGE_IMPORT_EVENTS_CSV_SUCCESS'
export const MANAGE_IMPORT_EVENTS_CSV_ERROR = 'MANAGE_IMPORT_EVENTS_CSV_ERROR'

export const VALIDATE_IMPORT_EVENTS_CSV = 'VALIDATE_IMPORT_EVENTS_CSV'
export const VALIDATE_IMPORT_EVENTS_CSV_SUCCESS = 'VALIDATE_IMPORT_EVENTS_CSV_SUCCESS'
export const VALIDATE_IMPORT_EVENTS_CSV_ERROR = 'VALIDATE_IMPORT_EVENTS_CSV_ERROR'

export const RESET_VALIDATE_EVENTS_CSV_IMPORT = 'RESET_VALIDATE_EVENTS_CSV_IMPORT'

// Events Management
export function fetchEvents (paramOptions = {}, filters = {}) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_EVENTS
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/events`, {
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
        type: MANAGE_FETCH_EVENTS_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_EVENTS_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchIndividualEvent (eventID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_INDIVIDUAL_EVENT
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/events/${eventID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_EVENT_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_EVENT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveEvent (eventRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_SAVE_EVENT
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/events/create`, eventRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_SAVE_EVENT_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_SAVE_EVENT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateEvent (eventID, eventRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_UPDATE_EVENT
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/admin/events/${eventID}`, eventRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_UPDATE_EVENT_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_UPDATE_EVENT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteEvent (eventID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_DELETE_EVENT
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/admin/events/${eventID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_DELETE_EVENT_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_DELETE_EVENT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function archiveEvent (eventID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_ARCHIVE_EVENT
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/events/archive`, { id: eventID }, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_ARCHIVE_EVENT_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_ARCHIVE_EVENT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function restoreEvent (eventID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_RESTORE_EVENT
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/events/restore`, { id: eventID }, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_RESTORE_EVENT_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_RESTORE_EVENT_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function validateEventsImportCSV (csvData) {
  return async (dispatch) => {
    dispatch({
      type: VALIDATE_IMPORT_EVENTS_CSV
    })

    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/events/validateimport`, csvData, {
        headers: getTokenHeader()
      })
      dispatch({
        type: VALIDATE_IMPORT_EVENTS_CSV_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: VALIDATE_IMPORT_EVENTS_CSV_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function resetValidateEventsImport () {

}
