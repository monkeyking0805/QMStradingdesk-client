import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { CustomInput } from 'reactstrap'
import { withToastManager } from 'react-toast-notifications'
import { DialogConfirm } from '../../components/DialogConfirm'
import { notification } from '../../helpers/notificationHelper'

const ManageExclusionWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ManageExclusionItem = styled.div`
  display: flex;
`

const ManageExclusionText = styled.span`
  display: flex;
  align-items: flex-end;
  margin-left: 10px;
  margin-right: 25px;
  color: #353535;
  white-space: pre-line;
  font-size: 14px;
`

const ManageExclusionIcon = styled.i`
  font-size: 18px;
  display: flex;
  align-items: center;
`

const ExclusionManagementActions = ({
  t,
  isSelected,
  selectedRows,
  toastManager,
  handleAllRows,
  deleteExclusion,
  filteredParameters,
  fetchFilterExclusions,
  filteredExclusionList
}) => {
  const deleteConfirmRef = useRef(null)
  const [checked, setChecked] = useState(isSelected)
  const isClickable = selectedRows.length !== 0
  const colorStyle = !isClickable ? { color: '#8f8f8f' } : null
  const isClickableStyle = isClickable ? { cursor: 'pointer' } : null

  const itemType = 'Exclusion'
  const itemTypeNumber = selectedRows.length
  const itemTypeName = itemTypeNumber === 1 ? itemType : itemType + 's'

  useEffect(() => {
    setChecked(isSelected)
  })

  const selectAll = isChecked => {
    setChecked(isChecked)
    if (isChecked) {
      handleAllRows(filteredExclusionList)
    } else {
      handleAllRows([])
    }
  }

  const deleteAll = async () => {
    if (isClickable) {
      const results = await selectedRows.map(async id => {
        const response = await deleteExclusion(id)
        return { id, response }
      })
      const requestResults = await Promise.all(results)
      const successMsg = t('deleteSuccess', { message: itemTypeName })
      const warningMsg = t('deleteFail', { message: itemTypeName })
      await initNotification(requestResults, successMsg, warningMsg)
      await fetchFilterExclusions(
        { items_per_page: filteredParameters.items_per_page },
        { ...filteredParameters, sportCodes: filteredParameters.codes }
      )
      handleAllRows([])
      deleteConfirmRef.current.toggleConfirmModal()
    }
  }

  const deleteConfirmation = () => {
    if (isClickable) {
      deleteConfirmRef.current.toggleConfirmModal()
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

  return (
    <>
      <ManageExclusionWrapper>
        <ManageExclusionItem
          style={{ cursor: 'pointer' }}
          onClick={() => selectAll(!checked)}
        >
          <CustomInput
            type='checkbox'
            checked={checked && isSelected}
          />
          <ManageExclusionText>Select All</ManageExclusionText>
        </ManageExclusionItem>
        <ManageExclusionItem
          style={isClickableStyle}
          onClick={deleteConfirmation}
        >
          <ManageExclusionIcon
            style={colorStyle}
            className='simple-icon-trash'
          />
          <ManageExclusionText style={colorStyle}>Delete</ManageExclusionText>
        </ManageExclusionItem>
      </ManageExclusionWrapper>
      <DialogConfirm
        t={t}
        onConfirm={deleteAll}
        ref={deleteConfirmRef}
        title={t('deleteExclusion', { type: itemTypeName })}
        description={t('deleteExclusionDescription', { number: itemTypeNumber, type: itemTypeName })}
      />
    </>
  )
}

export default withToastManager(ExclusionManagementActions)
