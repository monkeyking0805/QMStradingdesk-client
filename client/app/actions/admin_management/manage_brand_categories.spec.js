/* global beforeEach describe it localStorage */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './manage_brand_categories'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('Action:AdminManagements:ManagebrandCategory', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch brandCategory success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.brandCategories.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.brandCategories.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_BRAND_CATEGORIES },
      { type: actions.MANAGE_FETCH_BRAND_CATEGORIES_SUCCESS, payload: mockResponse.admin.brandCategories.list }
    ]
    return store.dispatch(actions.fetchBrandCategories()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch brandCategory error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.brandCategories.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.brandCategories.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_BRAND_CATEGORIES },
      { type: actions.MANAGE_FETCH_BRAND_CATEGORIES_ERROR }
    ]
    return store.dispatch(actions.fetchBrandCategories()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual brandCategory success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.brandCategories.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.brandCategories.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY_SUCCESS, payload: mockResponse.admin.brandCategories.individualItem }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualBrandCategory(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual brandCategory error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.brandCategories.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.brandCategories.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_BRAND_CATEGORY_ERROR }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualBrandCategory(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save brandCategory  success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.brandCategories.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      request: mockRequest.admin.brandCategories.create,
      response: mockResponse.admin.brandCategories.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_BRAND_CATEGORY },
      { type: actions.MANAGE_SAVE_BRAND_CATEGORY_SUCCESS, payload: mockResponse.admin.brandCategories.individualItem }
    ]
    return store.dispatch(actions.saveBrandCategory(mockRequest.admin.brandCategories.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save brandCategory error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.brandCategories.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.admin.brandCategories.create,
      response: mockResponse.admin.brandCategories.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_BRAND_CATEGORY },
      { type: actions.MANAGE_SAVE_BRAND_CATEGORY_ERROR }
    ]
    return store.dispatch(actions.saveBrandCategory(mockRequest.admin.brandCategories.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update brandCategory success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.brandCategories.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.admin.brandCategories.create,
      response: mockResponse.admin.brandCategories.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_BRAND_CATEGORY },
      { type: actions.MANAGE_UPDATE_BRAND_CATEGORY_SUCCESS, payload: mockResponse.admin.brandCategories.individualItem }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateBrandCategory(1, mockRequest.admin.brandCategories.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update brandCategory error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.brandCategories.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      request: mockRequest.admin.brandCategories.create,
      response: mockResponse.admin.brandCategories.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_BRAND_CATEGORY },
      { type: actions.MANAGE_UPDATE_BRAND_CATEGORY_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateBrandCategory(1, mockRequest.admin.brandCategories.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete brandCategory  success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.brandCategories.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 200,
      response: mockResponse.admin.brandCategories.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_BRAND_CATEGORY },
      { type: actions.MANAGE_DELETE_BRAND_CATEGORY_SUCCESS }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteBrandCategory(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete brandCategory  error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.brandCategories.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500,
      response: mockResponse.admin.brandCategories.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_BRAND_CATEGORY },
      { type: actions.MANAGE_DELETE_BRAND_CATEGORY_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteBrandCategory(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
