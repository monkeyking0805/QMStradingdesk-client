/* global beforeEach describe it */
import React from 'react'
import ManageEventsImportPanel from './ManageEventsImportPanel'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import { ImportFile } from '../../components/ImportFile'
import { CardTitle } from 'reactstrap'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageEventsImportPanel', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ManageEventsImportPanel component', () => {
    generateComponent(store).mount()
  })

  it('Should render ImportFile component', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(ImportFile).length).to.equal(1)
  })

  it('Should render 2 description', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find('p').length).to.equal(2)
  })

  it('Should render card title', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(CardTitle).length).to.equal(1)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ManageEventsImportPanel {...props} />
      </I18nextProvider>
    </Provider>
  )
}
