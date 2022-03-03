/* global describe it */
import { createStore } from 'redux'
import rootReducer from './index'
import { expect } from 'chai'

describe('Reducer:Store', () => {
  it('Should create initialize reducer store', () => {
    const store = createStore(rootReducer, {})
    expect(store).to.be.an('object')
  })
})
