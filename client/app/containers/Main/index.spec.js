/* global beforeEach describe it */

import React from 'react'
import Main from './index.js'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter as Router } from 'react-router-dom'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:Main', () => {
  beforeEach((done) => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const sportCodeOption = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.sportcode,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.sportcode
    }
    const brandCategoriesOption = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.brandcategory,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.brandcategory
    }
    nockGenerate(sportCodeOption)
    nockGenerate(brandCategoriesOption)
    done()
  })
  it('Should render main component without crashing', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })
})
const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <Router>
        <I18nextProvider i18n={i18n}>
          <Main {...props} />
        </I18nextProvider>
      </Router>
    </Provider>
  )
}
