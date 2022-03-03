/* global beforeEach describe it localStorage */

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './user_actions'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'
import nockGenerate from '../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action:User', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle create user success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.createUser,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      request: mockRequest.user.createUser,
      response: mockResponse.user.createdUser
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.CREATE_USER },
      { type: actions.CREATE_USER_SUCCESS, payload: mockResponse.user.createdUser }
    ]
    return store.dispatch(actions.createUser(mockRequest.user.createUser)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle create user error', () => {
    const { environment, mockHTTP, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.createUser,
      method: mockHTTP.httpMethod.post,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.CREATE_USER },
      { type: actions.CREATE_USER_ERROR }
    ]
    return store.dispatch(actions.createUser(mockRequest.user.createUser)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update user success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.updateUser,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.user.updateUser,
      response: mockResponse.user.updatedUser
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.UPDATE_USER },
      { type: actions.UPDATE_USER_SUCCESS, payload: mockResponse.user.updatedUser }
    ]
    return store.dispatch(actions.updateUser(1, mockRequest.user.updateUser)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update user error', () => {
    const { environment, mockHTTP, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.updateUser,
      method: mockHTTP.httpMethod.put,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.UPDATE_USER },
      { type: actions.UPDATE_USER_ERROR }
    ]
    // Mock User ID 1
    return store.dispatch(actions.updateUser(1, mockRequest.user.updateUser)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch users success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.getUser,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.user.userList
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_USERS },
      { type: actions.FETCH_USERS_SUCCESS, payload: mockResponse.user.userList }
    ]
    return store.dispatch(actions.fetchUsers()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch users error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.getUser,
      method: mockHTTP.httpMethod.get,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_USERS },
      { type: actions.FETCH_USERS_ERROR }
    ]
    // Mock User ID 1
    return store.dispatch(actions.fetchUsers()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual user success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.getIndividualUser,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.user.individualUser
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_INDIVIDUAL_USER },
      { type: actions.FETCH_INDIVIDUAL_USER_SUCCESS, payload: mockResponse.user.individualUser }
    ]
    // Mock User ID 1
    return store.dispatch(actions.fetchIndividualUser(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual user error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.getIndividualUser,
      method: mockHTTP.httpMethod.get,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_INDIVIDUAL_USER },
      { type: actions.FETCH_INDIVIDUAL_USER_ERROR }
    ]
    // Mock User ID 1
    return store.dispatch(actions.fetchIndividualUser(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete individual user success', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.deleteIndividualUser,
      method: mockHTTP.httpMethod.delete,
      statusCode: 204
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.DELETE_USER },
      { type: actions.DELETE_USER_SUCCESS }
    ]
    // Mock User ID 1
    return store.dispatch(actions.deleteIndividualUser(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete individual user error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.deleteIndividualUser,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.DELETE_USER },
      { type: actions.DELETE_USER_ERROR }
    ]
    // Mock User ID 1
    return store.dispatch(actions.deleteIndividualUser(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
