import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { CustomInput } from 'reactstrap'
import { withToastManager } from 'react-toast-notifications'
import { DialogConfirm } from '../../components/DialogConfirm'
import { notification } from '../../helpers/notificationHelper'

const ManageEventWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ManageEventItem = styled.div`
  display: flex;
`

const ManageEventText = styled.span`
  display: flex;
  align-items: flex-end;
  margin-left: 10px;
  margin-right: 25px;
  color: #353535;
  white-space: pre-line;
  font-size: 14px;
`

const ManageEventIcon = styled.i`
  font-size: 18px;
  display: flex;
  align-items: center;
`

const ManageEventActions = ({
  t,
  events,
  isSelected,
  fetchEvents,
  deleteEvent,
  eventsFilter,
  selectedRows,
  archiveEvent,
  toastManager,
  viewArchived,
  restoreEvent,
  handleAllRows
}) => {
  const deleteConfirmRef = useRef(null)
  const archiveConfirmRef = useRef(null)
  const restoreConfirmRef = useRef(null)
  const [checked, setChecked] = useState(isSelected)
  const isClickable = selectedRows.length !== 0
  const colorStyle = !isClickable ? { color: '#8f8f8f' } : null
  const isClickableStyle = isClickable ? { cursor: 'pointer' } : null

  const itemType = 'Event'
  const itemTypeNumber = selectedRows.length
  const itemTypeName = itemTypeNumber === 1 ? itemType : itemType + 's'

  useEffect(() => {
    setChecked(isSelected)
  })

  const selectAll = isChecked => {
    setChecked(isChecked)
    if (isChecked) {
      handleAllRows(events)
    } else {
      handleAllRows([])
    }
  }

  const deleteAll = async () => {
    if (isClickable) {
      const results = await selectedRows.map(async id => {
        const response = await deleteEvent(id)
        return { id, response }
      })
      const requestResults = await Promise.all(results)
      const successMsg = t('deleteSuccess', { message: itemTypeName })
      const warningMsg = t('deleteFail', { message: itemTypeName })
      await initNotification(requestResults, successMsg, warningMsg)
      await fetchEvents({ ...eventsFilter })
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
        const response = await archiveEvent(id)
        return { id, response }
      })
      const requestResults = await Promise.all(results)
      const successMsg = t('archiveSuccess', { message: itemTypeName })
      const warningMsg = t('archiveFail', { message: itemTypeName })
      await initNotification(requestResults, successMsg, warningMsg)
      await fetchEvents({ ...eventsFilter })
      handleAllRows([])
      archiveConfirmRef.current.toggleConfirmModal()
    }
  }

  const archiveConfirmation = () => {
    if (isClickable) {
      archiveConfirmRef.current.toggleConfirmModal()
    }
  }

  const restoreConfirmation = () => {
    if (isClickable) {
      restoreConfirmRef.current.toggleConfirmModal()
    }
  }

  const restoreAll = async () => {
    if (isClickable) {
      const results = await selectedRows.map(async id => {
        const response = await restoreEvent(id)
        return { id, response }
      })
      const requestResults = await Promise.all(results)
      const successMsg = t('restoreSuccess', { message: itemTypeName })
      const warningMsg = t('restoreFail', { message: itemTypeName })
      await initNotification(requestResults, successMsg, warningMsg)
      await fetchEvents({ ...eventsFilter, name: '' })
      handleAllRows([])
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

  return (
    <>
      <ManageEventWrapper>
        <ManageEventItem
          style={{ cursor: 'pointer' }}
          onClick={() => selectAll(!checked)}
        >
          <CustomInput
            type='checkbox'
            checked={checked && isSelected}
          />
          <ManageEventText>Select All</ManageEventText>
        </ManageEventItem>
        <ManageEventItem
          style={isClickableStyle}
          onClick={deleteConfirmation}
        >
          <ManageEventIcon
            style={colorStyle}
            className='simple-icon-trash'
          />
          <ManageEventText style={colorStyle}>Delete</ManageEventText>
        </ManageEventItem>
        <ManageEventItem
          style={isClickableStyle}
          onClick={viewArchived ? restoreConfirmation : archiveConfirmation}
        >
          <ManageEventIcon
            style={colorStyle}
            className='simple-icon-drawer'
          />
          <ManageEventText style={colorStyle}>{viewArchived ? 'Restore' : 'Archive'}</ManageEventText>
        </ManageEventItem>
      </ManageEventWrapper>
      <DialogConfirm
        t={t}
        onConfirm={deleteAll}
        ref={deleteConfirmRef}
        title={t('deleteEvent', { type: itemTypeName })}
        description={t('deleteEventDescription', { number: itemTypeNumber, type: itemTypeName })}
      />
      <DialogConfirm
        t={t}
        onConfirm={archiveAll}
        ref={archiveConfirmRef}
        title={t('archiveEvent', { type: itemTypeName })}
        description={t('archiveEventDescription', { number: itemTypeNumber, type: itemTypeName })}
      />
      <DialogConfirm
        t={t}
        onConfirm={restoreAll}
        ref={restoreConfirmRef}
        title={t('restoreEvent', { type: itemTypeName })}
        description={t('restoreEventDescription', { number: itemTypeNumber, type: itemTypeName })}
      />
    </>
  )
}

ManageEventActions.defaultProps = {
  t: () => {},
  events: [],
  eventsFilter: [],
  selectedRows: [],
  fetchEvents: () => {},
  deleteEvent: () => {},
  archiveEvent: () => {},
  handleAllRows: () => {}
}

export default withToastManager(ManageEventActions)
