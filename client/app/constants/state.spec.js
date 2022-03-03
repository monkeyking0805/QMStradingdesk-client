/* global describe it */
import { expect } from 'chai'
import * as state from './state'

describe('Constants:state', () => {
  it('Should export booking steate', () => {
    expect(state.bookingState).to.not.equal(null)
  })
})
