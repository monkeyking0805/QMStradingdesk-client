/* global beforeEach describe it localStorage */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './manage_asset_types'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('Action:AdminManagements:ManageAssetTypes', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch asset types success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assetTypes.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.assetTypes.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_ASSET_TYPES },
      { type: actions.MANAGE_FETCH_ASSET_TYPES_SUCCESS, payload: mockResponse.admin.assetTypes.list }
    ]
    return store.dispatch(actions.fetchAssetTypes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch asset types error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assetTypes.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.assetTypes.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_ASSET_TYPES },
      { type: actions.MANAGE_FETCH_ASSET_TYPES_ERROR }
    ]
    return store.dispatch(actions.fetchAssetTypes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual asset types success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assetTypes.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.assetTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE_SUCCESS, payload: mockResponse.admin.assetTypes.individualItem }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualAssetType(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual asset types error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assetTypes.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.assetTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_ASSET_TYPE_ERROR }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualAssetType(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save asset types success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assetTypes.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      request: mockRequest.admin.assetTypes.create,
      response: mockResponse.admin.assetTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_ASSET_TYPE },
      { type: actions.MANAGE_SAVE_ASSET_TYPE_SUCCESS, payload: mockResponse.admin.assetTypes.individualItem }
    ]
    return store.dispatch(actions.saveAssetType(mockRequest.admin.assetTypes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save asset types error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assetTypes.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.admin.assetTypes.create,
      response: mockResponse.admin.assetTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_ASSET_TYPE },
      { type: actions.MANAGE_SAVE_ASSET_TYPE_ERROR }
    ]
    return store.dispatch(actions.saveAssetType(mockRequest.admin.assetTypes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update asset types success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assetTypes.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.admin.assetTypes.create,
      response: mockResponse.admin.assetTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_ASSET_TYPE },
      { type: actions.MANAGE_UPDATE_ASSET_TYPE_SUCCESS, payload: mockResponse.admin.assetTypes.individualItem }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateAssetType(1, mockRequest.admin.assetTypes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update asset types error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assetTypes.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      request: mockRequest.admin.assetTypes.create,
      response: mockResponse.admin.assetTypes.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_ASSET_TYPE },
      { type: actions.MANAGE_UPDATE_ASSET_TYPE_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateAssetType(1, mockRequest.admin.assetTypes.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete asset types success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assetTypes.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 200,
      response: mockResponse.admin.assetTypes.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_ASSET_TYPE },
      { type: actions.MANAGE_DELETE_ASSET_TYPE_SUCCESS, payload: mockResponse.admin.assetTypes.deletedItem }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteAssetType(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete asset types error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assetTypes.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500,
      response: mockResponse.admin.assetTypes.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_ASSET_TYPE },
      { type: actions.MANAGE_DELETE_ASSET_TYPE_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteAssetType(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
