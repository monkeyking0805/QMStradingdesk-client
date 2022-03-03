/* global beforeEach describe it localStorage */

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './utils_actions'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'
import nockGenerate from '../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action:Utils', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle request reset password success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.requestResetPassword,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      request: mockRequest.user.requestResetPassword,
      response: mockResponse.user.requestResetPassword
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.REQUEST_PASSWORD_RESET },
      { type: actions.REQUEST_PASSWORD_RESET_SUCCESS, payload: mockResponse.user.requestResetPassword }
    ]
    return store.dispatch(actions.requestResetPassword(mockRequest.user.requestResetPassword)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle request reset password error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.requestResetPassword,
      method: mockHTTP.httpMethod.post,
      statusCode: 400,
      request: mockRequest.user.requestResetPassword,
      response: mockResponse.user.requestResetPassword
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.REQUEST_PASSWORD_RESET },
      { type: actions.REQUEST_PASSWORD_RESET_ERROR }
    ]
    return store.dispatch(actions.requestResetPassword(mockRequest.user.requestResetPassword)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle reset password success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.resetPassword,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      response: mockResponse.user.resetPassword
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.RESET_PASSWORD },
      { type: actions.RESET_PASSWORD_SUCCESS, payload: mockResponse.user.resetPassword }
    ]
    return store.dispatch(actions.resetPassword(mockRequest.user.resetPassword.token, mockRequest.user.resetPassword.password)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle reset password error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.resetPassword,
      method: mockHTTP.httpMethod.post,
      statusCode: 409,
      response: mockResponse.user.resetPassword
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.RESET_PASSWORD },
      { type: actions.RESET_PASSWORD_ERROR }
    ]
    return store.dispatch(actions.resetPassword(mockRequest.user.resetPassword.token, mockRequest.user.resetPassword.password)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle validate password token success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.validateResetPasswordToken,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.user.valdidateToken
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.VALIDATE_RESET_PASSWORD_TOKEN },
      { type: actions.VALIDATE_RESET_PASSWORD_TOKEN_SUCCESS, payload: mockResponse.user.valdidateToken }
    ]
    return store.dispatch(actions.validateResetPasswordToken(mockRequest.user.validateToken)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle validate password token error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.validateResetPasswordToken,
      method: mockHTTP.httpMethod.get,
      statusCode: 404,
      response: mockResponse.user.valdidateToken
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.VALIDATE_RESET_PASSWORD_TOKEN },
      { type: actions.VALIDATE_RESET_PASSWORD_TOKEN_ERROR }
    ]
    return store.dispatch(actions.validateResetPasswordToken(mockRequest.user.validateToken)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
