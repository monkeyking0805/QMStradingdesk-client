/* global beforeEach describe it */
import React from 'react'
import ProfileSettingPassword from './ProfileSettingPassword'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import { Button } from 'reactstrap'
import { Field } from 'redux-form'
import fixtures from '../../../../test/fixtures'
import sinon from 'sinon'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
describe('Components:ProfileSettingPassword', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ProfileSettingPassword component', () => {
    const handleSubmit = sinon.spy()
    generateComponent({ handleSubmit }).mount()
  })

  it('Should render correct total field if click ChangePassword button', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit, isPersonal: true }).mount()
    wrapper.find(Button).simulate('click')
    expect(wrapper.find(Field).length).to.be.equal(3)
  })

  it('Should handle form submit if form was submited', () => {
    const handleUpdatePersonalPasswords = sinon.spy()
    const wrapper = generateComponent({ handleUpdatePersonalPasswords }).mount()
    // Second Click is form submit
    wrapper.find('form').simulate('submit')
    expect(handleUpdatePersonalPasswords.called).to.be.equal(true)
  })

  it('Should hide current password field if it !isPersonal', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit, isPersonal: false }).mount()
    wrapper.find(Button).simulate('click')
    expect(wrapper.find(Field).length).to.be.equal(2)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ProfileSettingPassword {...props} />
      </I18nextProvider>
    </Provider>
  )
}
