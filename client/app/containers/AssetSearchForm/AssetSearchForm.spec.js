/* global beforeEach describe it */
import React from 'react'
import AssetSearchForm from './AssetSearchForm'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)

describe('Containers:AssetSearchForm', () => {
  beforeEach((done) => {
    done()
  })
  it('Should render AssetSearchForm component', () => {
    const wrapper = generateComponent()
    wrapper.shallow()
  })

  it('Should disabled generate button if non selected assets', () => {
    // This will be update in ticket refactoring and improvement, Part 2
  })

  it('Should enabled generate button if selected assets', () => {
    // This will be update in ticket refactoring and improvement, Part 2
  })

  it('Should render export csv file button', () => {
    // This will be update in ticket refactoring and improvement, Part 2
  })

  it('Should redirect to summary screen if click on generate schedule', () => {
    // This will be update in ticket refactoring and improvement, Part 2
  })

  it('Should call toggle available asset when click toggle', () => {
    // This will be update in ticket refactoring and improvement, Part 2
  })
})

const generateComponent = (props = {}) => {
  return shallow(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AssetSearchForm {...props} data={fixtures.mockResponse.event} />
      </I18nextProvider>
    </Provider>
  )
}
