import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
  fetchUsers,
  deleteIndividualUser
} from '../../actions/user_actions'
import '@babel/polyfill'

class UserList extends Component {
  constructor (props) {
    super(props)

    this.renderUserList = this.renderUserList.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
  }

  componentDidMount () {
    this.props.fetchUsers({
      items_per_page: 50
    })
  }

  async handleDeleteUser (userID) {
    await this.props.deleteIndividualUser(userID)
    await this.props.fetchUsers()
  }

  renderUserList (userList) {
    // Need to wait for design for now show only plain text
    // Don't worry will be update all
    return userList.map((user, key) => {
      return <div key={key}>{`${user.email} - ${user.firstname}`} <a onClick={() => this.handleDeleteUser(user.id)}>DEL</a></div>
    })
  }

  render () {
    const {
      t,
      userList
    } = this.props
    return (
      <div>
        {t('listTitle')}
        {this.renderUserList(userList)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state
  return {
    isLoading: user.isLoading,
    userList: user.userList
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchUsers,
    deleteIndividualUser
  }),
  translate('user')
)(UserList)
