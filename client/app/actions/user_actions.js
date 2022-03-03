import axios from 'axios'
import { CLIENT_URI } from '../config/environment'
import { getTokenHeader } from '../helpers/authHelper'

export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'

export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR'

export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD'
export const UPDATE_USER_PASSWORD_SUCCESS = 'UPDATE_USER_PASSWORD_SUCCESS'
export const UPDATE_USER_PASSWORD_ERROR = 'UPATE_USER_PASSWORD_ERROR'

export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'

export const FETCH_INDIVIDUAL_USER = 'FETCH_INDIVIDUAL_USER'
export const FETCH_INDIVIDUAL_USER_SUCCESS = 'FETCH_INDIVIDUAL_USER_SUCCESS'
export const FETCH_INDIVIDUAL_USER_ERROR = 'FETCH_INDIVIDUAL_USER_ERROR'

export const DELETE_USER = 'DELETE_USER'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR'

export function createUser (userRequest) {
  return async (dispatch) => {
    dispatch({
      type: CREATE_USER
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/users`, userRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: CREATE_USER_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateUser (userID, userRequest) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_USER
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/users/${userID}`, userRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updateUserPassword (userID, userRequest) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_USER_PASSWORD
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/users/${userID}/changepassword`, userRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: UPDATE_USER_PASSWORD_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: UPDATE_USER_PASSWORD_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchUsers (filter = {}) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_USERS
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/users`, {
        headers: getTokenHeader(),
        params: filter
      })
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_USERS_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchIndividualUser (userID) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_INDIVIDUAL_USER
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/users/${userID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: FETCH_INDIVIDUAL_USER_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: FETCH_INDIVIDUAL_USER_ERROR
      })
    }
  }
}

export function deleteIndividualUser (userID) {
  return async (dispatch) => {
    dispatch({
      type: DELETE_USER
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/users/${userID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: DELETE_USER_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: DELETE_USER_ERROR
      })
    }
  }
}
