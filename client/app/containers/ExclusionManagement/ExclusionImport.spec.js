/* global describe it */

import React from 'react'
import ExclusionImport from './ExclusionImport'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { expect } from 'chai'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import { BrowserRouter as Router } from 'react-router-dom'
import { ExportCSVTemplate } from '../../components/ExportCSVTemplate'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
describe('Containers:ExclusionManagement:ExclusionImport', () => {
  it('Should render ExclusionImport component', () => {
    generateComponent(store).mount()
  })

  it('Should render ExportCSVTemplate button content', () => {
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(ExportCSVTemplate).length).to.be.equal(1)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <Router>
        <I18nextProvider i18n={i18n}>
          <ExclusionImport {...props} />
        </I18nextProvider>
      </Router>
    </Provider>
  )
}
