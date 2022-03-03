/* global beforeEach describe it */
import React from 'react'
import ManageVenuesNavbar from './ManageVenuesNavbar'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import { Button } from 'reactstrap'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageVenues:ManageVenuesNavbar', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ManageVenuesNavbar component', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })

  it('Should render add new asset button', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find(Button).length).to.equal(1)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ManageVenuesNavbar />
      </I18nextProvider>
    </Provider>
  )
}
