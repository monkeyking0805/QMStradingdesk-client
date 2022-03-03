/* global beforeEach describe it */
import React from 'react'
import ProfileSettingPicture from './ProfileSettingPicture'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
describe('Components:ProfileSettingPicture', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ProfileSettingPicture component', () => {
    generateComponent({ profileDetail: { firstname: 'test', lastname: 'test' } }).mount()
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ProfileSettingPicture {...props} />
      </I18nextProvider>
    </Provider>
  )
}
