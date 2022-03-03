/* global beforeEach describe it */

import React from 'react'
import BookingHistoryFilter from './BookingHistoryFilter'
import { mount } from 'enzyme'
// import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:BookingHistoryFilter', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render BookingHistoryFilter component', () => {
    generateComponent()
  })

  it('Should display order dropdown filter', () => {

  })

  it('Should display search box filter', () => {

  })

  it('Should display pages view filter', () => {

  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BookingHistoryFilter {...props} />
      </I18nextProvider>
    </Provider>
  )
}
