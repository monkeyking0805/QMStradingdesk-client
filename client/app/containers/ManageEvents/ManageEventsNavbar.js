import React, { useState, useMemo, Component } from 'react'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'
import { withToastManager } from 'react-toast-notifications'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { DataList, DataColumn, DataHeader } from '../../components/DataList'

import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { EventForm } from '../../components/EventForm'
import { PageHeader, HeaderRight, HeaderItem } from '../../components/PageHeader'
import { notification } from '../../helpers/notificationHelper'
import { fetchEvents, saveEvent } from '../../actions/admin_management/manage_events'
import { clientPath } from '../../constants/clientPath'
import { notificationMessages } from '../../constants/defaultValues'
import '@babel/polyfill'

const ViewArchivedLinks = styled.div`
  color: #004282;
  cursor: pointer;
  position: absolute;
  top: 8px;
`

const TableHeader = ({ t }) => {
  const [hideOnScroll, setHideOnScroll] = useState(true)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll],
    false,
    false,
    300
  )

  return useMemo(
    () => (
      <>
        {!hideOnScroll ? (
          <DataList compact>
            <DataHeader>
              <DataColumn width={5} />
              <DataColumn width={5}>{t('id')}</DataColumn>
              <DataColumn width={15}>{t('fixture')}</DataColumn>
              <DataColumn width={10}>{t('startDate')}</DataColumn>
              <DataColumn width={10}>{t('endDate')}</DataColumn>
              <DataColumn width={10}>{t('eventType')}</DataColumn>
              <DataColumn width={10}>{t('club')}</DataColumn>
              <DataColumn width={10}>{t('venue')}</DataColumn>
              <DataColumn width={5}>{t('state')}</DataColumn>
              <DataColumn width={5}>{t('round')}</DataColumn>
              <DataColumn width={5}>{t('broadcast')}</DataColumn>
              <DataColumn width={5}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ManageEventsNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      eventFormModal: false
    }
    this._toggleEventModal = this._toggleEventModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleEventModal () {
    this.setState({ eventFormModal: !this.state.eventFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, eventsFilter } = this.props
    const result = await this.props.saveEvent(formValues)
    if (result.status === 200 || result.status === 201) {
      notification.success(toastManager, notificationMessages.eventCreated)
      this._toggleEventModal()
      await this.props.fetchEvents({
        ...eventsFilter,
        page: eventsFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { eventFormModal } = this.state
    const { t, viewArchived, toggleArchive } = this.props

    return (
      <>
        <Modal
          outline
          isOpen={eventFormModal}
          toggle={this._toggleEventModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this._toggleEventModal}>
            {t('event')}
          </ModalHeader>
          <ModalBody>
            <EventForm handleFormSubmit={this._handleFormSubmit} />
          </ModalBody>
        </Modal>
        <PageHeader style={{ position: 'relative' }}>
          {viewArchived && (
            <ViewArchivedLinks onClick={toggleArchive}>
              {'<'} Back to Events
            </ViewArchivedLinks>
          )}
          {!viewArchived && (
            <HeaderRight>
              <HeaderItem>
                <Link
                  to={`${clientPath.settings.event.import}`}
                  className='no-padding'
                >
                  <Button
                    color='primary'
                    outline
                    className='btn-main-qms'
                  >
                    {t('bulkUploadEvents')}
                  </Button>
                </Link>
              </HeaderItem>
              <HeaderItem>
                <Button
                  color='primary'
                  className='btn-main-qms'
                  onClick={() => this._toggleEventModal()}
                >
                  {t('addNewEvent')}
                </Button>
              </HeaderItem>
            </HeaderRight>
          )}
          <TableHeader t={t} />
        </PageHeader>
      </>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    eventsFilter: adminManagement.eventsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveEvent,
    fetchEvents
  }),
  translate('events')
)(withToastManager(ManageEventsNavbar))
