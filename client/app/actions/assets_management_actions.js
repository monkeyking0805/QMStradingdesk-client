export const INITIALIZE_ASSET = 'INITIALIZE_ASSET'

export const ASSET_QUANTITY_INCREASE = 'ASSET_QUANTITY_INCREASE'
export const ASSET_QUANTITY_DECREASE = 'ASSET_QUANTITY_DECREASE'
export const RESET_ASSET_MANAGEMENT = 'RESET_ASSET_MANAGEMENT'

export const PUSH_ASSET_QUANTITY = 'PUSH_ASSET_QUANTITY'
export const POP_ASSET_QUANTITY = 'POP_ASSET_QUANTITY'

export const SELECT_ASSET = 'SELECT_ASSET'
export const DESELECT_ASSET = 'DESELECT_ASSET'

export const ASSET_AVAILABILITY_INCREASE = 'ASSET_AVAILABILITY_INCREASE'
export const ASSET_AVAILABILITY_DECREASE = 'ASSET_AVAILABILITY_DECREASE'

export const CHANGE_BONUS = 'CHANGE_BONUS'

export const CHANGE_ASSET_MANAGEMENT_PRICE = 'CHANGE_ASSET_MANAGEMENT_PRICE'

export function intitializeAsset (assetsQuantity, assetsSelected) {
  return (dispatch) => {
    dispatch({
      type: INITIALIZE_ASSET,
      assetsSelected,
      assetsQuantity
    })
  }
}

export function resetAssetManagement () {
  return (dispatch) => {
    dispatch({
      type: RESET_ASSET_MANAGEMENT
    })
  }
}

// For pushing any edited quantity on assets list
// If you user click add quantity the default is 1 so the quantity to store in assetQuantity reducer should start at 2
export function pushAssetQuantity (asset) {
  return (dispatch) => {
    const pushAsset = {
      assetID: asset.id,
      assetUnitID: asset.assetUnit.id,
      assetTypeID: asset.assetType.id,
      quantity: 2
    }
    dispatch({
      type: PUSH_ASSET_QUANTITY,
      payload: pushAsset
    })
  }
}

// For poping any edit quantity when quantity equals 1
export function popAssetQuantity (asset) {
  return (dispatch) => {
    const popAsset = {
      assetID: asset.id,
      assetUnitID: asset.assetUnit.id,
      assetTypeID: asset.assetType.id
    }
    dispatch({
      type: POP_ASSET_QUANTITY,
      payload: popAsset
    })
  }
}

export function assetQuantityIncrease (asset) {
  return (dispatch) => {
    dispatch({
      type: ASSET_QUANTITY_INCREASE,
      payload: asset
    })
  }
}

export function assetQuantityDecrease (asset) {
  return (dispatch) => {
    dispatch({
      type: ASSET_QUANTITY_DECREASE,
      payload: asset
    })
  }
}

export function selectAsset (assetDetail, asset) {
  return (dispatch) => {
    asset.assetDetail = assetDetail
    dispatch({
      type: SELECT_ASSET,
      payload: asset
    })
  }
}

export function deselectAsset (asset) {
  return (dispatch) => {
    dispatch({
      type: DESELECT_ASSET,
      payload: asset
    })
  }
}

export function assetAvailableIncrease (asset) {
  return (dispatch) => {
    dispatch({
      type: ASSET_AVAILABILITY_INCREASE,
      payload: asset
    })
  }
}

export function assetAvailableDecrease (asset) {
  return (dispatch) => {
    dispatch({
      type: ASSET_AVAILABILITY_DECREASE,
      payload: asset
    })
  }
}

export function changeBonus (asset) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_BONUS,
      payload: asset
    })
  }
}

export function updatePackageAssetPrice (data) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_ASSET_MANAGEMENT_PRICE,
      payload: data
    })
  }
}
