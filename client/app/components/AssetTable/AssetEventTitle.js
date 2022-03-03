import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { displayDate } from '../../helpers/utils'
import { dateFormat } from '../../constants/defaultValues'
import classnames from 'classnames'
import _ from 'lodash'

const renderTag = ({ venue, region, isFta, isPpv }, t) => {
  return (
    <>
      {venue && (
        <span className='badge'>{venue.name}</span>
      )}
      {region && (
        <span className='badge'>{region.name}</span>
      )}
      {isFta && (
        <span className='badge'>{t('simulcast')}</span>
      )}
      {isPpv && (
        <span className='badge'>{t('stv')}</span>
      )}
    </>
  )
}

const AssetEventTitle = ({ event, displayExclusion, displayAssets, enableToggle, t, toggle, assetsSelected }) => {
  const eventRoundDisplay = event.round ? `Round ${event.round}` : '-'
  const eventDateDisplay = displayDate(event.startDate, event.endDate, dateFormat.displayFormat)
  const eventAssetLengthDisplay = (event.assets.length > 1) ? t('Assets') : t('Asset')

  // Check if have asset selected in this event
  let haveSelectedAsset = false
  if (Array.isArray(assetsSelected)) {
    const eventAsset = event.assets.map(asset => asset.id)
    const selectedAsset = assetsSelected.map(asset => asset.id)
    haveSelectedAsset = (_.intersection(eventAsset, selectedAsset).length > 0) || false
  }

  return (
    <div className={
      classnames(
        'event accordian-item_title',
        { 'event-asset-selected': (haveSelectedAsset) }
      )
    }
    >
      <div className='event-info' onClick={toggle}>
        <div className='event-name'>
          <p>{event.name}</p>
          <div className='event-info-expand'>
            <span>{eventRoundDisplay}</span>
            <span>{eventDateDisplay}</span>
            <span>{event.assets.length} {eventAssetLengthDisplay}</span>
          </div>
          <div className='event-tags'>
            {renderTag(event, t)}
          </div>
        </div>
        <div className='event-round'>{eventRoundDisplay}</div>
        <div className='event-date'>{eventDateDisplay}</div>
        {displayExclusion && (
          <div className='event-exclusion'><a href='#'>{t('viewExclusions')}</a></div>
        )}
        {displayAssets && (
          <div className='event-assets'>{event.assets.length} {eventAssetLengthDisplay} </div>
        )}
        {enableToggle && (
          <div className='event-button-toggle'>
            <i className='collapsed simple-icon-arrow-down' />
            <span className='not-callapsed'>
              X
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

AssetEventTitle.propTypes = {
  event: PropTypes.object
}

export default translate('assetSearchResult')(AssetEventTitle)
