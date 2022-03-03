/* global describe it */

import React from 'react'
import ExclusionManagement from './ExclusionManagement'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
describe('Containers:ExclusionManagement:Exckus', () => {
  it('Should render ExclusionManagement component', () => {
    generateComponent(store).shallow()
  })
})

const generateComponent = (store, props = {}) => {
  return shallow(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ExclusionManagement />
      </I18nextProvider>
    </Provider>
  )
}
