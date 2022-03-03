/* global describe it beforeEach */

import React from 'react'
import ExclusionManagementTable from './ExclusionManagementTable'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { expect } from 'chai'
import { DataList, DataColumn, DataHeader } from '../../components/DataList'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import { LoadingSpinner } from '../../components/LoadingSpinner'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
describe('Containers:ExclusionManagement:ExclusionManagementTable', () => {
  beforeEach((done) => {
    const { environment, mockHTTP, mockResponse, mockRequest } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.exclusions.search,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      request: mockRequest.admin.exclusions.search,
      response: mockResponse.admin.exclusions.search
    }
    nockGenerate(nockOptions)
    done()
  })

  it('Should render ExclusionManagementTable component', () => {
    const props = { isLoading: false }
    generateComponent(store, props).mount()
  })

  it('Should render ExclusionManagementTable table content', () => {
    const props = { filteredExclusionList: [], selectedList: [], isLoading: false }
    const wrapper = generateComponent(store, props).mount()
    expect(wrapper.find(DataList).length).to.be.equal(1)
  })

  it('Should display column for datalist correctly', () => {
    const props = { filteredExclusionList: [], selectedList: [], isLoading: false }
    const wrapper = generateComponent(store, props).mount()
    expect(wrapper.find(DataHeader).length).to.be.equal(1)
    expect(wrapper.find(DataColumn).length).to.be.equal(11)
  })

  it('Should display loading state if it loading', () => {
    const props = { isLoading: true }
    const mockStoreProvider = mockStore({
      ...fixtures.client.reduxState,
      exclusions: {
        ...fixtures.client.reduxState.exclusions,
        isLoading: true
      }
    })
    const wrapper = generateComponent(mockStoreProvider, props).mount()
    expect(wrapper.find(LoadingSpinner).length).to.be.equal(1)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ExclusionManagementTable {...props} />
      </I18nextProvider>
    </Provider>
  )
}
