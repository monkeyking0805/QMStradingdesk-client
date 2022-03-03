import axios from 'axios'
import { CLIENT_URI } from '../../config/environment'
import { getTokenHeader } from '../../helpers/authHelper'
// Constant for manage venues
export const MANAGE_FETCH_VENUES = 'MANAGE_FETCH_VENUES'
export const MANAGE_FETCH_VENUES_SUCCESS = 'MANAGE_FETCH_VENUES_SUCCESS'
export const MANAGE_FETCH_VENUES_ERROR = 'MANAGE_FETCH_VENUES_ERROR'

export const MANAGE_FETCH_INDIVIDUAL_VENUE = 'MANAGE_FETCH_INDIVIDUAL_VENUE'
export const MANAGE_FETCH_INDIVIDUAL_VENUE_SUCCESS = 'MANAGE_FETCH_INDIVIDUAL_VENUE_SUCCESS'
export const MANAGE_FETCH_INDIVIDUAL_VENUE_ERROR = 'MANAGE_FETCH_INDIVIDUAL_VENUE_ERROR'

export const MANAGE_SAVE_VENUE = 'MANAGE_SAVE_VENUE'
export const MANAGE_SAVE_VENUE_SUCCESS = 'MANAGE_SAVE_VENUE_SUCCESS'
export const MANAGE_SAVE_VENUE_ERROR = 'MANAGE_SAVE_VENUE_ERROR'

export const MANAGE_UPDATE_VENUE = 'MANAGE_UPDATE_VENUE'
export const MANAGE_UPDATE_VENUE_SUCCESS = 'MANAGE_UPDATE_VENUE_SUCCESS'
export const MANAGE_UPDATE_VENUE_ERROR = 'MANAGE_UPDATE_VENUE_ERROR'

export const MANAGE_DELETE_VENUE = 'MANAGE_DELETE_VENUE'
export const MANAGE_DELETE_VENUE_SUCCESS = 'MANAGE_DELETE_VENUE_SUCCESS'
export const MANAGE_DELETE_VENUE_ERROR = 'MANAGE_DELETE_VENUE_ERROR'

// venues Management
export function fetchVenues (filter = {}) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_VENUES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/venues`, {
        headers: getTokenHeader(),
        params: filter
      })
      dispatch({
        type: MANAGE_FETCH_VENUES_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_VENUES_ERROR
      })
    }
  }
}

export function fetchIndividualVenue (venueID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_INDIVIDUAL_VENUE
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/venues/${venueID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_VENUE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_VENUE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveVenue (venueRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_SAVE_VENUE
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/venues`, venueRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_SAVE_VENUE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_SAVE_VENUE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateVenue (venueID, venueRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_UPDATE_VENUE
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/admin/venues/${venueID}`, venueRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_UPDATE_VENUE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_UPDATE_VENUE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteVenue (venueID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_DELETE_VENUE
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/admin/venues/${venueID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_DELETE_VENUE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_DELETE_VENUE_ERROR
      })
      return { error: error.response.data }
    }
  }
}
