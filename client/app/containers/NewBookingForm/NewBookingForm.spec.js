/* global beforeEach describe it */

import React from 'react'
import NewBookingForm from './NewBookingForm'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import nockGenerate from '../../../../test/helpers/nockGenerators'
import fixtures from '../../../../test/fixtures'
import MultipleSelect from '../../components/MutipleSelect'
import DateRangePickerWrapper from '../../components/DateRangePickerWrapper'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:NewBookingForm', () => {
  beforeEach((done) => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const sportCodeOption = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.sportcode,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.sportcode
    }
    const brandCategoriesOption = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.brandcategory,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.brandcategory
    }
    nockGenerate(sportCodeOption)
    nockGenerate(brandCategoriesOption)
    done()
  })

  it('Should render NewBookingForm component', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })

  it('Should render `Sport Code and Brand Category` dropdown', () => {
    const wrapper = generateComponent()
    wrapper.mount()
    expect(wrapper.find(MultipleSelect)).to.have.lengthOf(2)
  })

  it('Should render date picker dropdown', () => {
    const wrapper = generateComponent()
    wrapper.mount()
    expect(wrapper.find(DateRangePickerWrapper)).to.have.lengthOf(1)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <NewBookingForm {...props} />
      </I18nextProvider>
    </Provider>
  )
}
