/* global beforeEach describe it */
import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import { DialogConfirm } from '../../components/DialogConfirm'
import ManageEventsActions from './ManageEventsActions'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageEventsActions', () => {
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

  it('Should render ManageEventsActions component', () => {
    generateComponent(store).mount()
  })

  it('Should render confirm modal dialogs', () => {
    const wrapper = generateComponent(store)
    expect(wrapper.find(DialogConfirm).length).to.equals(3)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ManageEventsActions {...props} />
      </I18nextProvider>
    </Provider>
  )
}
