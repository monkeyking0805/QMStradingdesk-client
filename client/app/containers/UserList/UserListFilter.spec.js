/* global beforeEach describe it */

import React from 'react'
import UserListFilter from './UserListFilter'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

let wrapper
const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Components:UserListFilter', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <UserListFilter />
        </I18nextProvider>
      </Provider>
    )
  })

  it('Should render UserListFilter component', () => {
    wrapper.mount()
  })
})
