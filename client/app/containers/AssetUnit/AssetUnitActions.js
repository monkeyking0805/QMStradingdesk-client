import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { CustomInput } from 'reactstrap'
import { withToastManager } from 'react-toast-notifications'
import { DialogConfirm } from '../../components/DialogConfirm'
import { notification } from '../../helpers/notificationHelper'

const ManageAssetUnitWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`

const ManageAssetUnitItem = styled.div`
  display: flex;
`

const ManageAssetUnitText = styled.span`
  display: flex;
  align-items: flex-end;
  margin-left: 10px;
  margin-right: 25px;
  color: #353535;
  white-space: pre-line;
  font-size: 14px;
`

const ManageAssetUnitIcon = styled.i`
  font-size: 18px;
  display: flex;
  align-items: center;
`

const ManageAssetActions = ({
  t,
  isSelected,
  assetUnits,
  toastManager,
  selectedRows,
  viewArchived,
  handleAllRows,
  fetchAssetUnits,
  deleteAssetUnit,
  archiveAssetUnit,
  assetUnitsFilter,
  restoreAssetUnit
}) => {
  const deleteConfirmRef = useRef(null)
  const archiveConfirmRef = useRef(null)
  const restoreConfirmRef = useRef(null)
  const [checked, setChecked] = useState(isSelected)
  const isClickable = selectedRows.length !== 0
  const colorStyle = !isClickable ? { color: '#8f8f8f' } : null
  const isClickableStyle = isClickable ? { cursor: 'pointer' } : null

  const itemType = 'Asset Unit'
  const itemTypeNumber = selectedRows.length
  const itemTypeName = itemTypeNumber === 1 ? itemType : itemType + 's'

  useEffect(() => {
    setChecked(isSelected)
  })

  const selectAll = isChecked => {
    setChecked(isChecked)
    if (isChecked) {
      handleAllRows(assetUnits)
    } else {
      handleAllRows([])
    }
  }

  const deleteAll = async () => {
    if (isClickable) {
      const results = await selectedRows.map(async id => {
        const response = await deleteAssetUnit(id)
        await fetchAssetUnits({ ...assetUnitsFilter })
        return { id, response }
      })
      const requestResults = await Promise.all(results)
      const successMsg = t('deleteSuccess', { message: itemTypeName })
      const warningMsg = t('deleteFail', { message: itemTypeName })
      await initNotification(requestResults, successMsg, warningMsg)
      await fetchAssetUnits({ ...assetUnitsFilter })
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
        const response = await archiveAssetUnit(id)
        return { id, response }
      })
      const requestResults = await Promise.all(results)
      const successMsg = t('archiveSuccess', { message: itemTypeName })
      const warningMsg = t('archiveFail', { message: itemTypeName })
      await initNotification(requestResults, successMsg, warningMsg)
      await fetchAssetUnits({ ...assetUnitsFilter })
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
        const response = await restoreAssetUnit(id)
        return { id, response }
      })
      const requestResults = await Promise.all(results)
      const successMsg = t('restoreSuccess', { message: itemTypeName })
      const warningMsg = t('restoreFail', { message: itemTypeName })
      await initNotification(requestResults, successMsg, warningMsg)
      await fetchAssetUnits({ ...assetUnitsFilter })
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
    const requestSuccessPrefix = requestSuccessCount > 1 ? `${requestSuccessCount}` : ''
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

  return (
    <>
      <ManageAssetUnitWrapper>
        <ManageAssetUnitItem
          style={{ cursor: 'pointer' }}
          onClick={() => selectAll(!checked)}
        >
          <CustomInput
            type='checkbox'
            checked={checked && isSelected}
          />
          <ManageAssetUnitText>Select All</ManageAssetUnitText>
        </ManageAssetUnitItem>
        <ManageAssetUnitItem
          style={isClickableStyle}
          onClick={deleteConfirmation}
        >
          <ManageAssetUnitIcon
            style={colorStyle}
            className='simple-icon-trash'
          />
          <ManageAssetUnitText style={colorStyle}>Delete</ManageAssetUnitText>
        </ManageAssetUnitItem>
        <ManageAssetUnitItem
          style={isClickableStyle}
          onClick={viewArchived ? restoreConfirmation : archiveConfirmation}
        >
          <ManageAssetUnitIcon
            style={colorStyle}
            className='simple-icon-drawer'
          />
          <ManageAssetUnitText style={colorStyle}>{viewArchived ? 'Restore' : 'Archive'}</ManageAssetUnitText>
        </ManageAssetUnitItem>
      </ManageAssetUnitWrapper>
      <DialogConfirm
        t={t}
        onConfirm={deleteAll}
        ref={deleteConfirmRef}
        title={t('deleteAssetUnit', { type: itemTypeName })}
        description={t('deleteAssetUnitDescription', { number: itemTypeNumber, type: itemTypeName })}
      />
      <DialogConfirm
        t={t}
        onConfirm={archiveAll}
        ref={archiveConfirmRef}
        title={t('archiveAssetUnit', { type: itemTypeName })}
        description={t('archiveAssetUnitDescription', { number: itemTypeNumber, type: itemTypeName })}
      />
      <DialogConfirm
        t={t}
        onConfirm={restoreAll}
        ref={restoreConfirmRef}
        title={t('restoreAssetUnit', { type: itemTypeName })}
        description={t('restoreAssetUnitDescription', { number: itemTypeNumber, type: itemTypeName })}
      />
    </>
  )
}

export default withToastManager(ManageAssetActions)
