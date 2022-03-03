/* global beforeEach describe it */

import React from 'react'
import PackageView from './PackageView'
import { mount } from 'enzyme'
// import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:PackageView', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render PackageView component', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })

  it('Should display loading while it fetching booking', () => {
    // Will update later
  })

  it('Should show error message content if their have no assets in booking', () => {
    // Will update later
  })

  it('Should display correct content if their have no error', () => {
    // Will update later
  })

  it('Should show `Save` button if admin fetched individual booking and booking status is `Pending`', () => {
    // Will update later
  })

  it('Should show `Save` button if admin fetched individual booking and booking status is `Confirmed`', () => {
    // Will update later
  })

  it('Should hide `Save` button if sales person fetched individual booking and booking status is `Pending`', () => {
    // Will update later
  })

  it('Should hide `Save` button if sales person fetched individual booking and booking status is `Confirmed`', () => {
    // Will update later
  })

  it('Should show `Submit` button if user generate new booking for both user role', () => {
    // Will update later
  })

  it('Should hide `Submit` button if sales person fetched individual booking and booking status is `Pending`', () => {
    // Will update later
  })

  it('Should hide `Submit` button if sales person fetched individual booking and booking status is `Confirmed`', () => {
    // Will update later
  })

  it('Should show `Submit` button if admin fetched individual booking and booking status is `Draft`', () => {
    // Will update later
  })

  it('Should show `Submit` button if sales person fetched individual booking and booking status is `Draft`', () => {
    // Will update later
  })

  it('Should show `Confirm` button if admin fetched individual booking and booking status is `Pending`', () => {
    // Will update later
  })

  it('Should disabled `Confirm button` if their any selected asset quantity more than available', () => {
    // Will update later
  })

  it('Should display status bar if booking status is `Draft`, `Pending`, `Confirmed`', () => {
    // Will update later
  })

  it('Should hide status bar if booking status is create new', () => {
    // Will update later
  })

  it('Should hide `Cancel Schedule` if login as sales person and booking status is `Confirm`', () => {
    // Will update later
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <PackageView {...props} match={{ params: { packageID: undefined } }} />
      </I18nextProvider>
    </Provider>
  )
}
