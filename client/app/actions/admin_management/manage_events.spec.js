/* global beforeEach describe it localStorage */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './manage_events'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('Action:AdminManagements:Manageevent', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch event success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.events.list,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      response: mockResponse.admin.events.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_EVENTS },
      { type: actions.MANAGE_FETCH_EVENTS_SUCCESS, payload: mockResponse.admin.events.list }
    ]
    return store.dispatch(actions.fetchEvents()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch event error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.events.list,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      response: mockResponse.admin.events.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_EVENTS },
      { type: actions.MANAGE_FETCH_EVENTS_ERROR }
    ]
    return store.dispatch(actions.fetchEvents()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual event success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.events.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.events.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_EVENT },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_EVENT_SUCCESS, payload: mockResponse.admin.events.individualItem }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualEvent(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual event error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.events.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.events.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_EVENT },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_EVENT_ERROR }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualEvent(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save event success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.events.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 201,
      request: mockRequest.admin.events.create,
      response: mockResponse.admin.events.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_EVENT },
      { type: actions.MANAGE_SAVE_EVENT_SUCCESS, payload: mockResponse.admin.events.individualItem }
    ]
    return store.dispatch(actions.saveEvent(mockRequest.admin.events.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save event error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.events.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.admin.events.create,
      response: mockResponse.admin.events.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_EVENT },
      { type: actions.MANAGE_SAVE_EVENT_ERROR }
    ]
    return store.dispatch(actions.saveEvent(mockRequest.admin.events.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update event success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.events.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.admin.events.create,
      response: mockResponse.admin.events.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_EVENT },
      { type: actions.MANAGE_UPDATE_EVENT_SUCCESS, payload: mockResponse.admin.events.individualItem }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateEvent(1, mockRequest.admin.events.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update event error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.events.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      request: mockRequest.admin.events.create,
      response: mockResponse.admin.events.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_EVENT },
      { type: actions.MANAGE_UPDATE_EVENT_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateEvent(1, mockRequest.admin.events.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete event success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.events.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 200,
      response: mockResponse.admin.events.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_EVENT },
      { type: actions.MANAGE_DELETE_EVENT_SUCCESS }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteEvent(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete event error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.events.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500,
      response: mockResponse.admin.events.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_EVENT },
      { type: actions.MANAGE_DELETE_EVENT_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteEvent(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
