/* global beforeEach describe it */
import React from 'react'
import EventForm from './EventForm'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import { Field } from 'redux-form'
import { Form } from 'reactstrap'

import fixtures from '../../../../test/fixtures'
import sinon from 'sinon'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Components:EventForm', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render EventForm component', () => {
    const handleFormSubmit = sinon.spy()
    generateComponent({ handleFormSubmit }).mount()
  })

  it('Should render form correctly', () => {
    const handleFormSubmit = sinon.spy()
    const wrapper = generateComponent({ handleFormSubmit }).mount()
    expect(wrapper.find(Form).length).to.equal(1)
  })

  it('Should display form fields correctly', () => {
    const handleFormSubmit = sinon.spy()
    const wrapper = generateComponent({ handleFormSubmit }).mount()
    // Short test just check everyfield has been rendered
    expect(wrapper.find(Field).length).to.equal(9)
  })

  it('Should handle onSubmit when submit form', () => {
    const handleFormSubmit = sinon.spy()
    const wrapper = generateComponent({ handleFormSubmit }).mount()
    wrapper.find('form').simulate('submit')
    expect(handleFormSubmit.called).to.be.equal(true)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <EventForm {...props} />
      </I18nextProvider>
    </Provider>
  )
}
