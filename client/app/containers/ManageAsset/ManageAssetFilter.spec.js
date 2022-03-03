/* global beforeEach describe it */
import React from 'react'
import ManageAssetFilter from './ManageAssetFilter'
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

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:ManageAssetFilter', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render ManageAssetFilter component', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })

  it('Should render 3 multiple select', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find(MultipleSelect).length).to.equals(3)
  })

  it('Should render single Search input', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find(Input).length).to.equals(1)
  })
})

const generateComponent = (props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ManageAssetFilter {...props} />
      </I18nextProvider>
    </Provider>
  )
}
