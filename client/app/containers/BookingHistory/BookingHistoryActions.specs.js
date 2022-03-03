/* global beforeEach describe it */

import React from 'react'
import BookingHistoryActions from './BookingHistoryActions'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataRow } from '../../components/DataList'
import { userRole } from '../../constants/defaultValues'

const mockStore = configureStore([thunk])
const { client, mockResponse } = fixtures

const salesState = {
  ...client.reduxState,
  packages: {
    ...client.reduxState.packages,
    packageList: mockResponse.package.packageList.rows,
    packageListFilter: mockResponse.package.packageList.parameters,
    packagePaginate: mockResponse.package.packageList.paginate
  },
  auth: {
    ...client.reduxState.auth,
    credentialDetail: {
      role: userRole.saleRepresentative
    }
  }
}

const adminState = {
  ...client.reduxState,
  packages: {
    ...client.reduxState.packages,
    packageList: mockResponse.package.packageList.rows,
    packageListFilter: mockResponse.package.packageList.parameters,
    packagePaginate: mockResponse.package.packageList.paginate
  },
  auth: {
    ...client.reduxState.auth,
    credentialDetail: {
      role: userRole.administrator
    }
  }
}

describe('Containers:BookingHistoryActions', () => {
  beforeEach((done) => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const packagesOption = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.packages.getPackages,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.package.packageList
    }
    nockGenerate(packagesOption)
    done()
  })

  it('Should render BookingHistoryActions component', () => {
    const store = mockStore(fixtures.client.reduxState)
    generateComponent(store).mount()
  })

  it('Should show `Delete` button in data list if login as sales person and booking status is `Draft`', () => {
    const customStore = mockStore(salesState)
    const wrapper = generateComponent(customStore).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-trash').at(0).length).to.equal(1)
  })

  it('Should show `Delete` button in data list if login as sales person and booking status is `Pending`', () => {
    const customStore = mockStore(salesState)
    const wrapper = generateComponent(customStore).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-trash').at(1).length).to.equal(1)
  })

  it('Should hide `Delete` button in data list if login as sales person and booking status is `Confirm`', () => {
    const customStore = mockStore(salesState)
    const wrapper = generateComponent(customStore).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-trash').at(2).length).to.equal(0)
  })

  it('Should show `Delete` button in data list if login as admin and booking status is `Draft`', () => {
    const customStore = mockStore(adminState)
    const wrapper = generateComponent(customStore).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-trash').at(0).length).to.equal(1)
  })

  it('Should show `Delete` button in data list if login as admin and booking status is `Pending`', () => {
    const customStore = mockStore(adminState)
    const wrapper = generateComponent(customStore).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-trash').at(1).length).to.equal(1)
  })

  it('Should show `Delete` button in data list if login as admin and booking status is `Confirm`', () => {
    const customStore = mockStore(adminState)
    const wrapper = generateComponent(customStore).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-trash').at(2).length).to.equal(1)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <Router>
        <I18nextProvider i18n={i18n}>
          <BookingHistoryActions {...props} match={{ params: { packageID: undefined } }} />
        </I18nextProvider>
      </Router>
    </Provider>
  )
}
