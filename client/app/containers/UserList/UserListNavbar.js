import React, { useState, useMemo, Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { DataColumn, DataHeader, DataList } from '../../components/DataList'
import { PageHeader, HeaderRight, HeaderItem } from '../../components/PageHeader'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import UserForm from '../UserForm'
import { notificationMessages } from '../../constants/defaultValues'
import { withToastManager } from 'react-toast-notifications'
import { notification } from '../../helpers/notificationHelper'
import {
  createUser,
  fetchUsers
} from '../../actions/user_actions'
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
              <DataColumn width={35}>{t('name')}</DataColumn>
              <DataColumn width={35}>{t('role')}</DataColumn>
              <DataColumn width={15}>{t('status')}</DataColumn>
              <DataColumn width={15}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class UserListNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      createNewUserModal: false
    }
    this._toggleCreateUserModal = this._toggleCreateUserModal.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  _toggleCreateUserModal () {
    this.setState({ createNewUserModal: !this.state.createNewUserModal })
  }

  async handleFormSubmit (values) {
    const { toastManager } = this.props
    const result = await this.props.createUser(values)
    if (result.status === 201 || result.status === 200) {
      notification.success(toastManager, notificationMessages.createdUserSuccess)
      this._toggleCreateUserModal()
      await this.props.fetchUsers()
    } else if (result.error) {
      notification.warning(toastManager, result.error.fields.map(field => field.message).join(','))
    }
  }

  render () {
    const { t } = this.props
    const { createNewUserModal } = this.state
    return (
      <>
        <Modal
          isOpen={createNewUserModal}
          size='lg'
          outline
          toggle={this._toggleCreateUserModal}
        >
          <ModalHeader toggle={this._toggleCreateUserModal}>
            <h3>{t('addNewUserAccount')}</h3>
          </ModalHeader>
          <ModalBody>
            <UserForm
              handleFormSubmit={this.handleFormSubmit}
            />
          </ModalBody>
        </Modal>
        <PageHeader>
          <HeaderRight>
            <HeaderItem>
              <Button
                color='primary'
                className='btn-main-qms'
                onClick={() => this._toggleCreateUserModal()}
              >
                {t('addNewUser')}
              </Button>
            </HeaderItem>
          </HeaderRight>
          <TableHeader t={t} />
        </PageHeader>
      </>
    )
  }
}

export default compose(
  connect(null, {
    fetchUsers,
    createUser
  }),
  translate('user')
)(withToastManager(UserListNavbar))
