/* global beforeEach describe it */
import React from 'react'
import ManageEventsFilter from './ManageEventsFilter'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import MultipleSelect from '../../components/MutipleSelect'
import { Input } from 'reactstrap'
import DateRangePickerWrapper from '../../components/DateRangePickerWrapper'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageEventsFilter', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ManageEventsFilter component', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })

  it('Should render 3 multiple select', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find(MultipleSelect).length).to.equals(4)
  })

  it('Should render single Search input', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find(Input).length).to.equals(1)
  })

  it('Should render 1 daterange picker', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find(DateRangePickerWrapper).length).to.equals(1)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ManageEventsFilter {...props} />
      </I18nextProvider>
    </Provider>
  )
}
