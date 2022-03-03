/* global beforeEach describe it */
import React from 'react'
import AssetSearchNavBar from './AssetSearchNavBar'
import AssetSearchExportCSV from './AssetSearchExportCSV'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import { Button } from 'reactstrap'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:AssetSearchForm:AssetSearchNavBar', () => {
  beforeEach((done) => {
    done()
  })
  it('Should render AssetSearchNavBar component', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })

  it('Should render AssetSearchExportCSV component', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find(AssetSearchExportCSV).length).to.equal(1)
  })

  it('Should render view schedule button', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find(Button).length).to.equal(1)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AssetSearchNavBar />
      </I18nextProvider>
    </Provider>
  )
}
