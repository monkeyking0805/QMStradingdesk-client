/* global localStorage */
import axios from 'axios'
import { CLIENT_URI } from '../config/environment'
import { MESSAGE_NOTIFICATION } from '../config/message'
import history from '../helpers/historyHelper'
import { clientPath } from '../constants/clientPath'
import LogRocket from 'logrocket'

export const AUTHENTICATE = 'AUTHENTICATE'
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR'

export const LOGOUT = 'LOGOUT'

export const SET_PREVIOUS_PATH = 'SET_PREVIOUS_PATH'
export const UPDATE_CREDENTIAL_DETAIL = 'UPDATE_CREDENTIAL_DETAIL'

export function signIn ({ email, password }) {
  return async (dispatch, getState) => {
    dispatch({
      type: AUTHENTICATE
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/login`, { email, password })
      localStorage.setItem('token', result.data.token)
      dispatch({
        type: AUTHENTICATE_SUCCESS,
        payload: result.data
      })
      const { auth } = getState()
      if (auth.previousPath !== clientPath.auth.login) {
        history.push(`${auth.previousPath}`)
      } else {
        history.push('/')
      }
      LogRocket.identify(result.data.id, {
        email: result.data.email
      })
      return result
    } catch (error) {
      dispatch({
        type: AUTHENTICATE_ERROR,
        payload: MESSAGE_NOTIFICATION.somethingWentWrong
      })
      return { error: error.response.data }
    }
  }
}

export function logOut () {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT
    })
    history.push(clientPath.auth.login)
  }
}

export function setPreviousPath (path) {
  return async (dispath) => {
    dispath({
      type: SET_PREVIOUS_PATH,
      payload: path
    })
  }
}

export function updateCredentialDetail (credential) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_CREDENTIAL_DETAIL,
      payload: credential
    })
  }
}
