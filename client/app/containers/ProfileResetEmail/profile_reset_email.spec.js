/* global describe it */

import React from 'react'
import ProfileResetEmail from './profile_reset_email'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import { expect } from 'chai'
import { Field } from 'redux-form'

const mockStore = configureStore([thunk])
const store = mockStore({})

describe('Containers:setting:profile_reset_email', () => {
  it('Should render ProfileResetEmail component without crashing', () => {
    const props = { match: { params: { } } }
    const wrapper = generateComponent(props)
    wrapper.mount()
  })
  it('Should render profile reset email form', () => {
    const props = { match: { params: { } } }
    const wrapper = generateComponent(props)
    expect(wrapper.exists('form')).to.equal(true)
    expect(wrapper.find(Field)).to.have.length(1)
  })

  // Don't forget to add simulator test while design finish #
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ProfileResetEmail {...props} />
      </I18nextProvider>
    </Provider>
  )
}
