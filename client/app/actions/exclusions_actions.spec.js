/* global beforeEach describe it localStorage */

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './exclusions_actions'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'
import nockGenerate from '../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action:Exclusion', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch exclusions success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.filterbyClubList,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.exclusions.filterByClublist
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_EXCLUSIONS },
      { type: actions.FETCH_EXCLUSIONS_SUCCESS, payload: mockResponse.exclusions.filterByClublist }
    ]
    return store.dispatch(actions.fetchExclusions(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch exclusions error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.filterbyClubList,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.exclusions.filterByClublist
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_EXCLUSIONS },
      { type: actions.FETCH_EXCLUSIONS_ERROR }
    ]
    return store.dispatch(actions.fetchExclusions(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save exclusion success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.createExclusions,
      method: mockHTTP.httpMethod.post,
      statusCode: 201,
      response: mockResponse.exclusions.createdExclusion,
      request: mockRequest.exclusions.createExclusion
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SAVE_EXCLUSION },
      { type: actions.SAVE_EXCLUSION_SUCCESS, payload: mockResponse.exclusions.createdExclusion }
    ]
    return store.dispatch(actions.saveExclusion(mockRequest.exclusions.createExclusion)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save exclusion error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.createExclusions,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      response: mockResponse.exclusions.createdExclusion,
      request: mockRequest.exclusions.createExclusion
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.SAVE_EXCLUSION },
      { type: actions.SAVE_EXCLUSION_ERROR }
    ]
    return store.dispatch(actions.saveExclusion(mockRequest.exclusions.createExclusion)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch filter exclusions success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.filteredExclusion,
      method: mockHTTP.httpMethod.post,
      statusCode: 201,
      response: mockResponse.exclusions.filteredList,
      request: mockRequest.exclusions.filteredExclusion
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_FILTER_EXCLUSIONS },
      { type: actions.FETCH_FILTER_EXCLUSIONS_SUCCESS, payload: mockResponse.exclusions.filteredList }
    ]
    return store.dispatch(actions.fetchFilterExclusions({}, mockRequest.exclusions.filteredExclusion)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch filter exclusions error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.filteredExclusion,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      response: mockResponse.exclusions.filteredList,
      request: mockRequest.exclusions.filteredExclusion
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_FILTER_EXCLUSIONS },
      { type: actions.FETCH_FILTER_EXCLUSIONS_ERROR }
    ]
    return store.dispatch(actions.fetchFilterExclusions({}, mockRequest.exclusions.filteredExclusion)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete exclusion success', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.deleteExclusion,
      method: mockHTTP.httpMethod.delete,
      statusCode: 200,
      response: {}
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.DELETE_EXCLUSION },
      { type: actions.DELETE_EXCLUSION_SUCCESS }
    ]
    return store.dispatch(actions.deleteExclusion(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete exclusion error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.deleteExclusion,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500,
      response: {}
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.DELETE_EXCLUSION },
      { type: actions.DELETE_EXCLUSION_ERROR }
    ]
    return store.dispatch(actions.deleteExclusion(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update exclusion success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.updateExclusion,
      method: mockHTTP.httpMethod.put,
      statusCode: 201,
      response: mockResponse.exclusions.createdExclusion,
      request: mockRequest.exclusions.createExclusion
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.UPDATE_EXCLUSION },
      { type: actions.UPDATE_EXCLUSION_SUCCESS, payload: mockResponse.exclusions.createdExclusion }
    ]
    return store.dispatch(actions.updateExclusion(1, mockRequest.exclusions.createExclusion)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update exclusion error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.updateExclusion,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      response: mockResponse.exclusions.createdExclusion,
      request: mockRequest.exclusions.createExclusion
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.UPDATE_EXCLUSION },
      { type: actions.UPDATE_EXCLUSION_ERROR }
    ]
    return store.dispatch(actions.updateExclusion(1, mockRequest.exclusions.createExclusion)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle validate exclusion success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.validateExclusion,
      method: mockHTTP.httpMethod.post,
      statusCode: 201,
      response: mockResponse.exclusions.validateExclusion,
      request: mockRequest.exclusions.validateExclusion
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.VALIDATE_IMPORT_CSV },
      { type: actions.VALIDATE_IMPORT_CSV_SUCCESS, payload: mockResponse.exclusions.validateExclusion }
    ]
    return store.dispatch(actions.validateImportCSV(mockRequest.exclusions.validateExclusion)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle validate exclusion error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.exclusions.validateExclusion,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      response: mockResponse.exclusions.validateExclusion,
      request: mockRequest.exclusions.validateExclusion
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.VALIDATE_IMPORT_CSV },
      { type: actions.VALIDATE_IMPORT_CSV_ERROR }
    ]
    return store.dispatch(actions.validateImportCSV(mockRequest.exclusions.validateExclusion)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle reset validate exclusion ', () => {
    const expectedActions = [
      { type: actions.RESET_VALIDATE_IMPORT }
    ]
    return store.dispatch(actions.resetValidateImport()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
