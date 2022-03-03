import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { translate } from 'react-i18next'
import { CustomInput, Button } from 'reactstrap'
import AssetEventBodyRowPrice from './AssetEventBodyRowPrice'

const checkAssetLinks = (assetLinks) => {
  if (Array.isArray(assetLinks) && assetLinks.length < 1) {
    return false
  } else {
    return (assetLinks[0].name !== '') || false
  }
}

const renderQuantityControl = (asset, quantity, handleQuantityIncrease, handleQuantityDecrease) => {
  const available = parseInt(asset.available)
  const disabledDecreaseButton = (quantity === 1 || available === 0) || false
  const disabledIncreaseButton = (quantity === available || available === 1 || available === 0) || false
  const displayQuantity = (available !== 0 || quantity !== 0) ? `${quantity} / ${available}` : `${available}`
  return (
    <>
      <Button
        className={classnames('btn-amount', 'btn-decrease')}
        disabled={disabledDecreaseButton}
        size='sm'
        onClick={() => handleQuantityDecrease(asset)}
      > -
      </Button>
      <div className='display-amount'>
        {displayQuantity}
      </div>
      <Button
        className={classnames('btn-amount', 'btn-increase')}
        disabled={disabledIncreaseButton}
        size='sm'
        onClick={() => handleQuantityIncrease(asset)}
      > +
      </Button>
    </>
  )
}

const renderBonusControl = (quantity, asset, onBonusChange) => {
  const [displayQuantity, setQuantity] = useState(asset.bonus ? asset.bonus : 0)
  const [displayAvailable, setAvailable] = useState(quantity)

  useEffect(() => {
    if (displayQuantity > quantity) {
      handleDecreaseBonus()
    }
    setAvailable(quantity)
  })

  const handleIncreaseBonus = () => {
    let bonusQuantity = displayQuantity
    bonusQuantity = ++bonusQuantity
    asset.bonus = bonusQuantity

    setQuantity(bonusQuantity)
    onBonusChange(asset)
  }

  const handleDecreaseBonus = () => {
    let bonusQuantity = displayQuantity
    bonusQuantity = --bonusQuantity
    asset.bonus = bonusQuantity

    setQuantity(bonusQuantity)
    onBonusChange(asset)
  }

  const isDisabledDecreaseButton = displayQuantity === 0 || false
  const isDisabledIncreaseButton = displayQuantity === displayAvailable || false
  const displayBonusQuantity = `${displayQuantity} / ${displayAvailable}`

  return (
    <>
      <Button
        className={classnames('btn-amount', 'btn-decrease')}
        disabled={isDisabledDecreaseButton}
        onClick={handleDecreaseBonus}
        size='sm'
      > -
      </Button>
      <div className='display-amount'>
        {displayBonusQuantity}
      </div>
      <Button
        className={classnames('btn-amount', 'btn-increase')}
        disabled={isDisabledIncreaseButton}
        onClick={handleIncreaseBonus}
        size='sm'
      > +
      </Button>
    </>
  )
}

const AssetEventBodyRow = ({
  t,
  label,
  price,
  asset,
  isAdmin,
  quantity,
  duration,
  isRowAlert,
  onViewSpec,
  enableBonus,
  onBonusChange,
  packageStatus,
  assetSelected,
  onAssetSelect,
  onRemoveAsset,
  assetsSelected,
  enableSelectAsset,
  enableDeleteAsset,
  isConfirmedBooking,
  enableEditQuantity,
  onQuantityIncrease,
  onQuantityDecrease,
  toggleUpdatePackagePopUp
}) => {
  const disabledSelect = (asset.available === 0) || false
  const displayAssetsLink = checkAssetLinks(asset.assetUnit.links)
  const available = (isConfirmedBooking) ? parseInt(asset.available) + quantity : parseInt(asset.available)

  let assetUnitId = null

  if (assetsSelected !== undefined) {
    const findAsset = assetsSelected.find(item => asset.id === item.id)
    assetUnitId = findAsset.assetUnit.id
  }

  let rate = 0
  let production = 0
  let installation = 0

  if (asset !== undefined && asset.fees !== undefined) {
    rate = asset.rate
    production = asset.fees.production
    installation = asset.fees.installation
  }

  const onUpdateAsset = (assetData, minPrice, initData) => {
    let id = 0
    let production = 0
    let installation = 0

    if (assetData !== undefined && assetData.fees !== undefined) {
      id = assetData.id
      rate = assetData.rate
      production = assetData.fees.production
      installation = assetData.fees.installation
    }

    const asset = {
      id: id,
      marketRate: rate,
      minPrice: minPrice,
      productionCost: production,
      installationCost: installation
    }

    const assetUnit = {
      id: id,
      minPrice: minPrice,
      marketRate: initData.rate,
      productionCost: initData.production,
      installationCost: initData.installation
    }
    if (toggleUpdatePackagePopUp !== undefined) {
      toggleUpdatePackagePopUp(asset, assetUnit)
    }
  }

  console.log(assetsSelected)

  return (
    <div
      className={
        classnames(
          'assetrow assetrow-detail',
          { 'assetrow-error': (isRowAlert || quantity > available) || false },
          { 'assetrow-checked': (assetSelected || false) }
        )
      }
    >
      {enableSelectAsset && (
        <div className='assetcolumn assetrow_add'>
          <CustomInput
            type='checkbox'
            id={`${asset.id}_${asset.assetUnit.id}_${asset.assetType.id}`}
            checked={assetSelected}
            onChange={() => onAssetSelect(asset)}
            disabled={disabledSelect}
          />
        </div>
      )}
      <div className='assetcolumn assetrow_name'>{label}</div>
      <div className='assetcolumn assetrow_qty'>
        {!enableEditQuantity && (
          quantity
        )}
        {enableEditQuantity && (
          renderQuantityControl(asset, quantity, onQuantityIncrease, onQuantityDecrease, isConfirmedBooking)
        )}
      </div>
      <div className='assetcolumn assetrow_duration'>{duration}</div>
      <div className='assetcolumn assetrow_price'>
        <AssetEventBodyRowPrice
          t={t}
          rate={rate}
          asset={asset}
          price={price}
          isAdmin={isAdmin}
          production={production}
          assetUnitId={assetUnitId}
          installation={installation}
          packageStatus={packageStatus}
          onUpdateAsset={onUpdateAsset}
          quantity={quantity !== undefined ? quantity : 1}
          bonus={asset.bonus !== undefined ? asset.bonus : 0}
        />
      </div>
      <div className='assetcolumn assetrow_spec'>
        {displayAssetsLink && (
          <span onClick={() => onViewSpec(asset.assetUnit.links)}>{t('viewSpec')}</span>
        )}
      </div>
      {enableBonus && (
        <div className='assetcolumn assetrow_qty'>
          {renderBonusControl(quantity, asset, onBonusChange)}
        </div>
      )}
      {enableDeleteAsset && onRemoveAsset && (
        <div className='assetcolumn assetrow_trash'>
          <i className='simple-icon-trash' onClick={() => onRemoveAsset(asset)} />
        </div>
      )}
    </div>
  )
}

AssetEventBodyRow.propTypes = {
  label: PropTypes.string,
  quantity: PropTypes.number,
  duration: PropTypes.string,
  price: PropTypes.string
}

export default translate('assetSearchResult')(AssetEventBodyRow)
