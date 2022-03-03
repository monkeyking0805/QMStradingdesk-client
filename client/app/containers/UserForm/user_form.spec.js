/* global beforeEach describe it */

import React from 'react'
import UserForm from './user_form'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Field } from 'redux-form'
import { expect } from 'chai'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import sinon from 'sinon'

const mockStore = configureStore([thunk])
const { flags } = fixtures.mockResponse
const store = mockStore({
  flag: {
    flagLanguages: flags.languages,
    flagCountries: flags.countries,
    flagTimezones: flags.timezones,
    flagRegions: flags.regions,
    flagRoles: flags.roles
  },
  user: {
    individualUser: {}
  }
})

describe('Containers:user:user_form', () => {
  beforeEach(() => {
    const { mockHTTP, mockResponse, environment } = fixtures
    const httpMockGenerator = [
      {
        url: mockHTTP.mockURI.flag.countries,
        response: mockResponse.flags.countries
      }, {
        url: mockHTTP.mockURI.flag.languages,
        response: fixtures.mockResponse.flags.languages
      }, {
        url: mockHTTP.mockURI.flag.regions,
        response: mockResponse.flags.regions
      }, {
        url: mockHTTP.mockURI.flag.timezones,
        response: mockResponse.flags.timezones
      }, {
        url: mockHTTP.mockURI.flag.roles,
        response: mockResponse.flags.roles
      }, {
        url: mockHTTP.mockURI.user.getIndividualUser,
        response: mockResponse.user.individualUser
      }
    ]

    httpMockGenerator.forEach((mockItem) => {
      const nockOptions = {
        uri: environment.clientUri,
        uriParams: mockItem.url,
        method: mockHTTP.httpMethod.get,
        statusCode: 200,
        response: mockItem.response
      }
      nockGenerate(nockOptions)
    })
  })
  it('Should render UserForm component without crashing', () => {
    const props = { match: { params: { } } }
    const wrapper = generateComponent(props)
    wrapper.mount()
  })

  it('Should render create user form', () => {
    const props = { match: { params: { } } }
    const wrapper = generateComponent(props)
    expect(wrapper.exists('form')).to.equal(true)
    // If user create so it will be alway need to hide is_active field
    expect(wrapper.find(Field)).to.have.length(10)
  })
})

const generateComponent = (props) => {
  const handleSubmit = sinon.spy()
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <UserForm {...props} handleSubmit={handleSubmit} />
      </I18nextProvider>
    </Provider>
  )
}
