/* global beforeEach describe it */
import React from 'react'
import ProfileSetting from './ProfileSetting'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Form } from 'reactstrap'
import { Field } from 'redux-form'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import sinon from 'sinon'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
describe('Components:ProfileSetting', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ProfileSetting component', () => {
    const handleSubmit = sinon.spy()
    generateComponent({ handleSubmit }).mount()
  })

  it('Should render ProfileSetting form', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit }).mount()
    expect(wrapper.find(Form).length).to.equal(1)
  })

  it('Should render correct total field', () => {
    const handleSubmit = sinon.spy()
    const wrapper = generateComponent({ handleSubmit }).mount()
    expect(wrapper.find(Field).length).to.be.equal(5)
  })

  it('Should handle form submit if form was submited', () => {
    const handlingUpdatePersonalSettings = sinon.spy()
    const wrapper = generateComponent({ handlingUpdatePersonalSettings }).mount()
    wrapper.find('form').simulate('submit')
    expect(handlingUpdatePersonalSettings.called).to.be.equal(true)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ProfileSetting
          {...props}
          flagCountries={[]}
          flagLanguages={[]}
          flagRegions={[]}
          flagRoles={[]}
          flagTimezones={[]}
        />
      </I18nextProvider>
    </Provider>
  )
}
