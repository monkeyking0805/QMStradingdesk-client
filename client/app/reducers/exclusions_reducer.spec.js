/* global describe it */

import exclusionReducer from './exclusions_reducer'
import * as types from '../actions/exclusions_actions'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'

describe('Reducer:Exclusions', () => {
  it('Should return initial state', () => {
    expect(exclusionReducer(undefined, {})).to.eql(fixtures.client.reduxState.exclusions)
  })

  it('Should handle fetch exclusion', () => {
    expect(
      exclusionReducer([], {
        type: types.FETCH_EXCLUSIONS
      })
    ).to.eql({
      isLoading: true
    })
  })

  it('Should handle fetch exclusion success', () => {
    expect(
      exclusionReducer([], {
        type: types.FETCH_EXCLUSIONS_SUCCESS,
        payload: []
      })
    ).to.eql({
      isLoading: false,
      exclusionList: []
    })
  })

  it('Should handle fetch exclusion error', () => {
    expect(
      exclusionReducer([], {
        type: types.FETCH_EXCLUSIONS_ERROR
      })
    ).to.eql({
      isLoading: false
    })
  })
})
