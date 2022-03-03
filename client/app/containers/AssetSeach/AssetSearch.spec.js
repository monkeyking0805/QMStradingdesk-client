/* global beforeEach describe it */

import React from 'react'
import AssetSearch from './AssetSearch'
import { mount } from 'enzyme'

import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import nockGenerate from '../../../../test/helpers/nockGenerators'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:AssetSearch', () => {
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
  it('Should render AssetSearch component', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })

  it('Should render navtabs in AssetSearch', () => {
    const wrapper = generateComponent()
    expect(wrapper.find(Nav)).to.have.lengthOf(1)
  })

  it('Should render 2 tabs including New Booking', () => {
    const wrapper = generateComponent()
    expect(wrapper.find(NavItem)).to.have.lengthOf(1)
    expect(wrapper.find(TabContent)).to.have.lengthOf(1)
    expect(wrapper.find(TabPane)).to.have.lengthOf(1)
  })

  /* Ignore this test case for now due we have only single tab
  it('Should handle toggle tab', () => {
    const wrapper = generateComponent().mount()
    const targetElement = wrapper.find(NavLink).find('a').at(1)
    targetElement.simulate('click')
    expect(wrapper.find(NavLink).find('a').at(1).hasClass('active')).to.equal(true)
  })
  */
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AssetSearch {...props} />
      </I18nextProvider>
    </Provider>
  )
}
