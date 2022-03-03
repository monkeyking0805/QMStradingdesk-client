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
import { fetchClubs, saveClub } from '../../actions/admin_management/manage_clubs'
import { ClubForm } from '../../components/ClubForm'
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
              <DataColumn width={5}>{t('ID')}</DataColumn>
              <DataColumn width={25}>{t('brand')}</DataColumn>
              <DataColumn width={20}>{t('email')}</DataColumn>
              <DataColumn width={20}>{t('description')}</DataColumn>
              <DataColumn width={20}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ManageClubsNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clubFormModal: false
    }
    this._toggleClubModal = this._toggleClubModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleClubModal () {
    this.setState({ clubFormModal: !this.state.clubFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, clubsFilter } = this.props
    const result = await this.props.saveClub(formValues)
    if (result.status === 200 || result.status === 201) {
      notification.success(toastManager, notificationMessages.clubSaved)
      this._toggleClubModal()
      await this.props.fetchClubs({
        ...clubsFilter,
        page: clubsFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { t } = this.props
    const { clubFormModal } = this.state
    return (
      <>
        <Modal
          isOpen={clubFormModal}
          outline
          toggle={this._toggleClubModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this._toggleClubModal}>
            {t('club')}
          </ModalHeader>
          <ModalBody>
            <ClubForm
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
                onClick={() => this._toggleClubModal()}
              >
                {t('addNewClub')}
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
    clubsFilter: adminManagement.clubsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveClub,
    fetchClubs
  }),
  translate('admin')
)(withToastManager(ManageClubsNavbar))
