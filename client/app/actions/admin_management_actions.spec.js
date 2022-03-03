/* global beforeEach describe it localStorage */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './admin_management_actions'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'
import nockGenerate from '../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('Action:AdminManagements', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch asset unit success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.getAssetUnits,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.assetUnit.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_ASSETS_UNIT },
      { type: actions.FETCH_ASSETS_UNIT_SUCCESS, payload: mockResponse.admin.assetUnit.list }
    ]
    return store.dispatch(actions.fetchAssetUnits()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch asset unit error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.getAssetUnits,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.assetUnit.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_ASSETS_UNIT },
      { type: actions.FETCH_ASSETS_UNIT_ERROR }
    ]
    return store.dispatch(actions.fetchAssetUnits()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual asset unit success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.getIndividualAssetUnit,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.assetUnit.individualAsset
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_INDIVIDUAL_ASSETS_UNIT },
      { type: actions.FETCH_INDIVIDUAL_ASSETS_UNIT_SUCCESS, payload: mockResponse.admin.assetUnit.individualAsset }
    ]
    // Mock ID as 1010
    return store.dispatch(actions.fetchIndividualAssetUnits(1010)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual asset unit error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.getIndividualAssetUnit,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.assetUnit.individualAsset
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_INDIVIDUAL_ASSETS_UNIT },
      { type: actions.FETCH_INDIVIDUAL_ASSETS_UNIT_ERROR }
    ]
    // Mock ID as 1010
    return store.dispatch(actions.fetchIndividualAssetUnits(1010)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save asset unit success', () => {
    const { environment, mockHTTP, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.createAssetUnits,
      method: mockHTTP.httpMethod.post,
      statusCode: 201,
      response: mockRequest.admin.assetUnit.create
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SAVE_ASSETS_UNIT },
      { type: actions.SAVE_ASSETS_UNIT_SUCCESS, payload: mockRequest.admin.assetUnit.create }
    ]
    return store.dispatch(actions.saveAssetUnit(mockRequest.admin.assetUnit.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save asset unit error', () => {
    const { environment, mockHTTP, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.createAssetUnits,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      response: mockRequest.admin.assetUnit.create
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SAVE_ASSETS_UNIT },
      { type: actions.SAVE_ASSETS_UNIT_ERROR }
    ]
    return store.dispatch(actions.saveAssetUnit(mockRequest.admin.assetUnit.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update asset unit success', () => {
    const { environment, mockHTTP, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.updateIndividualAssetUnit,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      response: mockRequest.admin.assetUnit.create
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.UPDATE_ASSETS_UNIT },
      { type: actions.UPDATE_ASSETS_UNIT_SUCCESS, payload: mockRequest.admin.assetUnit.create }
    ]
    return store.dispatch(actions.updateAssetUnit(1010, mockRequest.admin.assetUnit.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update asset unit error', () => {
    const { environment, mockHTTP, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.updateIndividualAssetUnit,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      response: mockRequest.admin.assetUnit.create
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.UPDATE_ASSETS_UNIT },
      { type: actions.UPDATE_ASSETS_UNIT_ERROR }
    ]
    return store.dispatch(actions.updateAssetUnit(1010, mockRequest.admin.assetUnit.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete asset unit success', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.deleteIndividualAssetUnit,
      method: mockHTTP.httpMethod.delete,
      statusCode: 200
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.DELETE_ASSETS_UNIT },
      { type: actions.DELETE_ASSETS_UNIT_SUCCESS }
    ]
    return store.dispatch(actions.deleteAssetUnit(1010)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete asset unit error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.deleteIndividualAssetUnit,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.DELETE_ASSETS_UNIT },
      { type: actions.DELETE_ASSETS_UNIT_ERROR }
    ]
    return store.dispatch(actions.deleteAssetUnit(1010)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
