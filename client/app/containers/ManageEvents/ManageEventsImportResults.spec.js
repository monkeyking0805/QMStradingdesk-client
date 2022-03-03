/* global beforeEach describe it */
import React from 'react'
import ManageEventsImportResult from './ManageEventsImportResult'
// import { expect } from 'chai'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageEventsImportResult', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ManageEventsImportResult component', () => {
    generateComponent(store).mount()
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ManageEventsImportResult {...props} />
      </I18nextProvider>
    </Provider>
  )
}
