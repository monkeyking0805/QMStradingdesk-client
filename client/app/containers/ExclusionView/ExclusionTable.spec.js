/* global describe it */

import React from 'react'
import ExclusionTable from './ExclusionTable'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { expect } from 'chai'
import { Table } from 'reactstrap'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
describe('Containers:ExclusionView:ExclusionTable', () => {
  it('Should render ExclusionTable component', () => {
    generateComponent(store).mount()
  })

  it('Should render ExclusionTable table content', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(Table).length).to.be.equal(1)
  })

  it('Should display column for table', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find('th').length).to.be.equal(3)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ExclusionTable {...props} />
      </I18nextProvider>
    </Provider>
  )
}
