/* global describe it */

import React from 'react'
import ExclusionManagementFilter from './ExclusionManagementFilter'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
describe('Containers:ExclusionManagement:ExclusionManagementFilter', () => {
  it('Should render ExclusionManagementFilter component', () => {
    generateComponent(store).shallow()
  })
})

const generateComponent = (store, props = {}) => {
  return shallow(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ExclusionManagementFilter
          sportCodes={[]}
          brandCategories={[]}
          clubs={[]}
          venues={[]}
          assetTypes={[]}
          eventTypes={[]}
          filtersExclusions={{
            brandCategories: [],
            sportCodes: [],
            codeTypes: [],
            clubs: [],
            venues: [],
            assetTypes: []
          }}
          {...props}
        />
      </I18nextProvider>
    </Provider>
  )
}
