import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Col } from 'reactstrap'
import Select from 'react-select'
import '@babel/polyfill'
import { tableDisplayLabel } from '../../helpers/utils'
import {
  fetchUsers
} from '../../actions/user_actions'
import { displayOptions } from '../../constants/defaultValues'
class UserListFilter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userFilters: {
        order_by: '',
        items_per_pages: ''
      }
    }
    this.handleFilterOrderChange = this.handleFilterOrderChange.bind(this)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  async handleFilterOrderChange (orderValue) {
    const { userFilters } = this.state
    await this.setState({
      userFilters: {
        ...userFilters,
        order_by: orderValue.value
      }
    })
    await this.props.fetchUsers(this.state.userFilters)
  }

  async handleItemPerPageChange (itemPerPageValue) {
    const { userFilters } = this.state
    await this.setState({
      userFilters: {
        ...userFilters,
        items_per_page: itemPerPageValue.value
      }
    })
    await this.props.fetchUsers(this.state.userFilters)
  }

  render () {
    const { userFilters } = this.state
    const { t, userListPaginate } = this.props

    const displayFilterOrder = [
      { value: 'name', label: t('name') },
      { value: 'role', label: t('role') }
    ]
    return (
      <>
        <Col xs={12} md={2} className='pr-0'>
          <Select
            className='react-select'
            classNamePrefix='react-select'
            placeholder={`Order By: ${t(userFilters.order_by)}`}
            name='orderBy'
            onChange={this.handleFilterOrderChange}
            options={displayFilterOrder}
            value=''
          />
        </Col>
        <Col xs={12} md={{ size: 3, offset: 7 }}>
          <div className='display-list-dropdown'>
            <Select
              className='react-select'
              classNamePrefix='react-select'
              placeholder='10'
              name='itemPerpage'
              options={displayOptions}
              onChange={this.handleItemPerPageChange}
              defaultValue={displayOptions[2]}
            />
          </div>
          <div className='display-list'>
            {tableDisplayLabel(userListPaginate)}
          </div>
        </Col>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  const { user } = state
  return {
    userListFilter: user.userListFilter,
    userListPaginate: user.userListPaginate
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchUsers
  }),
  translate('user')
)(UserListFilter)
