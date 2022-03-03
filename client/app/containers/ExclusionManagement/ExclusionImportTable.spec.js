/* global describe it */
import React from 'react'
import ExclusionImportTable from './ExclusionImportTable'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import { DataList } from '../../components/DataList'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageAssetTable', () => {
  it('Should render ManageAssetTable component', () => {
    generateComponent().mount()
  })

  it('Should render table (DataList) correctly', () => {
    const wrapper = generateComponent()
    expect(wrapper.find(DataList).length).to.equals(1)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ExclusionImportTable {...props} />
      </I18nextProvider>
    </Provider>
  )
}
