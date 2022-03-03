const getPriceRate = (assetSelected) => {
  // return assetSelected.price
  return assetSelected.rate + (assetSelected.fees.installation + assetSelected.fees.production)
}

const getAssetQuantity = (filterAsset, assetsQuantity) => {
  const assetQuantity = assetsQuantity.filter(assetItem => {
    for (const key in filterAsset) {
      if (assetItem[key] === undefined || assetItem[key] !== filterAsset[key]) {
        return false
      }
    }
    return true
  })
  // If not found any assets quantity in array then it alway return quantity 1 as default
  // It will always return 1 element of array so this can be fix with element[0]
  return (assetQuantity.length === 0) ? 1 : assetQuantity[0].quantity
}

const assetGrouping = (assetsSelected) => {
  const sportCodeGrouping = assetsSelected.reduce((newObj, asset) => {
    const keyIndex = asset.assetDetail.sportDetail.name
    newObj[keyIndex] = newObj[keyIndex] || []
    newObj[keyIndex].push(asset)
    return newObj
  }, Object.create(null))
  const assetGrouping = []
  // After grouping by sport code then take event in sport code and grouping by event.
  // This doing 2 grouping due nested key
  Object.keys(sportCodeGrouping).forEach((k) => {
    const groupByEvent = sportCodeGrouping[k].reduce((newObj, asset) => {
      const keyIndex = asset.assetDetail.eventDetail.id
      newObj[keyIndex] = newObj[keyIndex] || []
      newObj[keyIndex].push(asset)
      return newObj
    }, Object.create(null))
    // Return nested object into code => event => asset
    // This will easier for rendering with map method.
    assetGrouping.push({
      sportCode: k,
      events: Object.values(groupByEvent).map(event => {
        return {
          ...event[0].assetDetail.eventDetail,
          assets: Object.values(event)
        }
      })
    })
  })
  return assetGrouping
}

module.exports = {
  getAssetQuantity,
  getPriceRate,
  assetGrouping
}
