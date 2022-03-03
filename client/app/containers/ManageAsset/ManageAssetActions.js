import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { CustomInput } from 'reactstrap'
import { translate } from 'react-i18next'
import { withToastManager } from 'react-toast-notifications'
import { DialogConfirm } from '../../components/DialogConfirm'
import { notification } from '../../helpers/notificationHelper'

const ManageAssetWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ManageAssetItem = styled.div`
  display: flex;
`

const ManageAssetText = styled.span`
  display: flex;
  align-items: flex-end;
  margin-left: 10px;
  margin-right: 25px;
  color: #353535;
  white-space: pre-line;
  font-size: 14px;
`

const ManageAssetIcon = styled.i`
  font-size: 18px;
  display: flex;
  align-items: center;
`

const ManageAssetActions = ({
  t,
  assets,
  isSelected,
  deleteAsset,
  fetchAssets,
  archiveAsset,
  viewArchived,
  restoreAsset,
  toastManager,
  selectedRows,
  assetsFilter,
  handleAllRows
}) => {
  const deleteConfirmRef = useRef(null)
  const archiveConfirmRef = useRef(null)
  const restoreConfirmRef = useRef(null)
  const [checked, setChecked] = useState(isSelected)
  const isClickable = selectedRows && isSelected
  const colorStyle = !isClickable ? { color: '#8f8f8f' } : null
  const isClickableStyle = isClickable ? { cursor: 'pointer' } : null

  const itemType = 'Asset'
  const itemTypeNumber = selectedRows.length
  const itemTypeName = itemTypeNumber === 1 ? itemType : itemType + 's'

  useEffect(() => {
    setChecked(isSelected)
  })

  const selectAll = isChecked => {
    setChecked(isChecked)
    if (isChecked) {
      handleAllRows(assets)
    } else {
      handleAllRows([])
    }
  }

  const deleteAll = async () => {
    if (isClickable) {
      const results = await selectedRows.map(async id => {
        const response = await deleteAsset(id)
        return { id, response }
      })
      const requestResults = await Promise.all(results)
      const successMsg = t('deleteSuccess', { message: itemTypeName })
      const warningMsg = t('deleteFail', { message: itemTypeName })
      await initNotification(requestResults, successMsg, warningMsg)
      await fetchAssets({ ...assetsFilter, ..._handleTransformRequest(assetsFilter) })
      handleAllRows([])
      deleteConfirmRef.current.toggleConfirmModal()
    }
  }

  const deleteConfirmation = () => {
    if (isClickable) {
      deleteConfirmRef.current.toggleConfirmModal()
    }
  }

  const archiveAll = async () => {
    if (isClickable) {
      const results = await selectedRows.map(async id => {
        const response = await archiveAsset(id)
        return { id, response }
      })
      const requestResults = await Promise.all(results)
      const successMsg = t('archiveSuccess', { message: itemTypeName })
      const warningMsg = t('archiveFail', { message: itemTypeName })
      await initNotification(requestResults, successMsg, warningMsg)
      await fetchAssets({ ...assetsFilter, ..._handleTransformRequest(assetsFilter) })
      handleAllRows([])
      archiveConfirmRef.current.toggleConfirmModal()
    }
  }

  const archiveConfirmation = () => {
    if (isClickable) {
      archiveConfirmRef.current.toggleConfirmModal()
    }
  }

  const restoreAll = async () => {
    if (isClickable) {
      const results = await selectedRows.map(async id => {
        const response = await restoreAsset(id)
        return { id, response }
      })
      const requestResults = await Promise.all(results)
      const successMsg = t('restoreSuccess', { message: itemTypeName })
      const warningMsg = t('restoreFail', { message: itemTypeName })
      await initNotification(requestResults, successMsg, warningMsg)
      await fetchAssets({ ...assetsFilter, ..._handleTransformRequest(assetsFilter) })
      handleAllRows([])
      restoreConfirmRef.current.toggleConfirmModal()
    }
  }

  const restoreConfirmation = () => {
    if (isClickable) {
      restoreConfirmRef.current.toggleConfirmModal()
    }
  }

  const initNotification = async (requestResults, successMsg, warningMsg) => {
    const requestFailCount = requestResults.filter(item => item.response !== undefined && item.response.status !== 200).length
    const requestSuccessCount = requestResults.filter(item => item.response !== undefined && item.response.status === 200).length
    const requestSuccessPrefix = requestSuccessCount > 1 ? `${requestSuccessCount} ` : ''
    if (requestSuccessCount !== 0) {
      notification.success(toastManager, `${requestSuccessPrefix} ${successMsg}`)
    }
    if (requestFailCount !== 0) {
      requestResults.map(item => {
        if (item.response.status !== 200) {
          notification.warning(toastManager, `${warningMsg} ${item.id} failed`)
        }
      })
    }
  }

  const _handleTransformRequest = (assetsFilter) => {
    return {
      ...assetsFilter,
      sportCodes: assetsFilter.codes.map(code => ({ key: code, value: code })),
      events: assetsFilter.events.map(event => ({ key: event, value: event })),
      assetTypes: assetsFilter.assetTypes.map(assetType => ({ key: assetType, value: assetType }))
    }
  }

  return (
    <>
      <ManageAssetWrapper>
        <ManageAssetItem
          style={{ cursor: 'pointer' }}
          onClick={() => selectAll(!checked)}
        >
          <CustomInput
            type='checkbox'
            checked={checked && isSelected}
          />
          <ManageAssetText>Select All</ManageAssetText>
        </ManageAssetItem>
        <ManageAssetItem
          style={isClickableStyle}
          onClick={deleteConfirmation}
        >
          <ManageAssetIcon
            style={colorStyle}
            className='simple-icon-trash'
          />
          <ManageAssetText style={colorStyle}>Delete</ManageAssetText>
        </ManageAssetItem>
        <ManageAssetItem
          style={isClickableStyle}
          onClick={viewArchived ? restoreConfirmation : archiveConfirmation}
        >
          <ManageAssetIcon
            style={colorStyle}
            className='simple-icon-drawer'
          />
          <ManageAssetText style={colorStyle}>{viewArchived ? 'Restore' : 'Archive'}</ManageAssetText>
        </ManageAssetItem>
      </ManageAssetWrapper>
      <DialogConfirm
        t={t}
        onConfirm={deleteAll}
        ref={deleteConfirmRef}
        title={t('deleteAsset', { type: itemTypeName })}
        description={t('deleteAssetDescription', { number: itemTypeNumber, type: itemTypeName })}
      />
      <DialogConfirm
        t={t}
        onConfirm={archiveAll}
        ref={archiveConfirmRef}
        title={t('archiveAsset', { type: itemTypeName })}
        description={t('archiveAssetDescription', { number: itemTypeNumber, type: itemTypeName })}
      />
      <DialogConfirm
        t={t}
        onConfirm={restoreAll}
        ref={restoreConfirmRef}
        title={t('restoreAsset', { type: itemTypeName })}
        description={t('restoreAssetDescription', { number: itemTypeNumber, type: itemTypeName })}
      />
    </>
  )
}

ManageAssetActions.defaultProps = {
  t: () => {},
  assets: [],
  assetsFilter: [],
  selectedRows: [],
  isSelected: false,
  viewArchived: false,
  fetchAssets: () => {},
  deleteAsset: () => {},
  restoreAsset: () => {},
  archiveAsset: () => {},
  handleAllRows: () => {}
}

export default translate('assets')(withToastManager(ManageAssetActions))
