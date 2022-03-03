/* global beforeEach describe it */
import React from 'react'
import ManageEventsTable from './ManageEventsTable'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import { DataList } from '../../components/DataList'
import { Pagination } from '../../components/Pagination'
import { LoadingSpinner } from '../../components/LoadingSpinner'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageEventsTable', () => {
  beforeEach((done) => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.events.list,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      response: mockResponse.admin.events.list
    }
    nockGenerate(nockOptions)
    done()
  })

  it('Should render ManageEventsTable component', () => {
    generateComponent(store).mount()
  })

  it('Should render table (DataList) correctly', () => {
    const wrapper = generateComponent(store)
    expect(wrapper.find(DataList).length).to.equals(1)
  })

  it('Should render table paginate', () => {
    const wrapper = generateComponent(store)
    expect(wrapper.find(Pagination).length).to.equals(1)
  })

  it('Should display loading state if it loading', () => {
    const mockStoreProvider = mockStore({
      ...fixtures.client.reduxState,
      adminManagement: {
        ...fixtures.client.reduxState.adminManagement,
        isEventsLoading: true
      }
    })
    const props = { isEventsLoading: true }
    const wrapper = generateComponent(mockStoreProvider, props).mount()
    expect(wrapper.find(LoadingSpinner).length).to.be.equal(1)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ManageEventsTable {...props} />
      </I18nextProvider>
    </Provider>
  )
}
