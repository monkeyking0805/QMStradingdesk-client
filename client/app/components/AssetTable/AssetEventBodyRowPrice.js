import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { CLIENT_URI } from '../../config/environment'
import { getTokenHeader } from '../../helpers/authHelper'
import { displayCurrencyFormat } from '../../helpers/utils'

const ReactTooltipStyled = styled(ReactTooltip).attrs({
  className: 'custom-tooltip'
})`
  &.custom-tooltip {
    opacity: 1;
    background: #f8f8f8;
  }
`

const DisplayPriceWrapper = styled.div`
  width: 100% !important;
  cursor: pointer !important;
  display: flex !important;
  justify-content: space-between !important;
`

const AssetEventBodyRowPrice = props => {
  const rateRef = React.createRef()
  const priceChanged = React.createRef()
  const productionRef = React.createRef()
  const installationRef = React.createRef()
  const [unitRate, setUnitRate] = useState(0)
  const [minPrice, setMinPrice] = useState(0)
  const [unitPrice, setUnitPrice] = useState(0)
  const [feeProductionState, setFeeProduction] = useState(0)
  const [feeInstallationState, setFeeInstallation] = useState(0)
  const [isAssetUnit, setIsAssetUnit] = useState(false)
  const [isFirstLoad, setFirstLoaded] = useState(true)
  const {
    t,
    rate,
    price,
    bonus,
    asset,
    isAdmin,
    quantity,
    production,
    assetUnitId,
    installation,
    onUpdateAsset,
    packageStatus
  } = props

  const loadAssetUnit = async () => {
    if (assetUnitId) {
      let response = null;
      (async () => {
        let apiRes = null
        try {
          apiRes = await axios.get(
            `${CLIENT_URI}/api/assetunits/${assetUnitId}`,
            {
              headers: getTokenHeader()
            }
          )
        } catch (err) {
          apiRes = err.response
        } finally {
          if (apiRes.status === 200) {
            response = apiRes.data
          }
          if (response !== null) {
            const minPrice = response.price_min
            const feeProduction = response.fee_production
            const feeInstallation = response.fee_installation
            const unitRate = response.is_fta
              ? response.price_fta
              : response.price_ppv
            const unitPrice = unitRate + feeProduction + feeInstallation
            setIsAssetUnit(true)
            setMinPrice(minPrice)
            setUnitRate(unitRate)
            setUnitPrice(unitPrice)
            setFeeProduction(feeProduction)
            setFeeInstallation(feeInstallation)
          } else {
            setIsAssetUnit(false)
          }
        }
      })()
    }
  }

  const handleUpdateAsset = () => {
    const initData = {
      rate: unitRate,
      production: feeProductionState,
      installation: feeInstallationState
    }
    onUpdateAsset(asset, minPrice, initData)
  }

  let isSearchPage = false
  let isUpdatePricePopUp = true

  if (!isAdmin && packageStatus === 'submitted') {
    isUpdatePricePopUp = false
  }

  if (!isAdmin && packageStatus === 'approved') {
    isUpdatePricePopUp = false
  }

  if (window.location.pathname === '/packages/search') {
    isUpdatePricePopUp = false
    isSearchPage = true
  }

  useEffect(() => {
    if (
      isAssetUnit &&
      !isFirstLoad &&
      !isSearchPage &&
      asset !== undefined &&
      asset.fees !== undefined
    ) {
      // parse price that we render
      const currentPrice = parseInt(price.replace(/\D+/g, ''))
      // count quantity & bonus to not highlighte price if bonus or quantity changes
      const bonusQuantity = bonus > 0 ? quantity - bonus : quantity
      // check rate
      const isRatePriceChanged = unitRate !== asset.rate
      // check production
      const isProductionPriceChanged =
        feeProductionState !== asset.fees.production
      // check installation
      const isInstallationPriceChanged =
        feeInstallationState !== asset.fees.installation
      // check price
      const isPriceLikeInitial = bonusQuantity * unitPrice === currentPrice
      // unitPrice === currentPrice
      const isPriceChanged =
        !isPriceLikeInitial ||
        isRatePriceChanged ||
        isProductionPriceChanged ||
        isInstallationPriceChanged

      // check price condition
      if (isPriceChanged) {
        priceChanged.current.style.color = '#F68B1F'
      } else {
        priceChanged.current.style.color = ''
      }
      // check rate condition
      if (isRatePriceChanged) {
        rateRef.current.style.color = '#F68B1F'
      } else {
        rateRef.current.style.color = ''
      }
      // check installation condition
      if (isInstallationPriceChanged) {
        installationRef.current.style.color = '#F68B1F'
      } else {
        installationRef.current.style.color = ''
      }
      // check production condition
      if (isProductionPriceChanged) {
        productionRef.current.style.color = '#F68B1F'
      } else {
        productionRef.current.style.color = ''
      }
    } else {
      if (window.location.pathname !== '/packages/search') {
        loadAssetUnit().then(() => {
          setFirstLoaded(false)
        })
      }
    }
  })

  const rateFormat = displayCurrencyFormat(rate)
  const productionFormat = displayCurrencyFormat(production)
  const installationFormat = displayCurrencyFormat(installation)

  // console.log(asset)

  return (
    <>
      <DisplayPriceWrapper
        data-tip
        data-for={`${asset.id}`}
        onClick={() => (isUpdatePricePopUp ? handleUpdateAsset() : null)}
      >
        <span className='price' ref={priceChanged}>
          {price}
        </span>
        {isUpdatePricePopUp && (
          <i style={{ marginLeft: 10 }} className='simple-icon-note' />
        )}
      </DisplayPriceWrapper>
      <ReactTooltipStyled id={`${asset.id}`} place='bottom' type='light'>
        <p>
          {t('clientRate')}: <span ref={rateRef}>{rateFormat}</span>
        </p>
        <p>
          {t('productionCost')}:{' '}
          <span ref={productionRef}>{productionFormat}</span>
        </p>
        <p>
          {t('installationCost')}:{' '}
          <span ref={installationRef}>{installationFormat}</span>
        </p>
      </ReactTooltipStyled>
    </>
  )
}

export default AssetEventBodyRowPrice
