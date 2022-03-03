/* global describe it */

import authReducer from './auth_reducer'
import * as types from '../actions/auth_actions'
import { expect } from 'chai'

describe('Reducer:Auth', () => {
  it('Should return initial state', () => {
    expect(authReducer(undefined, {})).to.eql({
      authenticated: false,
      isSubmitting: false,
      credentialDetail: {},
      previousPath: ''
    })
  })

  it('Should handle Authenticate', () => {
    expect(
      authReducer([], {
        type: types.AUTHENTICATE,
        isSubmitting: true
      })
    ).to.eql({
      isSubmitting: true
    })
  })

  it('Should handle Authenticate success', () => {
    expect(
      authReducer([], {
        type: types.AUTHENTICATE_SUCCESS,
        payload: {
          role: {
            name: 'Test'
          }
        }
      })
    ).to.eql({
      isSubmitting: false,
      authenticated: true,
      credentialDetail: {
        role: 'Test'
      }
    })
  })

  it('Should handle Authenticate error', () => {
    expect(
      authReducer([], {
        type: types.AUTHENTICATE_ERROR,
        isSubmitting: false
      })
    ).to.eql({
      isSubmitting: false
    })
  })

  it('Should handle update credential detail', () => {
    expect(
      authReducer([], {
        type: types.UPDATE_CREDENTIAL_DETAIL,
        payload: {
          firstname: 'testfirstname',
          lastname: 'testlastname'
        }
      })
    ).to.eql({
      credentialDetail: {
        firstname: 'testfirstname',
        lastname: 'testlastname'
      }
    })
  })
})
