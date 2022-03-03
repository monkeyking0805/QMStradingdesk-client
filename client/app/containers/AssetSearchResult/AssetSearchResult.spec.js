/* global beforeEach describe it */
import React from 'react'
import AssetSearchResult from './AssetSearchResult'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:AssetSearchResult', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render AssetSearchResult component', () => {
    const wrapper = generateComponent()
    wrapper.shallow()
  })

  it('Should render event content if their have events result', () => {
  })

  it('Should render warning content if their have no events result', () => {
  })
})

const generateComponent = (props = {}) => {
  return shallow(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AssetSearchResult {...props} />
      </I18nextProvider>
    </Provider>
  )
}
