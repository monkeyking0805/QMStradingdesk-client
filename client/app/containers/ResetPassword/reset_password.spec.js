/* global describe it */

import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { expect } from 'chai'
import { I18nextProvider } from 'react-i18next'
import ResetPassword from './reset_password'
import i18n from '../../i18n/i18n'
import fixtures from '../../../../test/fixtures'
import { Field } from 'redux-form'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import { BrowserRouter as Router } from 'react-router-dom'

const mockStore = configureStore([thunk])

describe('Containers:user:reset_password', () => {
  it('Should render ResetPassword without crashing', () => {
    const props = { match: { params: { } } }
    const store = mockStore({
      util: {
        isLoading: false,
        isSubmitting: false,
        isValidPasswordToken: true
      }
    })
    const wrapper = generateComponent(props, store)
    wrapper.mount()
  })

  it('Should render request reset password form', () => {
    const props = { match: { params: { } } }
    const store = mockStore({
      util: {
        isLoading: false,
        isSubmitting: false,
        isValidPasswordToken: false
      }
    })
    const wrapper = generateComponent(props, store)
    expect(wrapper.exists('form')).to.equal(true)
    expect(wrapper.find(Field)).to.have.length(1)
  })

  it('Should render reset password form', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const store = mockStore({
      util: {
        isLoading: false,
        isSubmitting: false,
        isValidPasswordToken: true
      }
    })
    const props = {
      match: {
        params: {
          resetToken: fixtures.mockRequest.user.validateToken
        }
      }
    }
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.validateResetPasswordToken,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.user.valdidateToke
    }
    nockGenerate(nockOptions)

    const wrapper = generateComponent(props, store)
    expect(wrapper.exists('form')).to.equal(true)
    expect(wrapper.find(Field)).to.have.length(2)
  })
})

const generateComponent = (props, store) => {
  return mount(
    <Provider store={store}>
      <Router>
        <I18nextProvider i18n={i18n}>
          <ResetPassword {...props} />
        </I18nextProvider>
      </Router>
    </Provider>
  )
}
