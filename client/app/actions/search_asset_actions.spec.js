/* global beforeEach describe it localStorage */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './search_asset_actions'
import nock from 'nock'
import { expect } from 'chai'
import { userRole } from '../constants/defaultValues'
import fixtures from '../../../test/fixtures'
import nockGenerate from '../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action:SearchAsset', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch search asset success', () => {
    /* Ignore this test case due it access directly to state
    const { environment, mockHTTP, mockRequest, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.search,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      request: mockRequest.assets.search,
      response: mockResponse.assets.search
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SEARCH_ASSET, filters: mockRequest.assets.search },
      { type: actions.SEARCH_ASSET_SUCCESS, payload: mockResponse.assets.search }
    ]
    return store.dispatch(actions.fetchSearchAsset(mockRequest.assets.search)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
    */
  })

  it('Should handle fetch search asset error', () => {
    const { environment, mockHTTP, mockRequest, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.search,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.assets.search,
      response: mockResponse.assets.search
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SEARCH_ASSET, filters: mockRequest.assets.search },
      { type: actions.SEARCH_ASSET_ERROR }
    ]
    return store.dispatch(actions.fetchSearchAsset(mockRequest.assets.search)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle initate search', () => {
    const expectedActions = [
      {
        type: actions.SEARCH_ASSET_INIT, filters: {}
      }
    ]
    store.dispatch(actions.initiateSearch({}))
    expect(store.getActions()).to.deep.equal(expectedActions)
  })

  it('Should handle initialize filter from individual package', () => {
    const expectedActions = [
      {
        type: actions.INITIALIZE_FILTER_FROM_INDIVIDUAL_PACKAGE_VIEW,
        payload: []
      }
    ]
    store.dispatch(actions.initializeFilterFromIndividualPackage([]))
    expect(store.getActions()).to.deep.equal(expectedActions)
  })

  it('Should handle reset search filter for admin', () => {
    const expectedActions = [
      {
        type: actions.RESET_SEARCH_FILTER
      }
    ]
    store.dispatch(actions.resetSearchFilter(userRole.administrator))
    expect(store.getActions()).to.deep.equal(expectedActions)
  })

  it('Should handle reset search filter for sales person', () => {
    const expectedActions = [
      {
        type: actions.RESET_SALES_SEARCH_FILTER
      }
    ]
    store.dispatch(actions.resetSearchFilter(userRole.saleRepresentative))
    expect(store.getActions()).to.deep.equal(expectedActions)
  })

  it('Should handle toggle available asset', () => {
    const expectedActions = [
      {
        type: actions.TOGGLE_AVAILABLE_ASSET_FILTER
      }
    ]
    store.dispatch(actions.toggleAvailableAssetFilter())
    expect(store.getActions()).to.deep.equal(expectedActions)
  })

  it('Should handle fetching loading state', () => {
    const expectedActions = [
      {
        type: actions.SET_FETCHING_LOADING_STATE
      }
    ]
    store.dispatch(actions.setFetchingLoadingState())
    expect(store.getActions()).to.deep.equal(expectedActions)
  })
})
