import React, { useState, useMemo, Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { DataList, DataColumn, DataHeader } from '../../components/DataList'

import { PageHeader, HeaderRight, HeaderItem } from '../../components/PageHeader'
import { notificationMessages } from '../../constants/defaultValues'
import { withToastManager } from 'react-toast-notifications'
import { notification } from '../../helpers/notificationHelper'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { fetchVenues, saveVenue } from '../../actions/admin_management/manage_venues'
import { VenueForm } from '../../components/VenueForm'
import '@babel/polyfill'

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
              <DataColumn width={10}>{t('ID')}</DataColumn>
              <DataColumn width={70}>{t('venue')}</DataColumn>
              <DataColumn width={20}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ManageVenuesNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      venueFormModal: false
    }
    this._toggleVenueModal = this._toggleVenueModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleVenueModal () {
    this.setState({ venueFormModal: !this.state.venueFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, venuesFilter } = this.props
    const result = await this.props.saveVenue(formValues)
    if (result.status === 200 || result.status === 201) {
      notification.success(toastManager, notificationMessages.venueSaved)
      this._toggleVenueModal()
      await this.props.fetchVenues({
        ...venuesFilter,
        page: venuesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { t } = this.props
    const { venueFormModal } = this.state
    return (
      <>
        <Modal
          isOpen={venueFormModal}
          outline
          toggle={this._toggleVenueModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this._toggleVenueModal}>
            {t('venue')}
          </ModalHeader>
          <ModalBody>
            <VenueForm
              handleFormSubmit={this._handleFormSubmit}
            />
          </ModalBody>
        </Modal>

        <PageHeader>
          <HeaderRight>
            <HeaderItem>
              <Button
                color='primary'
                className='btn-main-qms'
                onClick={() => this._toggleVenueModal()}
              >
                {t('addNewVenue')}
              </Button>
            </HeaderItem>
          </HeaderRight>
          <TableHeader t={t} />
        </PageHeader>
      </>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    venuesFilter: adminManagement.venuesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveVenue,
    fetchVenues
  }),
  translate('admin')
)(withToastManager(ManageVenuesNavbar))
