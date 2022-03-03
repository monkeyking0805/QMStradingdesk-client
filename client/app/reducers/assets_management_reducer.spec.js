/* global describe it */
import assetsManagementReducer from './assets_management_reducer'
import * as types from '../actions/assets_management_actions'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'

const initializeState = {
  assetsQuantity: [],
  assetsSelected: []
}

const particularAsset = fixtures.mockResponse.event.events[0].assets[0]

describe('Reducer:AssetsManagement', () => {
  it('Should return initialize state', () => {
    expect(assetsManagementReducer(initializeState, {})).to.eql({
      assetsQuantity: [],
      assetsSelected: []
    })
  })

  it('Should handle push asset quantity', () => {
    expect(
      assetsManagementReducer(initializeState, {
        type: types.PUSH_ASSET_QUANTITY,
        payload: particularAsset
      })
    ).to.eql({
      assetsQuantity: [particularAsset],
      assetsSelected: []
    })
  })

  it('Shopuld handle pop asset quantity', () => {
    expect(
      assetsManagementReducer(initializeState, {
        type: types.POP_ASSET_QUANTITY,
        payload: particularAsset
      })
    ).to.eql({
      assetsQuantity: [],
      assetsSelected: []
    })
  })

  it('Should handle asset quantity increase', () => {
    const individualInitializeState = {
      assetsQuantity: [{
        assetID: particularAsset.id,
        assetUnitID: particularAsset.assetUnit.id,
        assetTypeID: particularAsset.assetType.id,
        quantity: 5
      }],
      assetsSelected: []
    }
    expect(
      assetsManagementReducer(individualInitializeState, {
        type: types.ASSET_QUANTITY_INCREASE,
        payload: particularAsset
      })
    ).to.eql({
      assetsQuantity: [
        {
          ...individualInitializeState.assetsQuantity[0],
          quantity: 6
        }
      ],
      assetsSelected: []
    })
  })

  it('Should handle asset quantity decrease', () => {
    const individualInitializeState = {
      assetsQuantity: [{
        assetID: particularAsset.id,
        assetUnitID: particularAsset.assetUnit.id,
        assetTypeID: particularAsset.assetType.id,
        quantity: 5
      }],
      assetsSelected: []
    }
    expect(
      assetsManagementReducer(individualInitializeState, {
        type: types.ASSET_QUANTITY_DECREASE,
        payload: particularAsset
      })
    ).to.eql({
      assetsQuantity: [
        {
          ...individualInitializeState.assetsQuantity[0],
          quantity: 4
        }
      ],
      assetsSelected: []
    })
  })

  it('Should handle select asset', () => {
    expect(
      assetsManagementReducer(initializeState, {
        type: types.SELECT_ASSET,
        payload: fixtures.mockResponse.event.events[0].assets[0]
      })
    ).to.eql({
      assetsQuantity: [],
      assetsSelected: [
        fixtures.mockResponse.event.events[0].assets[0]
      ]
    })
  })

  it('Should handle deselect asset', () => {
    const individualInitializeState = {
      assetsQuantity: [],
      assetsSelected: [{
        id: particularAsset.id,
        assetType: {
          id: particularAsset.assetType.id
        },
        assetUnit: {
          id: particularAsset.assetUnit.id
        },
        price: particularAsset.price
      }]
    }
    expect(
      assetsManagementReducer(individualInitializeState, {
        type: types.DESELECT_ASSET,
        payload: particularAsset
      })
    ).to.eql({
      assetsQuantity: [],
      assetsSelected: []
    })
  })

  it('Should handle reset asset management', () => {
    expect(
      assetsManagementReducer(initializeState, {
        type: types.RESET_ASSET_MANAGEMENT
      })
    ).to.eql({
      ...initializeState,
      assetsQuantity: [],
      assetsSelected: []
    })
  })

  it('Should handle toggle bonus', () => {

  })
})
