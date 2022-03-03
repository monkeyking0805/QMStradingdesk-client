import axios from 'axios'
import { CLIENT_URI } from '../config/environment'

export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'

export const REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET'
export const REQUEST_PASSWORD_RESET_SUCCESS = 'REQUEST_PASSWORD_RESET_SUCCESS'
export const REQUEST_PASSWORD_RESET_ERROR = 'REQUEST_PASSWORD_RESET_ERROR'

export const VALIDATE_RESET_PASSWORD_TOKEN = 'VALIDATE_RESET_PASSWORD_TOKEN'
export const VALIDATE_RESET_PASSWORD_TOKEN_SUCCESS = 'VALIDATE_RESET_PASSWORD_TOKEN_SUCCESS'
export const VALIDATE_RESET_PASSWORD_TOKEN_ERROR = 'VALIDATE_RESET_PASSWORD_TOKEN_ERROR'

// Call for email validate
export function requestResetPassword (formValues) {
  return async (dispatch) => {
    dispatch({
      type: REQUEST_PASSWORD_RESET
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/requestresetpassword`, formValues)
      dispatch({
        type: REQUEST_PASSWORD_RESET_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: REQUEST_PASSWORD_RESET_ERROR
      })
    }
  }
}

// Reset password
export function resetPassword (token, { password }) {
  return async (dispatch) => {
    dispatch({
      type: RESET_PASSWORD
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/resetpassword`, { token, password })
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function validateResetPasswordToken (token) {
  return async (dispatch) => {
    dispatch({
      type: VALIDATE_RESET_PASSWORD_TOKEN
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/resetpassword/${token}`)
      dispatch({
        type: VALIDATE_RESET_PASSWORD_TOKEN_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: VALIDATE_RESET_PASSWORD_TOKEN_ERROR
      })
    }
  }
}
