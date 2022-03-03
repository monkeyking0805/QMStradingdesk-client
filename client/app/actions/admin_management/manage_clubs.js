import axios from 'axios'
import { CLIENT_URI } from '../../config/environment'
import { getTokenHeader } from '../../helpers/authHelper'
// Constant for manage clubs
export const MANAGE_FETCH_CLUBS = 'MANAGE_FETCH_CLUBS'
export const MANAGE_FETCH_CLUBS_SUCCESS = 'MANAGE_FETCH_CLUBS_SUCCESS'
export const MANAGE_FETCH_CLUBS_ERROR = 'MANAGE_FETCH_CLUBS_ERROR'

export const MANAGE_FETCH_INDIVIDUAL_CLUB = 'MANAGE_FETCH_INDIVIDUAL_CLUB'
export const MANAGE_FETCH_INDIVIDUAL_CLUB_SUCCESS = 'MANAGE_FETCH_INDIVIDUAL_CLUB_SUCCESS'
export const MANAGE_FETCH_INDIVIDUAL_CLUB_ERROR = 'MANAGE_FETCH_INDIVIDUAL_CLUB_ERROR'

export const MANAGE_SAVE_CLUB = 'MANAGE_SAVE_CLUB'
export const MANAGE_SAVE_CLUB_SUCCESS = 'MANAGE_SAVE_CLUB_SUCCESS'
export const MANAGE_SAVE_CLUB_ERROR = 'MANAGE_SAVE_CLUB_ERROR'

export const MANAGE_UPDATE_CLUB = 'MANAGE_UPDATE_CLUB'
export const MANAGE_UPDATE_CLUB_SUCCESS = 'MANAGE_UPDATE_CLUB_SUCCESS'
export const MANAGE_UPDATE_CLUB_ERROR = 'MANAGE_UPDATE_CLUB_ERROR'

export const MANAGE_DELETE_CLUB = 'MANAGE_DELETE_CLUB'
export const MANAGE_DELETE_CLUB_SUCCESS = 'MANAGE_DELETE_CLUB_SUCCESS'
export const MANAGE_DELETE_CLUB_ERROR = 'MANAGE_DELETE_CLUB_ERROR'

// Clubs Management
export function fetchClubs (filters = {}) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_CLUBS
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/clubs`, {
        headers: getTokenHeader(),
        params: {
          ...filters
        }
      })
      dispatch({
        type: MANAGE_FETCH_CLUBS_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_CLUBS_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchIndividualClub (clubID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_FETCH_INDIVIDUAL_CLUB
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/admin/clubs/${clubID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_CLUB_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_FETCH_INDIVIDUAL_CLUB_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function saveClub (clubRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_SAVE_CLUB
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/admin/clubs`, clubRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_SAVE_CLUB_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_SAVE_CLUB_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateClub (clubID, clubRequest) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_UPDATE_CLUB
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/admin/clubs/${clubID}`, clubRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_UPDATE_CLUB_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_UPDATE_CLUB_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function deleteClub (clubID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_DELETE_CLUB
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/admin/clubs/${clubID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_DELETE_CLUB_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_DELETE_CLUB_ERROR
      })
      return { error: error.response.data }
    }
  }
}
