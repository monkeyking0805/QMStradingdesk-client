/* global beforeEach describe it localStorage */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './manage_clubs'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('Action:AdminManagements:Manageclub', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch club success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.clubs.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.clubs.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_CLUBS },
      { type: actions.MANAGE_FETCH_CLUBS_SUCCESS, payload: mockResponse.admin.clubs.list }
    ]
    return store.dispatch(actions.fetchClubs()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch club error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.clubs.list,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.clubs.list
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_CLUBS },
      { type: actions.MANAGE_FETCH_CLUBS_ERROR }
    ]
    return store.dispatch(actions.fetchClubs()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual club success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.clubs.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.admin.clubs.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CLUB },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CLUB_SUCCESS, payload: mockResponse.admin.clubs.individualItem }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualClub(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch individual club error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.clubs.individual,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.admin.clubs.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CLUB },
      { type: actions.MANAGE_FETCH_INDIVIDUAL_CLUB_ERROR }
    ]
    // Mock id as 1
    return store.dispatch(actions.fetchIndividualClub(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save club  success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.clubs.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 201,
      request: mockRequest.admin.clubs.create,
      response: mockResponse.admin.clubs.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_CLUB },
      { type: actions.MANAGE_SAVE_CLUB_SUCCESS, payload: mockResponse.admin.clubs.individualItem }
    ]
    return store.dispatch(actions.saveClub(mockRequest.admin.clubs.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle save club error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.clubs.create,
      method: mockHTTP.httpMethod.post,
      statusCode: 500,
      request: mockRequest.admin.clubs.create,
      response: mockResponse.admin.clubs.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_SAVE_CLUB },
      { type: actions.MANAGE_SAVE_CLUB_ERROR }
    ]
    return store.dispatch(actions.saveClub(mockRequest.admin.clubs.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update club success', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.clubs.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 200,
      request: mockRequest.admin.clubs.create,
      response: mockResponse.admin.clubs.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_CLUB },
      { type: actions.MANAGE_UPDATE_CLUB_SUCCESS, payload: mockResponse.admin.clubs.individualItem }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateClub(1, mockRequest.admin.clubs.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle update club error', () => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.clubs.update,
      method: mockHTTP.httpMethod.put,
      statusCode: 500,
      request: mockRequest.admin.clubs.create,
      response: mockResponse.admin.clubs.individualItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_UPDATE_CLUB },
      { type: actions.MANAGE_UPDATE_CLUB_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.updateClub(1, mockRequest.admin.clubs.create)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete club success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.clubs.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 200,
      response: mockResponse.admin.clubs.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_CLUB },
      { type: actions.MANAGE_DELETE_CLUB_SUCCESS }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteClub(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle delete club error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.clubs.delete,
      method: mockHTTP.httpMethod.delete,
      statusCode: 500,
      response: mockResponse.admin.clubs.deletedItem
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.MANAGE_DELETE_CLUB },
      { type: actions.MANAGE_DELETE_CLUB_ERROR }
    ]
    // Mock ID as 1
    return store.dispatch(actions.deleteClub(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
