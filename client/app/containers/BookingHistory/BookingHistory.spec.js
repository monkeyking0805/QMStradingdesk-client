/* global beforeEach describe it */

import React from 'react'
import BookingHistory from './BookingHistory'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { WarningBlock } from '../../components/WarningBlock'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataRow } from '../../components/DataList'
import { userRole } from '../../constants/defaultValues'
// import { bookingState } from '../../constants/state'

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

describe('Containers:BookingHistory', () => {
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

  it('Should render BookingHistory component', () => {
    const store = mockStore(fixtures.client.reduxState)
    generateComponent(store).mount()
  })

  it('Should display loading while it fetching booking history', () => {
    const customState = {
      ...fixtures.client.reduxState,
      packages: {
        ...fixtures.client.reduxState.packages,
        isPackagesLoading: true
      }
    }
    const customStore = mockStore(customState)
    const wrapper = generateComponent(customStore).mount()
    expect(wrapper.find(LoadingSpinner).length).to.equal(1)
  })

  it('Should show error message content if booking list not existing in booking history', () => {
    const store = mockStore(fixtures.client.reduxState)
    const wrapper = generateComponent(store).mount()
    expect(wrapper.find(WarningBlock).length).to.equal(1)
  })

  it('Should show `Edit` button in data list if login as sales person and booking status is `Draft`', () => {
    const customStore = mockStore(salesState)
    const wrapper = generateComponent(customStore).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-note').at(0).length).to.equal(1)
  })

  it('Should hide `Edit` button in data list if login as sales person and booking status is `Pending`', () => {
    const customStore = mockStore(salesState)
    const props = {
      userCredential: { role: userRole.saleRepresentative },
      packageList: [{
        name: '',
        displayFormat: '',
        event_last_date: '',
        event_first_date: '',
        status: 'Pending',
        client: {
          company_name: '',
          agency_name: ''
        },
        user: {
          firstname: '',
          lastname: ''
        }
      }]
    }
    const wrapper = generateComponent(customStore, props).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-note').at(1).length).to.equal(0)
  })

  it('Should hide `Edit` button in data list if login as sales person and booking status is `Confirm`', () => {
    const customStore = mockStore(salesState)
    const props = {
      userCredential: { role: userRole.saleRepresentative },
      packageList: [{
        name: '',
        displayFormat: '',
        event_last_date: '',
        event_first_date: '',
        status: 'Confirm',
        client: {
          company_name: '',
          agency_name: ''
        },
        user: {
          firstname: '',
          lastname: ''
        }
      }]
    }
    const wrapper = generateComponent(customStore, props).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-note').at(2).length).to.equal(0)
  })

  it('Should show `Edit` button in data list if login as admin and booking status is `Draft`', () => {
    const customStore = mockStore(adminState)
    const wrapper = generateComponent(customStore).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-note').at(0).length).to.equal(1)
  })

  it('Should show `Edit` button in data list if login as admin and booking status is `Pending`', () => {
    const customStore = mockStore(adminState)
    const wrapper = generateComponent(customStore).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-note').at(1).length).to.equal(1)
  })

  it('Should show `Edit` button in data list if login as admin and booking status is `Confirm`', () => {
    const customStore = mockStore(adminState)
    const wrapper = generateComponent(customStore).mount()
    expect(wrapper.find(DataRow).find('i').find('.simple-icon-note').at(2).length).to.equal(1)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <Router>
        <I18nextProvider i18n={i18n}>
          <BookingHistory {...props} match={{ params: { packageID: undefined } }} />
        </I18nextProvider>
      </Router>
    </Provider>
  )
}
