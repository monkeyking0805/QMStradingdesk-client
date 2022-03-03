/* global describe it */

import utilsReducer from './utils_reducer'
import * as types from '../actions/utils_actions'
import { expect } from 'chai'

describe('Reducer:Utils', () => {
  it('Should return initial state', () => {
    expect(utilsReducer(undefined, {})).to.eql({
      isLoading: false,
      isSubmitting: false,
      isValidPasswordToken: false
    })
  })

  it('Should handle reset password', () => {
    expect(
      utilsReducer([], {
        type: types.RESET_PASSWORD
      })
    ).to.eql({
      isSubmitting: true
    })
  })

  it('Should handle reset password success', () => {
    expect(
      utilsReducer([], {
        type: types.RESET_PASSWORD_SUCCESS
      })
    ).to.eql({
      isSubmitting: false
    })
  })

  it('Should handle reset password error', () => {
    expect(
      utilsReducer([], {
        type: types.RESET_PASSWORD_ERROR
      })
    ).to.eql({
      isSubmitting: false
    })
  })

  it('Should handle validate reset password', () => {
    expect(
      utilsReducer([], {
        type: types.VALIDATE_RESET_PASSWORD_TOKEN
      })
    ).to.eql({
      isLoading: true
    })
  })

  it('Should handle validate reset password success', () => {
    expect(
      utilsReducer([], {
        type: types.VALIDATE_RESET_PASSWORD_TOKEN_SUCCESS
      })
    ).to.eql({
      isLoading: false,
      isValidPasswordToken: true
    })
  })

  it('Should handle validate reset password error', () => {
    expect(
      utilsReducer([], {
        type: types.VALIDATE_RESET_PASSWORD_TOKEN_ERROR
      })
    ).to.eql({
      isLoading: false
    })
  })
})
