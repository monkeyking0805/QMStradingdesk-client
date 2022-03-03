import {
  INITIALIZE_ASSET,
  PUSH_ASSET_QUANTITY,
  POP_ASSET_QUANTITY,
  ASSET_QUANTITY_INCREASE,
  ASSET_QUANTITY_DECREASE,
  SELECT_ASSET,
  DESELECT_ASSET,
  RESET_ASSET_MANAGEMENT,
  ASSET_AVAILABILITY_INCREASE,
  ASSET_AVAILABILITY_DECREASE,
  CHANGE_BONUS,
  CHANGE_ASSET_MANAGEMENT_PRICE
} from '../actions/assets_management_actions'

/*
  Due of code structure and don't want to touch any result of search assets
  assetsQuantity: For any edited quantity asset to store quantity, otherwise is default to 1
  it will remove if asset quantity == 1 because default to 1 So summarize is assetsQuantity will store only asset that have change quantity
*/
const assetsManagementInitialize = {
  assetsQuantity: [],
  assetsSelected: []
}

export default (state = assetsManagementInitialize, action) => {
  switch (action.type) {
    case INITIALIZE_ASSET: {
      const { assetsSelected, assetsQuantity } = action
      return {
        ...state,
        assetsSelected,
        assetsQuantity
      }
    }
    case PUSH_ASSET_QUANTITY: {
      return {
        ...state,
        assetsQuantity: state.assetsQuantity.concat(action.payload)
      }
    }
    case POP_ASSET_QUANTITY: {
      return {
        ...state,
        assetsQuantity: state.assetsQuantity.filter(assetItem => {
          for (const key in action.payload) {
            if (assetItem[key] === undefined || assetItem[key] !== action.payload[key]) {
              return true
            }
          }
          return false
        })
      }
    }
    case ASSET_QUANTITY_INCREASE:
      return {
        ...state,
        assetsQuantity: state.assetsQuantity.map(asset => {
          if (
            asset.assetID === action.payload.id &&
            asset.assetUnitID === action.payload.assetUnit.id &&
            asset.assetTypeID === action.payload.assetType.id
          ) {
            return {
              ...asset,
              quantity: asset.quantity + 1
            }
          }
          return asset
        })
      }
    case ASSET_QUANTITY_DECREASE: {
      return {
        ...state,
        assetsQuantity: state.assetsQuantity.map(asset => {
          if (
            asset.assetID === action.payload.id &&
            asset.assetUnitID === action.payload.assetUnit.id &&
            asset.assetTypeID === action.payload.assetType.id
          ) {
            return {
              ...asset,
              quantity: asset.quantity - 1
            }
          }
          return asset
        })
      }
    }
    case SELECT_ASSET: {
      return {
        ...state,
        assetsSelected: state.assetsSelected.concat(action.payload)
      }
    }
    case DESELECT_ASSET: {
      return {
        ...state,
        assetsSelected: state.assetsSelected.filter(assetSelected => {
          if (
            assetSelected.id === action.payload.id &&
            assetSelected.assetUnit.id === action.payload.assetUnit.id &&
            assetSelected.assetType.id === action.payload.assetType.id
          ) {
            return false
          }
          return true
        })
      }
    }
    case RESET_ASSET_MANAGEMENT: {
      return {
        ...state,
        assetsQuantity: assetsManagementInitialize.assetsQuantity,
        assetsSelected: assetsManagementInitialize.assetsSelected
      }
    }
    case ASSET_AVAILABILITY_INCREASE: {
      return {
        ...state,
        assetsSelected: state.assetsSelected.map(assetSelected => {
          if (assetSelected.id === action.payload.id) {
            return {
              ...assetSelected,
              available: ++assetSelected.available
            }
          }
          return assetSelected
        })
      }
    }
    case ASSET_AVAILABILITY_DECREASE: {
      return {
        ...state,
        assetsSelected: state.assetsSelected.map(assetSelected => {
          if (assetSelected.id === action.payload.id) {
            return {
              ...assetSelected,
              available: --assetSelected.available
            }
          }
          return assetSelected
        })
      }
    }
    case CHANGE_BONUS: {
      return {
        ...state,
        assetsSelected: state.assetsSelected.map(assetSelected => {
          if (assetSelected.id === action.payload.id) {
            return {
              ...assetSelected,
              bonus: action.payload.bonus
            }
          }
          return assetSelected
        })
      }
    }
    case CHANGE_ASSET_MANAGEMENT_PRICE: {
      return {
        ...state,
        assetsSelected: state.assetsSelected.map(assetSelected => {
          if (assetSelected.id === parseInt(action.payload.id)) {
            return {
              ...assetSelected,
              rate: parseInt(action.payload.marketRate),
              fees: {
                installation: parseInt(action.payload.installationCost),
                production: parseInt(action.payload.productionCost)
              }
            }
          }
          return assetSelected
        })
      }
    }
    default:
      return state
  }
}
