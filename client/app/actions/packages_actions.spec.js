/* global beforeEach describe it localStorage */

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './packages_actions'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'
import nockGenerate from '../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action:Packages', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle submit package success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.submitPackage,
      method: mockHTTP.httpMethod.post,
      statusCode: 201,
      request: mockRequest.package.create,
      response: mockResponse.package.createdPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SUBMIT_PACKAGE },
      { type: actions.SUBMIT_PACKAGE_SUCCESS, payload: mockRequest.package.create }
    ]
    return store.dispatch(actions.submitPackage(mockRequest.package.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle submit package error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.submitPackage,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.package.create,
      response: mockResponse.package.createdPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SUBMIT_PACKAGE },
      { type: actions.SUBMIT_PACKAGE_ERROR }
    ]
    return store.dispatch(actions.submitPackage(mockRequest.package.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle submit update package success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.submitUpdatePackage,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.package.create,
      response: mockResponse.package.createdPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SUBMIT_UPDATE_PACKAGE },
      { type: actions.SUBMIT_UPDATE_PACKAGE_SUCCESS, payload: mockRequest.package.create }
    ]
    // Mock id as 1
    return store.dispatch(actions.submitUpdatePackage(1, mockRequest.package.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle submit update pacakge error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.submitUpdatePackage,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      request: mockRequest.package.create,
      response: mockResponse.package.createdPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SUBMIT_UPDATE_PACKAGE },
      { type: actions.SUBMIT_UPDATE_PACKAGE_ERROR }
    ]
    // Mock id as 1
    return store.dispatch(actions.submitUpdatePackage(1, mockRequest.package.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update package success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.updatePackage,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.package.create,
      response: mockResponse.package.createdPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.UPDATE_PACKAGE },
      { type: actions.UPDATE_PACKAGE_SUCCESS, payload: mockRequest.package.create }
    ]
    // Mock id as 1
    return store.dispatch(actions.updatePackage(1, mockRequest.package.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update package error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.updatePackage,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      request: mockRequest.package.create,
      response: mockResponse.package.createdPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.UPDATE_PACKAGE },
      { type: actions.UPDATE_PACKAGE_ERROR }
    ]
    // Mock id as 1
    return store.dispatch(actions.updatePackage(1, mockRequest.package.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle confirm package success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.confirmPackage,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.package.create,
      response: mockResponse.package.createdPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.CONFIRM_PACKAGE },
      { type: actions.CONFIRM_PACKAGE_SUCCESS, payload: mockRequest.package.create }
    ]
    // Mock id as 1
    return store.dispatch(actions.confirmPacakge(1, mockRequest.package.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle confirm package error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.confirmPackage,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      request: mockRequest.package.create,
      response: mockResponse.package.createdPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.CONFIRM_PACKAGE },
      { type: actions.CONFIRM_PACKAGE_ERROR }
    ]
    // Mock id as 1
    return store.dispatch(actions.confirmPacakge(1, mockRequest.package.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save packages success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.savePackages,
      method: mockHTTP.httpMethod.post,
      statusCode: 201,
      request: mockRequest.package.create,
      response: mockResponse.package.createdPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SAVE_PACKAGE },
      { type: actions.SAVE_PACKAGE_SUCCESS, payload: mockRequest.package.create }
    ]
    return store.dispatch(actions.savePackage(mockRequest.package.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save packages error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.savePackages,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.package.create,
      response: mockResponse.package.createdPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SAVE_PACKAGE },
      { type: actions.SAVE_PACKAGE_ERROR }
    ]
    return store.dispatch(actions.savePackage(mockRequest.package.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle cancel package success', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.delIndividualPackage,
      method: mockHTTP.httpMethod.delete,
      statusCode: 200
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.CANCEL_PACKAGE },
      { type: actions.CANCEL_PACKAGE_SUCCESS }
    ]
    // Using Mock ID as 1
    return store.dispatch(actions.cancelPackage(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle cancel package error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.delIndividualPackage,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.CANCEL_PACKAGE },
      { type: actions.CANCEL_PACKAGE_ERROR }
    ]
    // Using Mock ID as 1
    return store.dispatch(actions.cancelPackage(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch packages success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.getPackages,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.package.packageList
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_PACKAGES },
      { type: actions.FETCH_PACKAGES_SUCCESS, payload: mockResponse.package.packageList }
    ]
    return store.dispatch(actions.fetchPackages()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch packages error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.getPackages,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.package.packageList
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_PACKAGES },
      { type: actions.FETCH_PACKAGES_ERROR }
    ]
    return store.dispatch(actions.fetchPackages()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual package success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.getIndividualPackage,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.package.individualPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_INDIVIDUAL_PACKAGE },
      { type: actions.FETCH_INDIVIDUAL_PACKAGE_SUCCESS, payload: mockResponse.package.individualPackage }
    ]
    // Using Mock ID as 1
    return store.dispatch(actions.fetchIndividualPackage(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual package error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.getIndividualPackage,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.package.individualPackage
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_INDIVIDUAL_PACKAGE },
      { type: actions.FETCH_INDIVIDUAL_PACKAGE_ERROR }
    ]
    // Using Mock ID as 1
    return store.dispatch(actions.fetchIndividualPackage(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle reset view package', () => {
    const expectedActions = [
      { type: actions.RESET_VIEW_PACKAGE }
    ]
    store.dispatch(actions.resetViewPackage())
    expect(store.getActions()).to.deep.equal(expectedActions)
  })

  it('Should handle initialize brand categories from filters', () => {
    const expectedActions = [
      { type: actions.INITIALIZE_BRANDCATEGORIES_FROM_FILTERS, payload: [] }
    ]
    store.dispatch(actions.initializeBrandCategoriesFromFilters([]))
    expect(store.getActions()).to.deep.equal(expectedActions)
  })

  it('Should handle modify from individual package', () => {

  })
})
