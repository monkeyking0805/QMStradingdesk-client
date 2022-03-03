/* global beforeEach describe it */
import React from 'react'
import ProfileSettingPersonal from './ProfileSettingPersonal'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import { Field } from 'redux-form'
import { Form, Button } from 'reactstrap'

import fixtures from '../../../../test/fixtures'
import sinon from 'sinon'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
describe('Components:ProfileSettingPersonal', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ProfileSettingPersonal component', () => {
    const handleSubmit = sinon.spy()
    generateComponent({ handleSubmit }).mount()
  })

  it('Should render ProfileSettingPersonal form', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit }).mount()
    expect(wrapper.find(Form).length).to.equal(1)
  })

  it('Should render correct total field', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit }).mount()
    expect(wrapper.find(Field).length).to.be.equal(4)
  })

  it('Should handle form submit if form was submited', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit }).mount()
    wrapper.find(Button).simulate('click')
    expect(handleSubmit.called).to.be.equal(true)
  })

  it('Should hide update email button if it not personal form', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit }).mount()
    expect(wrapper.find('#updateEmail').length).to.be.equal(0)
  })

  it('Should show update email button if it personal form', () => {
    const handleSubmit = sinon.spy()
    const isPersonal = true
    const wrapper = generateComponent({ handleSubmit, isPersonal }).mount()
    expect(wrapper.find('#updateEmail').length).to.be.equal(1)
  })

  it('Should show update password button', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit }).mount()
    expect(wrapper.find('#updatePassword').length).to.be.equal(1)
  })

  it('Should disable save button as default', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit }).mount()
    expect(wrapper.find('button').hasClass('disabled')).to.be.equal(true)
  })
})

const generateComponent = (props = {}) => {
  const profileDetail = {
    email: 'test@test.com'
  }
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ProfileSettingPersonal {...props} profileDetail={profileDetail} />
      </I18nextProvider>
    </Provider>
  )
}
