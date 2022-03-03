/* global beforeEach describe it localStorage */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './manage_assets'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('Action:AdminManagements:Manageasset', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch asset success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assets.list,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      response: mockResponse.admin.assets.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_ASSETS },
      { type: actions.MANAGE_FETCH_ASSETS_SUCCESS, payload: mockResponse.admin.assets.list }
    ]
    return store.dispatch(actions.fetchAssets()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch asset error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assets.list,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      response: mockResponse.admin.assets.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_ASSETS },
      { type: actions.MANAGE_FETCH_ASSETS_ERROR }
    ]
    return store.dispatch(actions.fetchAssets()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual asset success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assets.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.assets.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_ASSET },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_ASSET_SUCCESS, payload: mockResponse.admin.assets.individualItem }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualAsset(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual asset error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assets.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.assets.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_ASSET },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_ASSET_ERROR }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualAsset(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save asset success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assets.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      request: mockRequest.admin.assets.create,
      response: mockResponse.admin.assets.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_ASSET },
      { type: actions.MANAGE_SAVE_ASSET_SUCCESS, payload: mockResponse.admin.assets.individualItem }
    ]
    return store.dispatch(actions.saveAsset(mockRequest.admin.assets.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save asset error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assets.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.admin.assets.create,
      response: mockResponse.admin.assets.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_ASSET },
      { type: actions.MANAGE_SAVE_ASSET_ERROR }
    ]
    return store.dispatch(actions.saveAsset(mockRequest.admin.assets.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update asset success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assets.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.admin.assets.create,
      response: mockResponse.admin.assets.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_ASSET },
      { type: actions.MANAGE_UPDATE_ASSET_SUCCESS, payload: mockResponse.admin.assets.individualItem }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateAsset(1, mockRequest.admin.assets.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update asset error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assets.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      request: mockRequest.admin.assets.create,
      response: mockResponse.admin.assets.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_ASSET },
      { type: actions.MANAGE_UPDATE_ASSET_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateAsset(1, mockRequest.admin.assets.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete asset success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assets.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 200,
      response: mockResponse.admin.assets.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_ASSET },
      { type: actions.MANAGE_DELETE_ASSET_SUCCESS }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteAsset(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete asset error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assets.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500,
      response: mockResponse.admin.assets.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_ASSET },
      { type: actions.MANAGE_DELETE_ASSET_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteAsset(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
