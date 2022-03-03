/* global describe it */

import React from 'react'
import AssetViewTable from './AssetViewTable'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter as Router } from 'react-router-dom'
import fixtures from '../../../../test/fixtures'
import { Modal } from 'reactstrap'
import { AssetTable } from '../../components/AssetTable'
const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Container:AssetViewTable', () => {
  it('Should render AssetViewTable component', () => {
    const wrapper = generateComponent(store)
    wrapper.mount()
  })

  it('Should generate view spec modal', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(Modal).length).to.equal(1)
  })

  it('Should not render sport AssetTable if it have no asset selected', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(AssetTable).length).to.equal(0)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <Router>
        <I18nextProvider i18n={i18n}>
          <AssetViewTable {...props} match={{ params: { packageID: undefined } }} />
        </I18nextProvider>
      </Router>
    </Provider>
  )
}
