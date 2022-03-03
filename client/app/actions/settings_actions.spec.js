/* global beforeEach describe it */
import * as actions from './settings_actions'
import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action:Settings', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    done()
  })
  it('Should handle change locale', () => {
    const locale = 'en'
    const expectedAction = [
      {
        type: actions.CHANGE_LOCALE,
        payload: locale
      }
    ]
    store.dispatch(actions.changeLocale(locale))
    expect(store.getActions()).to.deep.equal(expectedAction)
  })
})
