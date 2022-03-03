/* global beforeEach describe it localStorage */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './manage_codes'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('Action:AdminManagements:Managecode', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch code success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codes.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.codes.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_CODES },
      { type: actions.MANAGE_FETCH_CODES_SUCCESS, payload: mockResponse.admin.codes.list }
    ]
    return store.dispatch(actions.fetchCodes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch code error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codes.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.codes.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_CODES },
      { type: actions.MANAGE_FETCH_CODES_ERROR }
    ]
    return store.dispatch(actions.fetchCodes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual code success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codes.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.codes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CODE },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CODE_SUCCESS, payload: mockResponse.admin.codes.individualItem }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualCode(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual code error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codes.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.codes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CODE },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CODE_ERROR }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualCode(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save code  success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codes.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      request: mockRequest.admin.codes.create,
      response: mockResponse.admin.codes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_CODE },
      { type: actions.MANAGE_SAVE_CODE_SUCCESS, payload: mockResponse.admin.codes.individualItem }
    ]
    return store.dispatch(actions.saveCode(mockRequest.admin.codes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save code error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codes.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.admin.codes.create,
      response: mockResponse.admin.codes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_CODE },
      { type: actions.MANAGE_SAVE_CODE_ERROR }
    ]
    return store.dispatch(actions.saveCode(mockRequest.admin.codes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update code success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codes.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.admin.codes.create,
      response: mockResponse.admin.codes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_CODE },
      { type: actions.MANAGE_UPDATE_CODE_SUCCESS, payload: mockResponse.admin.codes.individualItem }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateCode(1, mockRequest.admin.codes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update code error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codes.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      request: mockRequest.admin.codes.create,
      response: mockResponse.admin.codes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_CODE },
      { type: actions.MANAGE_UPDATE_CODE_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateCode(1, mockRequest.admin.codes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete code  success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codes.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 200,
      response: mockResponse.admin.codes.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_CODE },
      { type: actions.MANAGE_DELETE_CODE_SUCCESS }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteCode(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete code  error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codes.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500,
      response: mockResponse.admin.codes.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_CODE },
      { type: actions.MANAGE_DELETE_CODE_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteCode(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
