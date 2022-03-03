/* global beforeEach describe it */

import React from 'react'
import UserList from './UserList'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'

let wrapper
const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:user:user_list', () => {
  beforeEach(() => {
    const { mockHTTP, mockResponse, environment } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.user.getUser,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.user.userList
    }
    nockGenerate(nockOptions)
    wrapper = mount(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <UserList />
        </I18nextProvider>
      </Provider>
    )
  })

  it('Should render UserList component without crashing', () => {
    wrapper.mount()
  })
})
