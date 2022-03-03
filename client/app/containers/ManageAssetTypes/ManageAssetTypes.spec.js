/* global beforeEach describe it */
import React from 'react'
import ManageAssetTypes from './ManageAssetTypes'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageAssetTypes', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ManageAssetTypes component', () => {
    const wrapper = generateComponent()
    wrapper.shallow()
  })
})

const generateComponent = (props = {}) => {
  return shallow(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ManageAssetTypes {...props} />
      </I18nextProvider>
    </Provider>
  )
}
