/* global beforeEach describe it localStorage */

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './flag_actions'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action:Flag', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })

  it('Should handle fetch flag timezones success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    generateMockFlag(environment.clientUri, mockHTTP.mockURI.flag.timezones, 'success', mockResponse.flags.timezones)
    const expectedActions = [
      { type: actions.FETCH_FLAG_TIMEZONES },
      {
        type: actions.FETCH_FLAG_TIMEZONES_SUCCESS,
        payload: mockResponse.flags.timezones
      }
    ]
    return store.dispatch(actions.fetchFlagTimezones()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch flag timezones error', () => {
    const { environment, mockHTTP } = fixtures
    generateMockFlag(environment.clientUri, mockHTTP.mockURI.flag.timezones, 'error')
    const expectedActions = [
      { type: actions.FETCH_FLAG_TIMEZONES },
      { type: actions.FETCH_FLAG_TIMEZONES_ERROR }
    ]
    return store.dispatch(actions.fetchFlagTimezones()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch flag languages success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    generateMockFlag(environment.clientUri, mockHTTP.mockURI.flag.languages, 'success', mockResponse.flags.languages)
    const expectedActions = [
      { type: actions.FETCH_FLAG_LANGUAGES },
      {
        type: actions.FETCH_FLAG_LANGUAGES_SUCCESS,
        payload: mockResponse.flags.languages
      }
    ]
    return store.dispatch(actions.fetchFlagLanguages()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch flag languages error', () => {
    const { environment, mockHTTP } = fixtures
    generateMockFlag(environment.clientUri, mockHTTP.mockURI.flag.languages, 'error')
    const expectedActions = [
      { type: actions.FETCH_FLAG_LANGUAGES },
      { type: actions.FETCH_FLAG_LANGUAGES_ERROR }
    ]
    return store.dispatch(actions.fetchFlagLanguages()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch flag roles success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    generateMockFlag(environment.clientUri, mockHTTP.mockURI.flag.roles, 'success', mockResponse.flags.roles)
    const expectedActions = [
      { type: actions.FETCH_FLAG_USER_ROLES },
      {
        type: actions.FETCH_FLAG_USER_ROLES_SUCCESS,
        payload: mockResponse.flags.roles
      }
    ]
    return store.dispatch(actions.fetchFlagUserRoles()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch flag roles error', () => {
    const { environment, mockHTTP } = fixtures
    generateMockFlag(environment.clientUri, mockHTTP.mockURI.flag.roles, 'error')
    const expectedActions = [
      { type: actions.FETCH_FLAG_USER_ROLES },
      { type: actions.FETCH_FLAG_USER_ROLES_ERROR }
    ]
    return store.dispatch(actions.fetchFlagUserRoles()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch flag countries success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    generateMockFlag(environment.clientUri, mockHTTP.mockURI.flag.countries, 'success', mockResponse.flags.countries)
    const expectedActions = [
      { type: actions.FETCH_FLAG_COUNTRIES },
      {
        type: actions.FETCH_FLAG_COUNTRIES_SUCCESS,
        payload: mockResponse.flags.countries
      }
    ]
    return store.dispatch(actions.fetchFlagCountries()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch flag countries error', () => {
    const { environment, mockHTTP } = fixtures
    generateMockFlag(environment.clientUri, mockHTTP.mockURI.flag.countries, 'error')
    const expectedActions = [
      { type: actions.FETCH_FLAG_COUNTRIES },
      { type: actions.FETCH_FLAG_COUNTRIES_ERROR }
    ]
    return store.dispatch(actions.fetchFlagCountries()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch flag regions success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    generateMockFlag(environment.clientUri, mockHTTP.mockURI.flag.regions, 'success', mockResponse.flags.regions)
    const expectedActions = [
      { type: actions.FETCH_FLAG_REGIONS },
      {
        type: actions.FETCH_FLAG_REGIONS_SUCCESS,
        payload: mockResponse.flags.regions
      }
    ]
    return store.dispatch(actions.fetchFlagRegions()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch flag regions error', () => {
    const { environment, mockHTTP } = fixtures
    generateMockFlag(environment.clientUri, mockHTTP.mockURI.flag.regions, 'error')
    const expectedActions = [
      { type: actions.FETCH_FLAG_REGIONS },
      { type: actions.FETCH_FLAG_REGIONS_ERROR }
    ]
    return store.dispatch(actions.fetchFlagRegions()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})

const generateMockFlag = (mockURI, mockPath, mockType, mockResponse = {}) => {
  const { mockHTTP } = fixtures
  nock(mockURI)
    .defaultReplyHeaders(mockHTTP.mockReplyHeader)
    .options(mockPath)
    .reply(200)
  if (mockType === 'error') {
    nock(mockURI)
      .defaultReplyHeaders(mockHTTP.mockReplyHeader)
      .get(mockPath)
      .reply(500)
  } else {
    nock(mockURI)
      .defaultReplyHeaders(mockHTTP.mockReplyHeader)
      .get(mockPath)
      .reply(200, mockResponse)
  }
}
