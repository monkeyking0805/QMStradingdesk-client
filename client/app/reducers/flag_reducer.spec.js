/* global describe it */

import flagReducer from './flag_reducer'
import * as types from '../actions/flag_actions'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'

describe('Reducer:Flag', () => {
  it('Should return initial state', () => {
    expect(flagReducer(undefined, {})).to.eql({
      isLoading: false,
      flagLanguages: [],
      flagCountries: [],
      flagTimezones: [],
      flagRegions: [],
      flagRoles: []
    })
  })

  it('Should handle fetch flag timezones', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_TIMEZONES,
        isLoading: true
      })
    ).to.eql({
      isLoading: true
    })
  })

  it('Should handle fetch flag timezones success', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_TIMEZONES_SUCCESS,
        isLoading: false,
        payload: fixtures.mockResponse.flags.timezones
      })
    ).to.eql({
      isLoading: false,
      flagTimezones: fixtures.mockResponse.flags.timezones
    })
  })

  it('Should handle fetch flag timezones error', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_TIMEZONES_ERROR,
        isLoading: false
      })
    ).to.eql({
      isLoading: false
    })
  })

  it('Should handle fetch flag countries', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_COUNTRIES,
        isLoading: true
      })
    ).to.eql({
      isLoading: true
    })
  })

  it('Should handle fetch flag countries success', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_COUNTRIES_SUCCESS,
        isLoading: false,
        payload: fixtures.mockResponse.flags.countries
      })
    ).to.eql({
      isLoading: false,
      flagCountries: fixtures.mockResponse.flags.countries
    })
  })

  it('Should handle fetch flag countries error', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_COUNTRIES_ERROR,
        isLoading: false
      })
    ).to.eql({
      isLoading: false
    })
  })

  it('Should handle fetch flag languages', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_LANGUAGES,
        isLoading: true
      })
    ).to.eql({
      isLoading: true
    })
  })

  it('Should handle fetch flag languages success', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_LANGUAGES_SUCCESS,
        isLoading: false,
        payload: fixtures.mockResponse.flags.languages
      })
    ).to.eql({
      isLoading: false,
      flagLanguages: fixtures.mockResponse.flags.languages
    })
  })

  it('Should handle fetch flag languages error', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_LANGUAGES_ERROR,
        isLoading: false
      })
    ).to.eql({
      isLoading: false
    })
  })

  it('Should handle fetch flag regions', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_REGIONS,
        isLoading: true
      })
    ).to.eql({
      isLoading: true
    })
  })

  it('Should handle fetch flag regions success', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_REGIONS_SUCCESS,
        isLoading: false,
        payload: fixtures.mockResponse.flags.regions
      })
    ).to.eql({
      isLoading: false,
      flagRegions: fixtures.mockResponse.flags.regions
    })
  })

  it('Should handle fetch flag regions error', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_REGIONS_ERROR,
        isLoading: false
      })
    ).to.eql({
      isLoading: false
    })
  })

  it('Should handle fetch flag roles', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_USER_ROLES,
        isLoading: true
      })
    ).to.eql({
      isLoading: true
    })
  })

  it('Should handle fetch flag roles success', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_USER_ROLES_SUCCESS,
        isLoading: false,
        payload: fixtures.mockResponse.flags.roles
      })
    ).to.eql({
      isLoading: false,
      flagRoles: fixtures.mockResponse.flags.roles
    })
  })

  it('Should handle fetch flag roles error', () => {
    expect(
      flagReducer([], {
        type: types.FETCH_FLAG_USER_ROLES_ERROR,
        isLoading: false
      })
    ).to.eql({
      isLoading: false
    })
  })
})
