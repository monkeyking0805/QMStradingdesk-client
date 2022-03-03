/* global beforeEach describe it localStorage */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './manage_venues'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('Action:AdminManagements:Managevenue', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch venue success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.venues.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.venues.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_VENUES },
      { type: actions.MANAGE_FETCH_VENUES_SUCCESS, payload: mockResponse.admin.venues.list }
    ]
    return store.dispatch(actions.fetchVenues()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch venue error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.venues.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.venues.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_VENUES },
      { type: actions.MANAGE_FETCH_VENUES_ERROR }
    ]
    return store.dispatch(actions.fetchVenues()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual venue success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.venues.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.venues.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_VENUE },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_VENUE_SUCCESS, payload: mockResponse.admin.venues.individualItem }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualVenue(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual venue error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.venues.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.venues.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_VENUE },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_VENUE_ERROR }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualVenue(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save venue  success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.venues.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      request: mockRequest.admin.venues.create,
      response: mockResponse.admin.venues.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_VENUE },
      { type: actions.MANAGE_SAVE_VENUE_SUCCESS, payload: mockResponse.admin.venues.individualItem }
    ]
    return store.dispatch(actions.saveVenue(mockRequest.admin.venues.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save venue error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.venues.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.admin.venues.create,
      response: mockResponse.admin.venues.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_VENUE },
      { type: actions.MANAGE_SAVE_VENUE_ERROR }
    ]
    return store.dispatch(actions.saveVenue(mockRequest.admin.venues.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update venue success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.venues.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.admin.venues.create,
      response: mockResponse.admin.venues.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_VENUE },
      { type: actions.MANAGE_UPDATE_VENUE_SUCCESS, payload: mockResponse.admin.venues.individualItem }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateVenue(1, mockRequest.admin.venues.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update venue error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.venues.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      request: mockRequest.admin.venues.create,
      response: mockResponse.admin.venues.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_VENUE },
      { type: actions.MANAGE_UPDATE_VENUE_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateVenue(1, mockRequest.admin.venues.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete venue  success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.venues.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 200,
      response: mockResponse.admin.venues.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_VENUE },
      { type: actions.MANAGE_DELETE_VENUE_SUCCESS, payload: mockResponse.admin.venues.deletedItem }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteVenue(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete venue  error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.venues.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500,
      response: mockResponse.admin.venues.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_VENUE },
      { type: actions.MANAGE_DELETE_VENUE_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteVenue(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
