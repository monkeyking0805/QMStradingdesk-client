import { getAssetQuantity } from './assetsManagementHelper'

const transformRequest = (formDetail, assetsSelected, assetsQuantity, brandCategories) => {
  return {
    ...formDetail,
    assets: assetsSelected.map((asset) => {
      const filterAsset = { assetID: asset.id }
      return {
        asset_id: asset.id,
        slots: getAssetQuantity(filterAsset, assetsQuantity),
        bonus: asset.bonus,
        rate: asset.rate,
        fees: asset.fees
      }
    }),
    brandCategories: brandCategories.map((category) => { return category.value })
  }
}

export {
  transformRequest
}
