/* global beforeEach describe it */
import React from 'react'
import ManageAssetTable from './ManageAssetTable'
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

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageAssetTable', () => {
  beforeEach((done) => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.admin.assets.list,
      method: mockHTTP.httpMethod.post,
      statusCode: 200,
      response: mockResponse.admin.assets.list
    }
    nockGenerate(nockOptions)
    done()
  })

  it('Should render ManageAssetTable component', () => {
    generateComponent().mount()
  })

  it('Should render table (DataList) correctly', () => {
    const wrapper = generateComponent()
    expect(wrapper.find(DataList).length).to.equals(1)
  })

  it('Should render table paginate', () => {
    const wrapper = generateComponent()
    expect(wrapper.find(Pagination).length).to.equals(1)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ManageAssetTable {...props} />
      </I18nextProvider>
    </Provider>
  )
}
