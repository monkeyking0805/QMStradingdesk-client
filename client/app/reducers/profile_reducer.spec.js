/* global describe it */

import profileReducer from './profile_reducer'
import * as types from '../actions/profile_actions'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'

describe('Reducer:Profile', () => {
  it('Should return initial state', () => {
    expect(profileReducer(undefined, {})).to.eql({
      isLoading: false,
      isSubmitting: false,
      profileDetail: {}
    })
  })

  it('Should handle fetch profile detail', () => {
    expect(
      profileReducer([], {
        type: types.FETCH_PROFILE_DETAIL
      })
    ).to.eql({
      isLoading: true
    })
  })

  it('Should handle fetch profile detail success', () => {
    const { mockResponse } = fixtures
    expect(
      profileReducer([], {
        type: types.FETCH_PROFILE_DETAIL_SUCCESS,
        payload: mockResponse.profile.detail
      })
    ).to.eql({
      isLoading: false,
      profileDetail: mockResponse.profile.detail
    })
  })

  it('Should handle fetch profile detail error', () => {
    expect(
      profileReducer([], {
        type: types.FETCH_PROFILE_DETAIL_ERROR
      })
    ).to.eql({
      isLoading: false
    })
  })

  it('Should handle update profile detail', () => {
    expect(
      profileReducer([], {
        type: types.UPDATE_PROFILE_DETAIL
      })
    ).to.eql({
      isSubmitting: true
    })
  })

  it('Should handle update profile detail success', () => {
    const { mockRequest } = fixtures
    expect(
      profileReducer([], {
        type: types.UPDATE_PROFILE_DETAIL_SUCCESS,
        payload: mockRequest.profile.updatedDetail
      })
    ).to.eql({
      isSubmitting: false
    })
  })

  it('Should handle update profile detail error', () => {
    expect(
      profileReducer([], {
        type: types.UPDATE_PROFILE_DETAIL_ERROR
      })
    ).to.eql({
      isSubmitting: false
    })
  })

  it('Should handle profile reset password ', () => {
    expect(
      profileReducer([], {
        type: types.RESET_PROFILE_PASSWORD
      })
    ).to.eql({
      isSubmitting: true
    })
  })

  it('Should handle profile reset password success', () => {
    expect(
      profileReducer([], {
        type: types.RESET_PROFILE_PASSWORD_SUCCESS
      })
    ).to.eql({
      isSubmitting: false
    })
  })

  it('Should handle profile reset password error', () => {
    expect(
      profileReducer([], {
        type: types.RESET_PROFILE_PASSWORD_ERROR
      })
    ).to.eql({
      isSubmitting: false
    })
  })

  it('Should handle profile reset email ', () => {
    expect(
      profileReducer([], {
        type: types.RESET_PROFILE_EMAIL
      })
    ).to.eql({
      isSubmitting: true
    })
  })

  it('Should handle profile reset email success', () => {
    expect(
      profileReducer([], {
        type: types.RESET_PROFILE_EMAIL_SUCCESS
      })
    ).to.eql({
      isSubmitting: false
    })
  })

  it('Should handle profile reset email error', () => {
    expect(
      profileReducer([], {
        type: types.RESET_PROFILE_EMAIL_ERROR
      })
    ).to.eql({
      isSubmitting: false
    })
  })
})
