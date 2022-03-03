/* global beforeEach describe it */
import React from 'react'
import ManageEventsImportTable from './ManageEventsImportTable'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import { DataList } from '../../components/DataList'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageEventsImportTable', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ManageEventsImportTable component', () => {
    generateComponent(store).mount()
  })

  it('Should render DataList component', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(DataList).length).to.equal(1)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ManageEventsImportTable {...props} />
      </I18nextProvider>
    </Provider>
  )
}
