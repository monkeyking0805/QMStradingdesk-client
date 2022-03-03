import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Col, Row } from 'reactstrap'
import { DataList, DataRow, DataColumn, DataHeader } from '../../components/DataList'
import UserListFilter from './UserListFilter'
import { notificationMessages } from '../../constants/defaultValues'
import { withToastManager } from 'react-toast-notifications'
import { DialogConfirm } from '../../components/DialogConfirm'
import { Link } from 'react-router-dom'
import { clientPath } from '../../constants/clientPath'
import { Pagination } from '../../components/Pagination'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { notification } from '../../helpers/notificationHelper'
import UserListNavbar from './UserListNavbar'
import {
  fetchUsers,
  deleteIndividualUser
} from '../../actions/user_actions'
import '@babel/polyfill'

class UserList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined
    }
    this.dialogConfirmRef = React.createRef()
    this.renderUserList = this.renderUserList.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.handlePageChange = this.handlePageChange
  }

  componentDidMount () {
    this.props.fetchUsers()
  }

  toggleConfirmModal (userID) {
    this.setState({ selectDeletedID: userID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  async handleDeleteUser () {
    const { toastManager } = this.props
    const result = await this.props.deleteIndividualUser(this.state.selectDeletedID)
    this.dialogConfirmRef.current.toggleConfirmModal()
    if (result.status === 201 || result.status === 200) {
      notification.success(toastManager, notificationMessages.deletedUserSuccess)
    }
    await this.props.fetchUsers()
  }

  async handlePageChange (i) {
    await this.props.fetchUsers({
      ...this.props.userListFilter,
      page: i
    })
  }

  renderUserList (userList) {
    const { t } = this.props
    return userList.map((user) => {
      const displayStatus = (user.is_disabled) ? t('inActive') : t('active')
      const linkUpdate = `${clientPath.profile.profileDetail}/${user.id}`
      return (
        <DataRow key={user.id}>
          <DataColumn isHeading width={35}>
            <Link to={linkUpdate}>
              {`${user.firstname || ''} ${user.lastname || ''}`}
            </Link>
          </DataColumn>
          <DataColumn width={35}>{user.role.name}</DataColumn>
          <DataColumn width={15}>
            <span className='status-badge'>{displayStatus}</span>
          </DataColumn>
          <DataColumn width={15}>
            <Link to={linkUpdate}>
              <i className='simple-icon-note' />
            </Link>
            <i
              className='simple-icon-trash'
              onClick={() => { this.toggleConfirmModal(user.id) }}
            />
          </DataColumn>
        </DataRow>
      )
    })
  }

  render () {
    const {
      t,
      userList,
      userListPaginate,
      isLoading
    } = this.props
    return (
      <Col xs={12}>
        <DialogConfirm
          ref={this.dialogConfirmRef}
          t={t}
          onConfirm={this.handleDeleteUser}
          title={t('confirmDeleteUser')}
          description={t('confirmDeleteUserDescription')}
        />

        <UserListNavbar />

        <Row className='booking-header pt-70'>
          <Col xs={12}>
            <h1 className='m-0 p-0'>{t('listTitle')}</h1>
          </Col>
        </Row>
        <Row className='mb-5 data-filter'>
          <UserListFilter />
        </Row>
        <Row>
          {isLoading && (
            <LoadingSpinner />
          )}
          {!isLoading && (
            <Col xs={12}>
              <DataList>
                <DataHeader>
                  <DataColumn width={35}>{t('name')}</DataColumn>
                  <DataColumn width={35}>{t('role')}</DataColumn>
                  <DataColumn width={15}>{t('status')}</DataColumn>
                  <DataColumn width={15}>{t('actions')}</DataColumn>
                </DataHeader>
                {this.renderUserList(userList)}
              </DataList>
              <Pagination
                currentPage={userListPaginate.current}
                totalPage={userListPaginate.last}
                onChangePage={i => this.handlePageChange(i)}
              />
            </Col>
          )}
        </Row>
      </Col>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    ...user
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchUsers,
    deleteIndividualUser
  }),
  translate('user')
)(withToastManager(UserList))
