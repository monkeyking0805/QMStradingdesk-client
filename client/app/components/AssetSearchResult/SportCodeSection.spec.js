/* global beforeEach describe it */
import React from 'react'
import SportCodeSection from './SportCodeSection'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import * as assetsManagementAction from '../../actions/assets_management_actions'
import { AssetEvent } from '../../components/AssetTable'
import { displayCurrencyFormat } from '../../helpers/utils'

const mockStore = configureStore([thunk])
let store
describe('Components: AssetSearchResult: SportCodeSection', () => {
  beforeEach((done) => {
    store = mockStore({
      assetsManagement: {
        assetsSelected: [],
        assetsQuantity: []
      }
    })
    done()
  })

  it('Should render SportCodeSection without crash', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper).to.not.equal(null)
  })

  it('Should render event item as correct total item', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find(AssetEvent)).to.have.length(fixtures.mockResponse.event.events.length)
  })

  it('Should handle quantity increase', () => {
    const wrapper = generateComponent().mount()
    const targetElement = wrapper.find('.assets .assetrow-details .assetrow .btn-increase').at(0)
    targetElement.simulate('click')
    // If user have click then should be toggle action
    // Should call correct dispatch
    expect(store.getActions().length).not.equal(0)
    expect(store.getActions()[0].type).to.equal(assetsManagementAction.PUSH_ASSET_QUANTITY)
  })

  it('Should increase quantity when user click increase quantity', () => {
    const wrapper = generateComponent().mount()
    const targetElement = wrapper.find('.assets .assetrow-details .assetrow .btn-increase').at(0)
    targetElement.simulate('click')
    expect(store.getActions().length).not.equal(0)
    expect(store.getActions()[0].payload.quantity).to.equal(2)
  })

  it('Should disabled increase quantity if quantity amount equal available', () => {
    const wrapper = generateComponent().mount()
    const targetElement = wrapper.find('.assets .assetrow-details .assetrow .btn-increase .btn-sm').at(1)
    expect(targetElement.hasClass('disabled')).to.equal(true)
  })

  it('Should handle quantity decrease', () => {
    const mockAsset = fixtures.mockResponse.event.events[0].assets[0]
    // Need special case for this store
    const individualStore = mockStore({
      assetsManagement: {
        assetsSelected: [],
        assetsQuantity: [
          {
            assetID: mockAsset.id,
            assetUnitID: mockAsset.assetUnit.id,
            assetTypeID: mockAsset.assetType.id,
            quantity: 2
          }
        ]
      }
    })
    const wrapper = generateComponent({}, individualStore).mount()
    const targetElement = wrapper.find('.assets .assetrow-details .assetrow .btn-decrease .btn-sm').at(0)
    targetElement.simulate('click')
    expect(individualStore.getActions().length).not.equal(0)
    // Should decrease first then pop it out from stack
    expect(individualStore.getActions()[0].type).to.equal(assetsManagementAction.ASSET_QUANTITY_DECREASE)
    expect(individualStore.getActions()[1].type).to.equal(assetsManagementAction.POP_ASSET_QUANTITY)
  })

  it('Should disabled decrease quantity button if quantity amount equal one', () => {
    const wrapper = generateComponent().mount()
    const targetElement = wrapper.find('.assets .assetrow-details .assetrow .btn-decrease .btn-sm').at(0)
    expect(targetElement.hasClass('disabled')).to.equal(true)
  })

  it('Should handle render total price correctly', () => {
    const mockAsset = fixtures.mockResponse.event.events[0].assets[0]
    const wrapper = generateComponent().mount()
    const targetElement = wrapper.find('.assets .assetrow-details .assetrow .assetrow_price .price').at(1)
    expect(targetElement.text()).to.equal(displayCurrencyFormat(mockAsset.price))
  })

  it('Should display tag correctly', () => {
    const wrapper = generateComponent().mount()
    const targetElement = wrapper.find('.event-info .badge')
    // Should display 3 badge venue, region, isFta or isPpv
    expect(targetElement).to.have.length(3)
  })

  it('Should update state if asset were selected', () => {
    const wrapper = generateComponent().mount()
    const targetElement = wrapper.find('.assets .assetrow-details .assetrow .assetrow_add .custom-control-input').at(0)
    targetElement.simulate('change')
    // Should call select asset action
    expect(store.getActions()[0].type).to.equal(assetsManagementAction.SELECT_ASSET)
  })

  it('Should update state if asset were deselected', () => {
    const mockAsset = fixtures.mockResponse.event.events[0].assets[0]
    const individualStore = mockStore({
      assetsManagement: {
        assetsSelected: [{
          id: mockAsset.id,
          assetType: {
            id: mockAsset.assetType.id
          },
          assetUnit: {
            id: mockAsset.assetUnit.id
          },
          price: mockAsset.price
        }],
        assetsQuantity: []
      }
    })
    const wrapper = generateComponent({}, individualStore).mount()
    const targetElement = wrapper.find('.assets .assetrow-details .assetrow .assetrow_add .custom-control-input').at(0)
    targetElement.simulate('change')
    // Should call select asset action
    expect(individualStore.getActions()[0].type).to.equal(assetsManagementAction.DESELECT_ASSET)
  })

  it('Should not display view exclusions on event detail section', () => {
    const wrapper = generateComponent().mount()
    const targetElement = wrapper.find('.event-info .event-exclusion').length
    expect(targetElement).to.equal(0)
  })
})

const generateComponent = (props = {}, defaultStore = null) => {
  const providerStore = defaultStore || store
  return mount(
    <Provider store={providerStore}>
      <I18nextProvider i18n={i18n}>
        <SportCodeSection {...props} data={fixtures.mockResponse.event} />
      </I18nextProvider>
    </Provider>
  )
}
