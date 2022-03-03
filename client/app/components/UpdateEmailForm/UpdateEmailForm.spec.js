/* global beforeEach describe it */
import React from 'react'
import UpdateEmailForm from './UpdateEmailForm'
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

describe('Components:UpdateEmailForm', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render UpdateEmailForm component', () => {
    const handleSubmit = sinon.spy()
    generateComponent({ handleSubmit }).mount()
  })

  it('Should display form fields correctly', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit }).mount()
    // Short test just check everyfield has been
    expect(wrapper.find(Field).length).to.equal(1)
  })

  it('Should handle form submit if form was submited', () => {
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
        <UpdateEmailForm {...props} />
      </I18nextProvider>
    </Provider>
  )
}
