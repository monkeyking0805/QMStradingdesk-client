/* global beforeEach describe it */
import React from 'react'
import AssetSearchExportCSV from './AssetSearchExportCSV'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import { CSVLink } from 'react-csv/lib'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:AssetSearchForm:AssetSearchExportCSV', () => {
  beforeEach((done) => {
    done()
  })
  it('Should render AssetSearchExportCSV component', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })

  it('Should render CSV Link (Export button) component', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find(CSVLink).length).to.equal(1)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AssetSearchExportCSV />
      </I18nextProvider>
    </Provider>
  )
}
