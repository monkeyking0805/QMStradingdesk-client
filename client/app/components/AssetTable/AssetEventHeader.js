import React from 'react'
import { translate } from 'react-i18next'

const AssetEventHeader = ({ t, enableEdit, enableDeleteAsset, enableBonus }) => {
  return (
    <div className='assetrow-headers'>
      <div className='assetrow assetrow-header'>
        {enableEdit && (
          <div className='assetcolumn assetrow_add'>{t('add')}</div>
        )}
        <div className='assetcolumn assetrow_name'>{t('Asset')}</div>
        <div className='assetcolumn assetrow_qty'>{t('qty')}</div>
        <div className='assetcolumn assetrow_duration'>{t('duration')}</div>
        <div className='assetcolumn assetrow_price'>{t('price')}</div>
        <div className='assetcolumn assetrow_spec'>{t('specification')}</div>
        {enableBonus && (<div className='assetcolumn assetrow_bonus'>{t('bonus')}</div>)}
        {enableDeleteAsset && <div style={{ width: 50 }} />}
      </div>
    </div>
  )
}

export default translate('assetSearchResult')(AssetEventHeader)
