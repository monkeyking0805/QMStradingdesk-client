/* global beforeEach describe it localStorage */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './manage_code_types'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('Action:AdminManagements:ManagecodeType', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch codeType success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codeTypes.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.codeTypes.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_CODE_TYPES },
      { type: actions.MANAGE_FETCH_CODE_TYPES_SUCCESS, payload: mockResponse.admin.codeTypes.list }
    ]
    return store.dispatch(actions.fetchCodeTypes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch codeType error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codeTypes.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.codeTypes.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_CODE_TYPES },
      { type: actions.MANAGE_FETCH_CODE_TYPES_ERROR }
    ]
    return store.dispatch(actions.fetchCodeTypes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual codeType success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codeTypes.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.codeTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CODE_TYPE },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CODE_TYPE_SUCCESS, payload: mockResponse.admin.codeTypes.individualItem }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualCodeType(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual codeType error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codeTypes.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.codeTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CODE_TYPE },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CODE_TYPE_ERROR }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualCodeType(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save codeType  success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codeTypes.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 201,
      request: mockRequest.admin.codeTypes.create,
      response: mockResponse.admin.codeTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_CODE_TYPE },
      { type: actions.MANAGE_SAVE_CODE_TYPE_SUCCESS, payload: mockResponse.admin.codeTypes.individualItem }
    ]
    return store.dispatch(actions.saveCodeType(mockRequest.admin.codeTypes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save codeType error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codeTypes.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.admin.codeTypes.create,
      response: mockResponse.admin.codeTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_CODE_TYPE },
      { type: actions.MANAGE_SAVE_CODE_TYPE_ERROR }
    ]
    return store.dispatch(actions.saveCodeType(mockRequest.admin.codeTypes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update codeType success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codeTypes.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.admin.codeTypes.create,
      response: mockResponse.admin.codeTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_CODE_TYPE },
      { type: actions.MANAGE_UPDATE_CODE_TYPE_SUCCESS, payload: mockResponse.admin.codeTypes.individualItem }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateCodeType(1, mockRequest.admin.codeTypes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update codeType error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codeTypes.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      request: mockRequest.admin.codeTypes.create,
      response: mockResponse.admin.codeTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_CODE_TYPE },
      { type: actions.MANAGE_UPDATE_CODE_TYPE_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateCodeType(1, mockRequest.admin.codeTypes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete codeType  success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codeTypes.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 200,
      response: mockResponse.admin.codeTypes.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_CODE_TYPE },
      { type: actions.MANAGE_DELETE_CODE_TYPE_SUCCESS, payload: mockResponse.admin.codeTypes.deletedItem }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteCodeType(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete codeType  error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.codeTypes.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500,
      response: mockResponse.admin.codeTypes.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_CODE_TYPE },
      { type: actions.MANAGE_DELETE_CODE_TYPE_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteCodeType(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
