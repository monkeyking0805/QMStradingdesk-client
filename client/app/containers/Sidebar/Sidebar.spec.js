/* global beforeEach describe it */

import React from 'react'
import Sidebar from './index'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import { MemoryRouter } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:Sidebar', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render Sidebar component', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })

  it('Should render main menu correctly', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find('.main-menu').find(Nav).length).to.equal(1)
    expect(wrapper.find('.main-menu').find(Nav).find(NavItem).length).to.equal(4)
  })

  it('Should render sub main menu correctly', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find('.sub-menu').find(Nav).length).to.equal(1)
    expect(wrapper.find('.sub-menu').find(Nav).find(NavItem).length).to.equal(13)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <MemoryRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Sidebar {...props} />
        </I18nextProvider>
      </Provider>
    </MemoryRouter>
  )
}
