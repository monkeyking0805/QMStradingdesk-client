/* global beforeEach describe it */

import React from 'react'
import ExclusionFilter from './ExclusionFilter'
import { mount } from 'enzyme'
import { expect } from 'chai'
import Select from 'react-select'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
describe('Containers:ExclusionView:ExclusionFilter', () => {
  beforeEach((done) => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const clubOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.clubs,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.clubs
    }
    nockGenerate(clubOptions)
    done()
  })

  it('Should render ExclusionFilter component', () => {
    generateComponent(store).mount()
  })

  it('Should render dropdown correctly', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(Select).length).to.equal(1)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ExclusionFilter {...props} />
      </I18nextProvider>
    </Provider>
  )
}
