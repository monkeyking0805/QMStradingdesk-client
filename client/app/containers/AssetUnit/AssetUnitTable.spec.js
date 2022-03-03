/* global describe it */

import React from 'react'
import AssetUnitTable from './AssetUnitTable'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Components:AssetUnit:AssetUnitTable', () => {
  it('Should render AssetUnitTable component', () => {
    const wrapper = generateComponent()
    wrapper.shallow()
  })
})

const generateComponent = (props = {}) => {
  return shallow(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AssetUnitTable {...props} />
      </I18nextProvider>
    </Provider>
  )
}
