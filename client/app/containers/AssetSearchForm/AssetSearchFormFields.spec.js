/* global beforeEach describe it */
import React from 'react'
import AssetSearchFormFields from './AssetSearchFormFields'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:AssetSearchFormFields', () => {
  beforeEach((done) => {
    done()
  })
  it('Should render AssetSearchFormFields component', () => {
    const wrapper = generateComponent()
    wrapper.shallow()
  })
})

const generateComponent = (props = {}) => {
  return shallow(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AssetSearchFormFields {...props} />
      </I18nextProvider>
    </Provider>
  )
}
