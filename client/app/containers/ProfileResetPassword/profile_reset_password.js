import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'

import {
  resetProfilePassword
} from '../../actions/profile_actions'

class ProfileResetPassword extends Component {
  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (values) {
    if (values.confirmNewPassword === values.newPassword) {
      this.props.resetProfilePassword(values)
    }
  }

  render () {
    const {
      t,
      handleSubmit
    } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>

          <div>
            <label htmlFor='password'>{t('password')}</label>
            <Field
              name='currentPassword'
              component='input'
              type='password'
            />
          </div>

          <div>
            <label htmlFor='newpassword'>{t('newPassword')}</label>
            <Field
              name='newPassword'
              component='input'
              type='password'
            />
          </div>

          <div>
            <label htmlFor='confirmnewpassword'>{t('confirmNewPassword')}</label>
            <Field
              name='confirmNewPassword'
              component='input'
              type='password'
            />
          </div>
          <button type='submit'>{t('submit')}</button>
        </form>
      </div>
    )
  }
}

export default compose(
  connect(null, {
    resetProfilePassword
  }),
  reduxForm({
    form: 'resetpassword',
    enableReinitialize: true
  }),
  translate('form')
)(ProfileResetPassword)
