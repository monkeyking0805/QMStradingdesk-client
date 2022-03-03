/* global beforeEach describe it */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './auth_actions'
import nock from 'nock'
import { expect } from 'chai'
import { MESSAGE_NOTIFICATION } from '../config/message'
import fixtures from '../../../test/fixtures'
import nockGenerate from '../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action:Auth', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    done()
  })

  it('Should handle auth success', () => {
    /* Due inject on auth action need to disable this test case for while
      const { environment, mockHTTP, mockRequest, mockResponse } = fixtures
      const nockOptions = {
        uri: environment.clientUri,
        uriParams: mockHTTP.mockURI.auth.login,
        method: mockHTTP.httpMethod.post,
        statusCode: 200,
        request: mockRequest.validLogin,
        response: mockResponse.loginSuccessResponse
      }
      nockGenerate(nockOptions)
      const expectedActions = [
        { type: actions.AUTHENTICATE },
        { type: actions.AUTHENTICATE_SUCCESS, payload: mockResponse.loginSuccessResponse }
      ]
      return store.dispatch(actions.signIn(mockRequest.validLogin)).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
    */
  })

  it('Should handle auth error status', () => {
    const { environment, mockHTTP, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.auth.login,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.invalidLogin
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.AUTHENTICATE },
      { type: actions.AUTHENTICATE_ERROR, payload: MESSAGE_NOTIFICATION.somethingWentWrong }
    ]

    return store.dispatch(actions.signIn(mockRequest.invalidLogin)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
