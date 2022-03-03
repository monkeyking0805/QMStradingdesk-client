/* global describe it */

import userReducer from './user_reducer'
import * as types from '../actions/user_actions'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'

describe('Reducer:User', () => {
  it('Should return initial state', () => {
    expect(userReducer(undefined, {})).to.eql({
      isSubmitting: false,
      isLoading: false,
      userList: [],
      individualUser: {},
      userListFilter: {},
      userListPaginate: {}
    })
  })

  it('Should handle fetch users', () => {
    expect(
      userReducer([], {
        type: types.FETCH_USERS,
        isLoading: true
      })
    ).to.eql({
      isLoading: true
    })
  })

  it('Should handle fetch users success', () => {
    const { userList } = fixtures.mockResponse.user
    expect(
      userReducer([], {
        type: types.FETCH_USERS_SUCCESS,
        isLoading: false,
        payload: userList
      })
    ).to.eql({
      isLoading: false,
      userList: userList.rows,
      userListFilter: userList.parameters,
      userListPaginate: userList.paginate
    })
  })

  it('Should handle fetch users error', () => {
    expect(
      userReducer([], {
        type: types.FETCH_USERS_ERROR,
        isLoading: false
      })
    ).to.eql({
      isLoading: false
    })
  })

  it('Should handle fetch individual user', () => {
    expect(
      userReducer([], {
        type: types.FETCH_INDIVIDUAL_USER,
        isLoading: true
      })
    ).to.eql({
      isLoading: true
    })
  })

  it('Should handle fetch individual user success', () => {
    expect(
      userReducer([], {
        type: types.FETCH_INDIVIDUAL_USER_SUCCESS,
        isLoading: false,
        payload: fixtures.mockResponse.user.individualUser
      })
    ).to.eql({
      isLoading: false,
      individualUser: fixtures.mockResponse.user.individualUser
    })
  })

  it('Should handle fetch individual user error', () => {
    expect(
      userReducer([], {
        type: types.FETCH_INDIVIDUAL_USER_ERROR,
        isLoading: false
      })
    ).to.eql({
      isLoading: false
    })
  })

  it('Should handle create user', () => {
    expect(
      userReducer([], {
        type: types.CREATE_USER
      })
    ).to.eql({
      isSubmitting: true
    })
  })

  it('Should handle create user success', () => {
    expect(
      userReducer([], {
        type: types.CREATE_USER_SUCCESS,
        payload: fixtures.mockRequest.user.createUser
      })
    ).to.eql({
      isSubmitting: false
    })
  })

  it('Should handle create user error', () => {
    expect(
      userReducer([], {
        type: types.CREATE_USER_ERROR
      })
    ).to.eql({
      isSubmitting: false
    })
  })

  it('Should handle delete individual user', () => {
    expect(
      userReducer([], {
        type: types.DELETE_USER
      })
    ).to.eql({
      isLoading: true
    })
  })

  it('Should handle delete individual user success', () => {
    expect(
      userReducer([], {
        type: types.DELETE_USER_SUCCESS
      })
    ).to.eql({
      isLoading: false
    })
  })

  it('Should handle delete individual user error', () => {
    expect(
      userReducer([], {
        type: types.DELETE_USER_ERROR,
        isLoading: false
      })
    ).to.eql({
      isLoading: false
    })
  })
})
