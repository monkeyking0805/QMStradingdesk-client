/* global beforeEach describe it */
import React from 'react'
import ScheduleForm from './ScheduleForm'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import { Field } from 'redux-form'
import fixtures from '../../../../test/fixtures'
import sinon from 'sinon'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
describe('Components:ScheduleForm', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ScheduleForm component', () => {
    const handleFormSubmit = sinon.spy()
    generateComponent({ handleFormSubmit }).mount()
  })

  it('Should display correct button label', () => {
    const handleFormSubmit = sinon.spy()
    const buttonLabel = 'TEST'
    const wrapper = generateComponent({ handleFormSubmit, buttonLabel }).mount()
    expect(wrapper.find('button').text()).to.equal(buttonLabel)
  })

  it('Should display form fields correctly', () => {
    const handleFormSubmit = sinon.spy()
    const wrapper = generateComponent({ handleFormSubmit }).mount()
    // Short test just check everyfield has been
    expect(wrapper.find(Field).length).to.equal(6)
  })

  it('Should handle onSubmit when submit form', () => {
    const handleFormSubmit = sinon.spy()
    const wrapper = generateComponent({ handleFormSubmit }).mount()
    wrapper.find('form').simulate('submit')
    expect(handleFormSubmit.called).to.be.equal(true)
  })
})

const generateComponent = (props = {}) => {
  const brandCategories = []
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ScheduleForm {...props} brandCategories={brandCategories} />
      </I18nextProvider>
    </Provider>
  )
}
