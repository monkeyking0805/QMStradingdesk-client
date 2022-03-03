/* global beforeEach describe it */

import React from 'react'
import LoginForm from './LoginForm'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Field } from 'redux-form'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import sinon from 'sinon'
import { BrowserRouter as Router } from 'react-router-dom'

const mockStore = configureStore([])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:Auth:LoginForm', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render LoginForm component', () => {
    generateComponent().mount()
  })

  it('Should render login form', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.exists('form')).to.equal(true)
    expect(wrapper.find(Field)).to.have.length(2)
  })

  it('Should render loading while user submitting form login', () => {

  })

  it('Should handle onSubmit when submit form', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit }).mount()
    wrapper.find('button').simulate('click')
    expect(handleSubmit.called).to.be.equal(true)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <Router>
        <I18nextProvider i18n={i18n}>
          <LoginForm {...props} />
        </I18nextProvider>
      </Router>
    </Provider>
  )
}
