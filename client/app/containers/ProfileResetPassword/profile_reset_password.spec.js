/* global describe it */

import React from 'react'
import ProfileResetPassword from './profile_reset_password'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Field } from 'redux-form'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import { expect } from 'chai'
const mockStore = configureStore([thunk])
const store = mockStore({})

describe('Containers:setting:profile_reset_password', () => {
  it('Should render ProfileResetPassword component without crashing', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })
  it('Should render profile reset password form', () => {
    const wrapper = generateComponent()
    expect(wrapper.exists('form')).to.equal(true)
    expect(wrapper.find(Field)).to.have.length(3)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ProfileResetPassword {...props} />
      </I18nextProvider>
    </Provider>
  )
}
