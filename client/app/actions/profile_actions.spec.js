/* global beforeEach describe it localStorage */

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './profile_actions'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'
import nockGenerate from '../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action:Profile', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch profile detail success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.profile.getProfile,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.profile.detail
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_PROFILE_DETAIL },
      { type: actions.FETCH_PROFILE_DETAIL_SUCCESS, payload: mockResponse.profile.detail }
    ]
    return store.dispatch(actions.fetchProfileDetail()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch profile detail error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.profile.getProfile,
      method: mockHTTP.httpMethod.get,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_PROFILE_DETAIL },
      { type: actions.FETCH_PROFILE_DETAIL_ERROR }
    ]
    return store.dispatch(actions.fetchProfileDetail()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update profile detail success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.profile.getProfile,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.profile.updatedDetail,
      response: mockResponse.profile.updatedDetail
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.UPDATE_PROFILE_DETAIL },
      { type: actions.UPDATE_PROFILE_DETAIL_SUCCESS, payload: mockResponse.profile.updatedDetail }
    ]
    return store.dispatch(actions.updateProfileDetail(mockRequest.profile.updatedDetail)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update profile detail error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.profile.getProfile,
      method: mockHTTP.httpMethod.put,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.UPDATE_PROFILE_DETAIL },
      { type: actions.UPDATE_PROFILE_DETAIL_ERROR }
    ]
    return store.dispatch(actions.updateProfileDetail()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle reset profile password success', () => {
    const { environment, mockHTTP, mockRequest, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.profile.resetPassword,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.profile.resetPassword,
      response: mockResponse.profile.resetPassword
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.RESET_PROFILE_PASSWORD },
      { type: actions.RESET_PROFILE_PASSWORD_SUCCESS, payload: mockResponse.profile.resetPassword }
    ]
    return store.dispatch(actions.resetProfilePassword(mockRequest.profile.resetPassword)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle reset profile password error', () => {
    const { environment, mockHTTP, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.profile.resetPassword,
      method: mockHTTP.httpMethod.put,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.RESET_PROFILE_PASSWORD },
      { type: actions.RESET_PROFILE_PASSWORD_ERROR }
    ]
    return store.dispatch(actions.resetProfilePassword(mockRequest.profile.resetPassword)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle request profile email success', () => {
    const { environment, mockHTTP, mockRequest, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.profile.resetEmail,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      request: mockRequest.profile.resetEmail,
      response: mockResponse.profile.resetEmail
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.REQUEST_RESET_PROFILE_EMAIL },
      { type: actions.REQUEST_RESET_PROFILE_EMAIL_SUCCESS, payload: mockResponse.profile.resetEmail }
    ]
    return store.dispatch(actions.requestResetProfileEmail(mockRequest.profile.resetEmail)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle request reset profile email erorr', () => {
    const { environment, mockHTTP, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.profile.resetEmail,
      method: mockHTTP.httpMethod.post,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.REQUEST_RESET_PROFILE_EMAIL },
      { type: actions.REQUEST_RESET_PROFILE_EMAIL_ERROR }
    ]
    return store.dispatch(actions.requestResetProfileEmail(mockRequest.profile.resetEmail)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle reset profile email success', () => {
    const { environment, mockHTTP, mockRequest, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.profile.validateResetEmailToken,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.profile.resetEmail
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.RESET_PROFILE_EMAIL },
      { type: actions.RESET_PROFILE_EMAIL_SUCCESS, payload: mockResponse.profile.resetEmail }
    ]
    return store.dispatch(actions.resetProfileEmail(mockRequest.profile.resetEmailToken)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle reset profile email error', () => {
    const { environment, mockHTTP, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.profile.validateResetEmailToken,
      method: mockHTTP.httpMethod.get,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.RESET_PROFILE_EMAIL },
      { type: actions.RESET_PROFILE_EMAIL_ERROR }
    ]
    return store.dispatch(actions.resetProfileEmail(mockRequest.profile.resetEmailToken)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
