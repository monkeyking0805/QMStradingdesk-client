/* global beforeEach describe it */
import React from 'react'
import ManageEventsImport from './ManageEventsImport'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import { ExportCSVTemplate } from '../../components/ExportCSVTemplate'
import ManageEventsImportPanel from './ManageEventsImportPanel'
import ManageEventsImportResult from './ManageEventsImportResult'
import { BrowserRouter as Router } from 'react-router-dom'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageEventsImport', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ManageEventsImport component', () => {
    generateComponent(store).mount()
  })

  it('Should render export csv template', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(ExportCSVTemplate).length).to.equal(1)
  })

  it('Should render events import panel', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(ManageEventsImportPanel).length).to.equal(1)
  })

  it('Should render events import result', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(ManageEventsImportResult).length).to.equal(1)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <Router>
        <I18nextProvider i18n={i18n}>
          <ManageEventsImport {...props} />
        </I18nextProvider>
      </Router>
    </Provider>
  )
}
