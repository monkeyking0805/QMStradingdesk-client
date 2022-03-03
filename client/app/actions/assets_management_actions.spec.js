/* global beforeEach describe it */
import * as actions from './assets_management_actions'
import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fixtures from '../../../test/fixtures'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action:AssetsManagement', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    done()
  })
  it('Should handle asset quantity increase', () => {
    const expectedAction = [
      {
        type: actions.ASSET_QUANTITY_INCREASE,
        payload: {}
      }
    ]
    const asset = {}
    store.dispatch(actions.assetQuantityIncrease(asset))
    expect(store.getActions()).to.deep.equal(expectedAction)
  })

  it('Should handle asset quantity decrease', () => {
    const expectedAction = [
      {
        type: actions.ASSET_QUANTITY_DECREASE,
        payload: {}
      }
    ]
    const asset = {}
    store.dispatch(actions.assetQuantityDecrease(asset))
    expect(store.getActions()).to.deep.equal(expectedAction)
  })

  it('Should handle push asset quantity', () => {
    const asset = fixtures.mockResponse.assets.search.codes[0].events[0].assets[0]
    const expectedAction = [
      {
        type: actions.PUSH_ASSET_QUANTITY,
        payload: {
          assetID: asset.id,
          assetUnitID: asset.assetUnit.id,
          assetTypeID: asset.assetType.id,
          quantity: 2
        }
      }
    ]
    store.dispatch(actions.pushAssetQuantity(asset))
    expect(store.getActions()).to.deep.equal(expectedAction)
  })

  it('Should handle pop asset quantity', () => {
    const asset = fixtures.mockResponse.assets.search.codes[0].events[0].assets[0]
    const expectedAction = [
      {
        type: actions.POP_ASSET_QUANTITY,
        payload: {
          assetID: asset.id,
          assetUnitID: asset.assetUnit.id,
          assetTypeID: asset.assetType.id
        }
      }
    ]
    store.dispatch(actions.popAssetQuantity(asset))
    expect(store.getActions()).to.deep.equal(expectedAction)
  })

  it('Should handle select asset', () => {
    const asset = fixtures.mockResponse.assets.search.codes[0].events[0].assets[0]
    const expectedAction = [
      {
        type: actions.SELECT_ASSET,
        payload: asset
      }
    ]
    store.dispatch(actions.selectAsset({}, asset))
    expect(store.getActions()).to.deep.equal(expectedAction)
  })

  it('Should handle deselect asset', () => {
    const asset = fixtures.mockResponse.assets.search.codes[0].events[0].assets[0]
    const expectedAction = [
      {
        type: actions.DESELECT_ASSET,
        payload: asset
      }
    ]
    store.dispatch(actions.deselectAsset(asset))
    expect(store.getActions()).to.deep.equal(expectedAction)
  })

  it('Should handle reset asset management', () => {
    const expectedAction = [
      {
        type: actions.RESET_ASSET_MANAGEMENT
      }
    ]
    store.dispatch(actions.resetAssetManagement())
    expect(store.getActions()).to.deep.equal(expectedAction)
  })

  it('Should handle toggle bonus', () => {

  })
})
